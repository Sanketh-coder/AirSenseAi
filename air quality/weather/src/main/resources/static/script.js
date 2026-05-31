// LIVE CLOCK

setInterval(()=>{

document.getElementById("clock")
.innerHTML =
new Date().toLocaleString();

},1000);




// PARTICLES

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




// CHART

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

responsive:true

}

});




// LIVE UPDATE

setInterval(()=>{

fetch('/live-data')

.then(res=>res.json())

.then(data=>{


let temp =
parseInt(data.temp);

let hum =
parseInt(data.hum);

let gas =
parseInt(data.gas);



// UPDATE VALUES

// SAFE DISPLAY VALUES 
document.getElementById("temp") .innerHTML = (temp == -1) ? "--" : temp; 
document.getElementById("hum") .innerHTML = (hum == -1) ? "--" : hum;

// SAFE AQI DISPLAY 
document.getElementById("gas") .innerHTML = (gas == -1) ? "--" : gas;

document.getElementById("ringValue") .innerHTML = (gas == -1) ? "--" : gas;




// AQI STATUS

let aqiText =
document.getElementById("aqiText");

let prediction =
document.getElementById("prediction");

let health =
document.getElementById("health");

let sensor =
document.getElementById("sensorStatus");

let ring =
document.querySelector(".ring");




// ================= SENSOR STATUS ================= 
let dhtStatus = document.getElementById( "dhtStatus");
let mqStatus = document.getElementById( "mqStatus");
  

// DHT11 STATUS 

if(temp == -1 || hum == -1) { 
    dhtStatus.innerHTML = "🔴 DHT11 Connection Lost"; 
    dhtStatus.className = "sensor-offline"; 
} else { 
    dhtStatus.innerHTML = "🟢 DHT11 Connected"; 
    dhtStatus.className = "sensor-online"; 
} 
    

// MQ135 STATUS  
    
if(gas == -1) { 
    mqStatus.innerHTML = "🔴 MQ135 Connection Lost"; 
    mqStatus.className = "sensor-offline"; 
} else { 
    mqStatus.innerHTML = "🟢 MQ135 Connected"; 
    mqStatus.className = "sensor-online"; 
} 



// AQI LOGIC

if(gas == '--') { 
	aqi.innerHTML = 
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
}


else if(gas<100)
{

aqiText.innerHTML =
"🟢 Safe Air";

prediction.innerHTML =
"Environment Stable";

health.innerHTML =
"Fresh Air";

ring.style.background =
"conic-gradient(lime 120deg,#1e293b 0deg)";

document.body.style.background =
"linear-gradient(135deg,#020617,#0f172a)";

document
.getElementById("emergencyOverlay")
.style.display="none";

}
else if(gas<300)
{

aqiText.innerHTML =
"🟠 Moderate Pollution";

prediction.innerHTML =
"Pollution Increasing";

health.innerHTML =
"Wear Mask";

ring.style.background =
"conic-gradient(orange 240deg,#1e293b 0deg)";

document.body.style.background =
"linear-gradient(135deg,#451a03,#78350f)";

document
.getElementById("emergencyOverlay")
.style.display="none";

}
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

document.body.style.background =
"linear-gradient(135deg,#450a0a,#7f1d1d)";

document
.getElementById("emergencyOverlay")
.style.display="flex";

}



// UPDATE CHART

chart.data.labels.push(
new Date().toLocaleTimeString()
);

chart.data.datasets[0].data.push(gas);


if(chart.data.labels.length>15)
{

chart.data.labels.shift();

chart.data.datasets[0].data.shift();

}

chart.update();

});

},3000);