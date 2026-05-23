const gasValue = parseInt(document.getElementById("gasValue").innerText);
document.getElementById("weatherInfo");

weatherInfo.innerHTML =
"📍 Location : Smart Environment Lab | ☀ Weather : Clear Sky";


// AI PREDICTION

const predictionText =
document.getElementById("predictionText");

if(gasValue > 500)
{
predictionText.innerHTML =
"AI Prediction : Air quality may become hazardous soon.";
}
else
{
predictionText.innerHTML =
"AI Prediction : Environment remains stable.";
}


// CHART

const ctx =
document.getElementById('airChart').getContext('2d');

new Chart(ctx, {

    type: 'line',

    data: {

        labels: ['Temperature','Humidity','Gas'],

        datasets: [{

            label: 'Live Sensor Data',

            data: [tempValue,humValue,gasValue],

            borderColor: graphColor,

            backgroundColor: graphColor,

            borderWidth: 4,

            tension:0.4

        }]
    },

    options: {
        responsive:true
    }
});


// AQI GAUGE

const gaugeFill =
document.getElementById("gaugeFill");

const gaugeText =
document.getElementById("gaugeText");

let gaugeDegree = gasValue;

if(gaugeDegree > 100)
{
gaugeDegree = 100;
}

gaugeFill.style.background =
`conic-gradient(${graphColor} ${gaugeDegree * 3.6}deg,#222 0deg)`;

gaugeText.innerHTML = gasValue;


// QR CODE

QRCode.toCanvas(document.getElementById('qrCanvas'),
window.location.href);