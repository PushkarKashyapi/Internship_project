# pothole_detector.py
import RPi.GPIO as GPIO
import time
import requests

TRIG = 23
ECHO = 24
THRESHOLD_CM = 10  # Distance below which we treat as pothole
API_URL = "http://<YOUR_DJANGO_SERVER>/pothole-alert/"  # Change this

GPIO.setmode(GPIO.BCM)
GPIO.setup(TRIG, GPIO.OUT)
GPIO.setup(ECHO, GPIO.IN)

def get_distance():
    GPIO.output(TRIG, True)
    time.sleep(0.00001)
    GPIO.output(TRIG, False)

    start = time.time()
    stop = time.time()

    while GPIO.input(ECHO) == 0:
        start = time.time()

    while GPIO.input(ECHO) == 1:
        stop = time.time()

    time_elapsed = stop - start
    distance = (time_elapsed * 34300) / 2
    return distance

try:
    while True:
        dist = get_distance()
        print(f"Measured Distance = {dist:.1f} cm")

        if dist < THRESHOLD_CM:
            print("⚠️ Pothole detected!")
            payload = {
                "depth": dist,
                "location": "Front Left Wheel"  # or GPS lat/lon if available
            }
            try:
                requests.post(API_URL, json=payload)
                time.sleep(5)  # Avoid flooding the server
            except Exception as e:
                print("Error sending to server:", e)

        time.sleep(1)

except KeyboardInterrupt:
    print("Stopped by User")
    GPIO.cleanup()
