# 🌍 AirSense AI - Smart Air Quality Monitoring System

## 📌 Project Overview

AirSense AI is an IoT-based Smart Air Quality Monitoring System that continuously monitors environmental conditions using ESP8266, MQ135 Gas Sensor, and DHT11 Sensor.

The system collects:

* 🌡 Temperature
* 💧 Humidity
* 💨 Air Quality Index (AQI)

and displays real-time analytics through a Spring Boot web dashboard.

The system also provides:

* 📊 Live AQI Monitoring
* 📈 Weekly AQI Analytics
* 🚨 Emergency Air Quality Alerts
* 🔔 Telegram Notifications
* 📱 Mobile Friendly Dashboard
* 💾 Historical Data Storage
* 🤖 AI-Based Pollution Analysis

---

# 🛠 Technologies Used

## Hardware

* ESP8266 NodeMCU
* MQ135 Gas Sensor
* DHT11 Temperature & Humidity Sensor
* USB Power Supply

## Software

* Arduino IDE
* Java
* Spring Boot
* Spring Data JPA
* MySQL
* HTML
* CSS
* JavaScript
* Chart.js
* Telegram Bot API

---

# 🏗 System Architecture

ESP8266 → Spring Boot API → MySQL Database → Dashboard → Telegram Alerts

---

# 📊 Features

## Real-Time Monitoring

Displays:

* Temperature
* Humidity
* AQI

with automatic updates.

---

## Weekly AQI Analytics

* Daily AQI storage
* Weekly visualization
* Automatic week reset
* Fresh Air Detection
* Most Dangerous AQI Detection

---

## Sensor Health Monitoring

Detects:

* DHT11 Connected
* MQ135 Connected

and alerts when sensors are disconnected.

---

## Emergency Alerts

When AQI crosses the configured threshold:

* Popup Warning
* Voice Alert
* Telegram Notification

---

## Telegram Alert Example

AIR QUALITY DANGER

AQI: 120

Temperature: 29°C

Humidity: 55%

Status: Dangerous Air Detected

---

# 📂 Project Structure

AirSenseAI

├── Arduino/

│ └── AirSenseAI.ino

│

├── src/

│ ├── main/

│ │ ├── java/

│ │ │ └── com.weather

│ │ │ ├── controller

│ │ │ ├── entity

│ │ │ ├── repository

│ │ │ └── service

│ │

│ │ ├── resources/

│ │ │ ├── static

│ │ │ ├── templates

│ │ │ └── application.properties

│

├── pom.xml

├── README.md

└── database.sql

---

# 🚀 Installation

## Clone Repository

git clone https://github.com/Sanketh-coder/AirSenseAi.git

---

## Configure MySQL

Create database:

CREATE DATABASE airsense;

Update:

application.properties

with your database credentials.

---

## Run Spring Boot

mvn spring-boot:run

Application starts at:

http://localhost:9094

---

## Upload Arduino Code

1. Open Arduino IDE
2. Select NodeMCU ESP8266
3. Configure WiFi Credentials
4. Upload Code

---

# 📱 Dashboard Features

✅ Live AQI Gauge

✅ AQI History Graph

✅ Weekly AQI Analytics

✅ Freshest Air Detection

✅ Most Dangerous AQI Detection

✅ Sensor Status Monitoring

✅ Telegram Alerts

✅ Mobile Responsive Design

---

# 🔮 Future Enhancements

* Email Notifications
* AI AQI Prediction
* Weather Forecast Integration
* Multi-Sensor Support
* Cloud Deployment
* Android Application

---

# 👨‍💻 Developed By

Sanketh R M,
Gokulkrishna Reddy, 
Pavan M

Computer Science Engineering
DSCE
AirSense AI Project 2026

---

# 📄 License

This project is developed for educational and research purposes.
