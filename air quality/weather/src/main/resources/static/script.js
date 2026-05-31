// INITIAL VALUES

let tempValue =
parseInt(document.getElementById("temp").innerText);

let humValue =
parseInt(document.getElementById("hum").innerText);

let gasValue =
parseInt(document.getElementById("gas").innerText);


// HISTORY STORAGE

let historyLabels = [];

let historyGas = [];








// LIVE CLOCK

setInterval(()=>{

document.getElementById("clock")
.innerHTML =
new Date().toLocaleString();

},1000);





// CHART

const ctx =
document.getElementById('airChart');

const airChart = new Chart(ctx, {

type: 'line',

data: {

labels: historyLabels,

datasets: [{

label: 'Live AQI History',

data: historyGas,

borderColor: 'green',

backgroundColor: 'green',

borderWidth: 3,

tension:0.4,

fill:false

}]

},

options: {

responsive:true

}

});






// LIVE AJAX UPDATE

setInterval(()=>{

fetch('/live-data')

.then(response => response.json())

.then(data => {


// SENSOR VALUES

tempValue =
parseInt(data.temp);

humValue =
parseInt(data.hum);

gasValue =
parseInt(data.gas);


/*
// ================= SENSOR STATUS =================

const mqStatus =
document.getElementById(
"mqStatus");

const dhtStatus =
document.getElementById(
"dhtStatus");

const wifiStatus =
document.getElementById(
"wifiStatus");



// MQ135 STATUS

if(gasValue == -1)
{

mqStatus.innerHTML =
"🔴 MQ135 Disconnected";

mqStatus.classList.add(
"sensor-danger");

}
else
{

mqStatus.innerHTML =
"🟢 MQ135 Connected";

mqStatus.classList.remove(
"sensor-danger");

}


// DHT11 STATUS

if(tempValue == -1 || humValue == -1)
{

dhtStatus.innerHTML =
"🔴 DHT11 Disconnected";

dhtStatus.classList.add(
"sensor-danger");

}
else
{

dhtStatus.innerHTML =
"🟢 DHT11 Connected";

dhtStatus.classList.remove(
"sensor-danger");

}


// WIFI STATUS

wifiStatus.innerHTML =
"🟢 WiFi Connected";

wifiStatus.classList.remove(
"sensor-danger");


// ================= WEATHER ANIMATION =================

const sun =
document.querySelector(".sun");

const rain =
document.querySelector(".rain");

const fog =
document.querySelector(".fog");

const smoke =
document.querySelector(".smoke");


// RESET

sun.style.display = "none";

rain.style.display = "none";

fog.style.display = "none";

smoke.style.display = "none";



// SAFE AIR + NORMAL TEMP

if(gasValue < 100 && humValue < 70)
{

sun.style.display = "block";

}


// HIGH HUMIDITY

if(humValue > 80)
{

rain.style.display = "block";

}


// MODERATE POLLUTION

if(gasValue > 100 && gasValue < 300)
{

fog.style.display = "block";

}


// DANGEROUS POLLUTION

if(gasValue > 300)
{

smoke.style.display = "block";

}
*/



// UPDATE HTML VALUES

document.getElementById("temp")
.innerHTML = tempValue;

document.getElementById("hum")
.innerHTML = humValue;

document.getElementById("gas")
.innerHTML = gasValue;






// ALERT SYSTEM

const alertBox =
document.getElementById("alertBox");


if(gasValue > 500)
{

alertBox.innerHTML =
"🚨 Dangerous Air Quality Detected";

alertBox.className =
"danger";

document.body.style.background =
"linear-gradient(135deg,#7f1d1d,#450a0a)";

}
else if(gasValue > 200)
{

alertBox.innerHTML =
"⚠ Moderate Pollution Detected";

alertBox.className =
"warning";

document.body.style.background =
"linear-gradient(135deg,#92400e,#451a03)";


}
else
{

alertBox.innerHTML =
"✅ Air Quality Good";

alertBox.className =
"safe";

document.body.style.background =
"linear-gradient(135deg,#065f46,#022c22)";


}





// AQI LEVEL

const aqiLevel =
document.getElementById("aqiLevel");


if(gasValue <= 100)
{

aqiLevel.innerHTML =
"🟢 GOOD";

}
else if(gasValue <= 300)
{

aqiLevel.innerHTML =
"🟠 MODERATE";

}
else if(gasValue <= 500)
{

aqiLevel.innerHTML =
"🔴 POOR";

}
else
{

aqiLevel.innerHTML =
"🚨 DANGEROUS";

}





// AI PREDICTION

const predictionText =
document.getElementById("predictionText");


if(gasValue > 500)
{

predictionText.innerHTML =
"Hazardous air increasing rapidly.";

}
else if(gasValue > 200)
{

predictionText.innerHTML =
"Pollution level increasing gradually.";

}
else
{

predictionText.innerHTML =
"Environment remains stable.";

}





// HEALTH ADVICE

const healthAdvice =
document.getElementById("healthAdvice");


if(gasValue < 200)
{

healthAdvice.innerHTML =
"✅ Fresh Air";

}
else if(gasValue < 500)
{

healthAdvice.innerHTML =
"😷 Wear Mask Recommended";

}
else
{

healthAdvice.innerHTML =
"⚠ Avoid Area Immediately";

}





// COMFORT INDEX

const comfortIndex =
document.getElementById("comfortIndex");


if(tempValue < 35 && humValue < 70)
{

comfortIndex.innerHTML =
"😊 Comfortable Environment";

}
else
{

comfortIndex.innerHTML =
"🥵 Hot & Humid";

}





// POLLUTION SOURCE

const pollutionSource =
document.getElementById("pollutionSource");


if(gasValue > 500)
{

pollutionSource.innerHTML =
"🔥 Smoke / Chemical Gas";

}
else
{

pollutionSource.innerHTML =
"✅ No Harmful Pollution";

}





// AQI GAUGE

const gaugeFill =
document.getElementById("gaugeFill");

const gaugeText =
document.getElementById("gaugeText");


let degree = gasValue;

if(degree > 100)
{
degree = 100;
}


let gaugeColor = "green";


if(gasValue > 500)
{
gaugeColor = "red";
}
else if(gasValue > 200)
{
gaugeColor = "orange";
}


gaugeFill.style.background =
`conic-gradient(${gaugeColor}
${degree * 3.6}deg,#222 0deg)`;


gaugeText.innerHTML =
gasValue;






// LIVE HISTORY STORAGE

let currentTime =
new Date().toLocaleTimeString();

historyLabels.push(currentTime);

historyGas.push(gasValue);




// LIMIT GRAPH DATA

if(historyLabels.length > 15)
{

historyLabels.shift();

historyGas.shift();

}




// UPDATE CHART

airChart.data.labels =
historyLabels;

airChart.data.datasets[0].data =
historyGas;

airChart.data.datasets[0].borderColor =
gaugeColor;

airChart.data.datasets[0].backgroundColor =
gaugeColor;

airChart.update();






// DAILY POLLUTION ANALYSIS

const dailyAnalysis =
document.getElementById(
"dailyAnalysis");

let avgGas = 0;

for(let i=0;
i<historyGas.length;
i++)
{
avgGas += historyGas[i];
}

avgGas =
avgGas / historyGas.length;


if(avgGas > 500)
{

dailyAnalysis.innerHTML =
"🚨 Dangerous pollution detected today.";

}
else if(avgGas > 200)
{

dailyAnalysis.innerHTML =
"⚠ Moderate pollution observed today.";

}
else
{

dailyAnalysis.innerHTML =
"✅ Air quality remained mostly safe.";

}



})

.catch(error => {

console.log(error);

});


},3000);