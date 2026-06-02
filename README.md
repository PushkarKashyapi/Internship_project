AADHAR – Smart E-Cycle Safety and Monitoring System

About the Project

AADHAR is a smart safety system developed for E-Cycles to help riders stay safe on the road. The idea behind this project was simple: combine IoT sensors, Artificial Intelligence, GPS technology, and web technologies to solve real-world problems faced by cyclists.
The system monitors environmental conditions, detects potential road hazards, helps prevent accidents caused by fatigue, and automatically contacts emergency responders when needed.
Our goal was to create a solution that not only makes cycling safer but can also help save lives during emergencies.


Technology Stack
 Frontend
  React.js

  Backend

  Django
  Django REST Framework

  Database
    MongoDB

 AI & Machine Learning

* Python
* OpenCV
* Dlib
* NumPy
* Scikit-Learn

Third-Party Services

  Twilio API
  GPS Module

 Hardware Components

* Temperature Sensor
* Humidity Sensor
* Air Pollution Sensor
* Ultrasonic Sensor
* GPS Module
* Camera Module



 System Architecture


Sensors & Camera
        │
        ▼
Data Collection
        │
        ▼
AI/ML Processing
        │
        ▼
Django Backend
        │
        ▼
MongoDB Database
        │
        ▼
React Dashboard
        │
        ▼
Alerts, Recommendations & Emergency Response

Features

 1. Environmental Monitoring and Health Recommendations

The system continuously collects:

* Air Temperature
* Air Humidity
* Air Pollution Levels

Based on these readings, the application provides useful recommendations to the rider.

 Examples

* Air quality is poor → Wear a mask.
* High temperature detected → Stay hydrated.
* High pollution level → Avoid long outdoor rides.
* Unhealthy weather conditions → Take extra precautions.

This helps users make informed decisions before and during their ride.

 2. Automatic Emergency Calling with Live GPS Location

In emergency situations, every second matters.

AADHAR uses a GPS module to capture the rider's live location and automatically triggers emergency calls using the Twilio API.

 How it Works

1. Emergency situation is detected.
2. Current GPS coordinates are captured.
3. Twilio automatically calls up to 5 emergency contacts.
4. Live location information is shared for faster assistance.

 Benefits

* Faster emergency response.
* Immediate communication with family members.
* Improved rider safety during critical situations.



3. Smart Pothole Detection System

Road potholes are one of the major causes of accidents, especially during nighttime.

To solve this problem, we used an ultrasonic sensor to detect potholes and road irregularities before they become dangerous.

 Features

* Detects potholes in real time.
* Alerts riders about upcoming hazards.
* Improves safety during low-visibility conditions.

 Benefits

* Reduces accident risk.
* Protects riders from sudden road obstacles.
* Makes night riding safer.

 4. AI-Based Yawn Detection and Accident Prevention

Driver and rider fatigue is a major reason behind road accidents.

Using a camera, OpenCV, and Dlib facial landmark detection, the system continuously analyzes facial expressions and head movements.

 Capabilities

* Yawn Detection
* Drowsiness Detection
* Fatigue Monitoring
* Rider Alert Generation

When signs of tiredness are detected, the system immediately alerts the rider to take a break.

 5. Stroke Prediction and Health Analysis

The project also includes an AI-based health monitoring module.

Using facial landmarks and head-position analysis, the system attempts to identify abnormal facial patterns that may indicate possible stroke-related symptoms.

 Process

* Face Detection
* Landmark Extraction
* Facial Symmetry Analysis
* Head Position Tracking
* Risk Prediction

The goal is to provide an early warning system that can encourage users to seek medical attention sooner.



 Project Workflow


Environmental Sensors
GPS Module
Ultrasonic Sensor
Camera Feed
        │
        ▼
Data Processing & AI Analysis
        │
        ▼
Django Backend Services
        │
        ▼
MongoDB Storage
        │
        ▼
React Dashboard
        │
        ▼
Recommendations, Alerts and Emergency Actions

 Future Improvements

* Mobile application support.
* Real-time cloud monitoring.
* More accurate accident prediction models.
* SMS and WhatsApp emergency alerts.
* Advanced health monitoring features.
* Smart route suggestions based on pollution and weather conditions.



AADHAR is a combination of IoT, Artificial Intelligence, Machine Learning, GPS technology, and Full-Stack Development that aims to improve rider safety and awareness.

From environmental monitoring and pothole detection to emergency calling and fatigue analysis, the project demonstrates how technology can be used to solve practical problems and create a safer riding experience for everyone.
