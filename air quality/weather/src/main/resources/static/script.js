let tempValue =
parseInt(document.getElementById("temp").innerText);

let humValue =
parseInt(document.getElementById("hum").innerText);

let gasValue =
parseInt(document.getElementById("gas").innerText);


// ALERT SYSTEM

const alertBox =
document.getElementById("alertBox");

if(gasValue > 500)
{
    alertBox.innerHTML =
    "⚠ Dangerous Air Quality Detected";

    alertBox.className = "danger";

    let speech =
    new SpeechSynthesisUtterance(
    "Warning! Dangerous air quality detected");

    speechSynthesis.speak(speech);
}
else if(gasValue > 200)
{
    alertBox.innerHTML =
    "⚠ Moderate Pollution Detected";

    alertBox.className = "warning";
}
else
{
    alertBox.innerHTML =
    "✅ Air Quality Good";

    alertBox.className = "safe";
}


// AI PREDICTION

const predictionText =
document.getElementById("predictionText");

if(gasValue > 500)
{
    predictionText.innerHTML =
    "AI Prediction: Air quality may become hazardous soon.";
}
else if(gasValue > 200)
{
    predictionText.innerHTML =
    "AI Prediction: Pollution level increasing gradually.";
}
else
{
    predictionText.innerHTML =
    "AI Prediction: Environment remains safe.";
}


// LIVE CHART

const ctx =
document.getElementById('airChart');

new Chart(ctx, {

type: 'line',

data: {

labels: ['Temperature', 'Humidity', 'Gas'],

datasets: [{

label: 'Live Sensor Data',

data: [tempValue, humValue, gasValue],

borderWidth: 3

}]

},

options: {

responsive: true

}

});