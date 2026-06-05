//let lastDataTime = Date.now();


// ================= ENABLE HUMAN VOICE =================

window.speechSynthesis.onvoiceschanged =
function()
{

window.speechSynthesis.getVoices();

};



// ================= LIVE CLOCK =================

setInterval(()=>{

document.getElementById("clock")
.innerHTML =
new Date().toLocaleString();

},1000);




// ================= PARTICLES =================

function createParticle()
{

const particle =
document.createElement("div");

particle.classList.add("particle");

let size =
Math.random()*10+5;

particle.style.width =
size+"px";

particle.style.height =
size+"px";

particle.style.left =
Math.random()*100+"vw";

particle.style.animationDuration =
Math.random()*10+5+"s";

document
.getElementById("particles")
.appendChild(particle);

setTimeout(()=>{

particle.remove();

},15000);

}


setInterval(createParticle,300);




// ================= LIVE LINE CHART =================

const ctx =
document.getElementById("airChart");

const chart =
new Chart(ctx,{

type:'line',

data:{

labels:[],

datasets:[{

label:'AQI History',

data:[],

borderColor:'#ef4444',

backgroundColor:'#ef4444',

tension:0.4,

borderWidth:3

}]

},

options:{

responsive:true,

maintainAspectRatio:false

}

});




// ================= LIVE SENSOR UPDATE =================

setInterval(()=>{

fetch('/live-data')

.then(res=>res.json())

.then(data=>{
	
	lastDataTime = Date.now();


let temp =
parseInt(data.temp);

let hum =
parseInt(data.hum);

let gas =
parseInt(data.gas);



// ================= UPDATE SENSOR VALUES =================


document.getElementById("temp")
.innerHTML =
(temp == -1) ? "--" : temp;


document.getElementById("hum")
.innerHTML =
(hum == -1) ? "--" : hum;


document.getElementById("gas")
.innerHTML =
(gas == -1) ? "--" : gas;


document.getElementById("ringValue")
.innerHTML =
(gas == -1) ? "--" : gas;



// ================= AQI ELEMENTS =================

let aqiText =
document.getElementById("aqiText");

let prediction =
document.getElementById("prediction");

let health =
document.getElementById("health");

let ring =
document.querySelector(".ring");

let overlay =
document.getElementById("emergencyOverlay");



// ================= SENSOR STATUS =================

let dhtStatus =
document.getElementById("dhtStatus");

let mqStatus =
document.getElementById("mqStatus");



// DHT11 STATUS

if(temp == -1 || hum == -1)
{

    dhtStatus.innerHTML =
    "🔴 DHT11 Connection Lost";

    dhtStatus.className =
    "sensor-offline";

}
else
{

    dhtStatus.innerHTML =
    "🟢 DHT11 Connected";

    dhtStatus.className =
    "sensor-online";

}



// MQ135 STATUS

if(gas == -1)
{

    mqStatus.innerHTML =
    "🔴 MQ135 Connection Lost";

    mqStatus.className =
    "sensor-offline";

}
else
{

    mqStatus.innerHTML =
    "🟢 MQ135 Connected";

    mqStatus.className =
    "sensor-online";

}



// ================= SENSOR OFFLINE =================

if(gas == -1)
{

aqiText.innerHTML =
"⚠ AQI Sensor Offline";

prediction.innerHTML =
"Unable To Analyze Environment";

health.innerHTML =
"Sensor Connection Lost";

ring.style.background =
"conic-gradient(gray 360deg,#1e293b 0deg)";

ring.style.boxShadow =
"0 0 25px rgba(150,150,150,0.4)";

overlay.style.display =
"none";

speechSynthesis.cancel();

window.voiceAlertPlaying = false;

}



// ================= SAFE AIR =================

else if(gas < 100)
{


aqiText.innerHTML =
"🟢 Safe Air";

prediction.innerHTML =
"Environment Stable";

health.innerHTML =
"Fresh Air";

ring.style.background =
"conic-gradient(lime 120deg,#1e293b 0deg)";

ring.style.boxShadow =
"0 0 25px lime";


document.body.style.background =
"linear-gradient(135deg,#020617,#0f172a)";


overlay.style.display =
"none";


// STOP VOICE

speechSynthesis.cancel();

window.voiceAlertPlaying = false;

}



// ================= MODERATE AIR =================

else if(gas < 300)
{


aqiText.innerHTML =
"🟠 Moderate Pollution";

prediction.innerHTML =
"Pollution Increasing";

health.innerHTML =
"Wear Mask";

ring.style.background =
"conic-gradient(orange 240deg,#1e293b 0deg)";

ring.style.boxShadow =
"0 0 25px orange";


document.body.style.background =
"linear-gradient(135deg,#451a03,#78350f)";


overlay.style.display =
"none";


speechSynthesis.cancel();

window.voiceAlertPlaying = false;

}



// ================= DANGEROUS AIR =================

else
{


aqiText.innerHTML =
"🔴 Dangerous Air";

prediction.innerHTML =
"Hazardous AQI Rising";

health.innerHTML =
"Avoid Area Immediately";

ring.style.background =
"conic-gradient(red 360deg,#1e293b 0deg)";

ring.style.boxShadow =
"0 0 25px red";


document.body.style.background =
"linear-gradient(135deg,#450a0a,#7f1d1d)";


overlay.style.display =
"flex";



// ================= FINAL EMERGENCY VOICE =================

if(!window.voiceAlertPlaying)
{

window.voiceAlertPlaying = true;


// STOP OLD VOICE

window.speechSynthesis.cancel();


// CREATE VOICE

let emergencyVoice =
new SpeechSynthesisUtterance();

emergencyVoice.text =

"Emergency Alert. Dangerous air quality detected. Please wear a mask immediately.";

emergencyVoice.volume = 1;

emergencyVoice.rate = 0.9;

emergencyVoice.pitch = 1;

emergencyVoice.lang = "en-US";


// LOAD HUMAN VOICES

let voices =
window.speechSynthesis.getVoices();


// SELECT BEST VOICE

for(let i=0;i<voices.length;i++)
{

if(
voices[i].name.includes("Google")
||
voices[i].name.includes("Microsoft")
)
{

emergencyVoice.voice =
voices[i];

break;

}

}


// SPEAK

window.speechSynthesis.speak(
emergencyVoice);


// RESET

emergencyVoice.onend = () => {

window.voiceAlertPlaying = false;

};

}

}



// ================= LIVE LINE GRAPH =================

chart.data.labels.push(
new Date().toLocaleTimeString()
);

chart.data.datasets[0].data.push(gas);


if(chart.data.labels.length > 15)
{

chart.data.labels.shift();

chart.data.datasets[0].data.shift();

}

chart.update();

});

},3000);




// ================= FINAL INDUSTRY WEEKLY GRAPH =================

let weeklyChart;


function loadWeeklyGraph()
{

fetch('/weekly-data')

.then(res=>res.json())

.then(data=>{


// FIXED WEEK DAYS

let labels = [

"Sunday",

"Monday",

"Tuesday",

"Wednesday",

"Thursday",

"Friday",

"Saturday"

];



// DEFAULT VALUES

let values = [0,0,0,0,0,0,0];



// DEFAULT COLORS

let colors = [

"#374151",

"#374151",

"#374151",

"#374151",

"#374151",

"#374151",

"#374151"

];





// MAP DATABASE DATA TO DAYS

data.forEach(item=>{


let gas =
parseInt(item.gas || 0);


let dayIndex =
labels.indexOf(item.dayName);



if(dayIndex != -1)
{


// STORE HIGHEST AQI OF DAY

if(gas > values[dayIndex])
{

values[dayIndex] = gas;

}




// COLORS

if(gas < 100)
{

colors[dayIndex] =
"#00ff00";

}
else if(gas < 300)
{

colors[dayIndex] =
"#ffaa00";

}
else
{

colors[dayIndex] =
"#ff0000";

}

}

});






// DESTROY OLD GRAPH

if(weeklyChart)
{

weeklyChart.destroy();

}




// CREATE GRAPH

const weeklyCtx =
document.getElementById(
"weeklyChart");



weeklyChart =
new Chart(weeklyCtx,{

type:'bar',


data:{

labels:labels,


datasets:[{

label:'Weekly AQI',

data:values,

backgroundColor:colors,

borderRadius:12,

borderWidth:1,

barThickness:40

}]

},



options:{

responsive:true,

maintainAspectRatio:false,

animation:true,


plugins:{

legend:{

display:false

}

},



scales:{


x:{

ticks:{

color:'white',

font:{

size:16

}

},

grid:{

color:
"rgba(255,255,255,0.05)"

}

},



y:{

beginAtZero:true,

ticks:{

color:'white'

},

grid:{

color:
"rgba(255,255,255,0.05)"

}

}

}

}

});







// ================= FINAL AI ANALYSIS =================

let minAQI = 99999;

let maxAQI = 0;

let freshDay = "";

let dangerDay = "";



data.forEach(item=>{


let gas =
parseInt(item.gas || 0);



// MIN AQI

if(gas < minAQI)
{

minAQI = gas;

freshDay =
item.dateValue;

}



// MAX AQI

if(gas > maxAQI)
{

maxAQI = gas;

dangerDay =
item.dateValue;

}

});






// NO DATA FIX

if(minAQI == 99999)
{

minAQI = "No Data";

freshDay = "-";

}


if(maxAQI == 0)
{

maxAQI = "No Data";

dangerDay = "-";

}




// UPDATE PANEL

document.getElementById(
"weeklyAnalysis")

.innerHTML =

"🟢 Freshest Air : " +

freshDay +

" (" + minAQI + ")<br><br>" +


"🔴 Most Dangerous AQI : " +

dangerDay +

" (" + maxAQI + ")";


});

}





// FIRST LOAD

loadWeeklyGraph();




// AUTO UPDATE

setInterval(()=>{

loadWeeklyGraph();

},5000);


// ================= BOARD OFFLINE DETECTION =================
/*
setInterval(() => {

    let boardOffline =
    (Date.now() - lastDataTime) > 10000;

    if(boardOffline)
    {
        document.getElementById("boardError")
        .style.display = "block";

        document.getElementById("dhtStatus")
        .classList.add("danger-blink");

        document.getElementById("mqStatus")
        .classList.add("danger-blink");
    }
    else
    {
        document.getElementById("boardError")
        .style.display = "none";

        document.getElementById("dhtStatus")
        .classList.remove("danger-blink");

        document.getElementById("mqStatus")
        .classList.remove("danger-blink");
    }

},1000);*/



// BOARD STATUS CHECK

setInterval(() => {

fetch('/board-status')

.then(res => res.text())

.then(status => {

if(status === "OFFLINE")
{

	document.getElementById("boardError")
	.style.display = "block";

	document.getElementById("boardError")
	.classList.add("danger-blink");

document.getElementById("dhtStatus")
.classList.add("danger-blink");

document.getElementById("mqStatus")
.classList.add("danger-blink");

}
else
{

	document.getElementById("boardError")
	.style.display = "none";

	document.getElementById("boardError")
	.classList.remove("danger-blink");

document.getElementById("dhtStatus")
.classList.remove("danger-blink");

document.getElementById("mqStatus")
.classList.remove("danger-blink");

}

});

},1000);