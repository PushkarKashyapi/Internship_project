import time
import requests
from mpu6050 import mpu6050
from math import sqrt

# API URL
API_ENDPOINT = "http://<YOUR_SERVER_IP>/trigger-alert-browser/?name=Cycle+User&latitude=19.1234&longitude=72.5432"

# MPU6050 Init
sensor = mpu6050(0x68)

FALL_THRESHOLD = 2.5   # Acceleration in Gs (tune as needed)
STILL_DURATION = 10    # Seconds
ANGULAR_THRESHOLD = 3  # deg/sec considered "not moving"

def get_magnitude(accel):
    ax, ay, az = accel['x'], accel['y'], accel['z']
    return sqrt(ax**2 + ay**2 + az**2)

def is_user_still(gyro):
    gx, gy, gz = abs(gyro['x']), abs(gyro['y']), abs(gyro['z'])
    return gx < ANGULAR_THRESHOLD and gy < ANGULAR_THRESHOLD and gz < ANGULAR_THRESHOLD

def send_emergency_alert():
    try:
        print("🚨 Sending alert...")
        response = requests.get(API_ENDPOINT)
        print(f"✅ Alert sent: {response.status_code}")
    except Exception as e:
        print(f"❌ Error sending alert: {e}")

# Fall Detection Loop
fall_detected = False
still_start_time = None

while True:
    accel_data = sensor.get_accel_data()
    gyro_data = sensor.get_gyro_data()
    
    acc_mag = get_magnitude(accel_data)

    if acc_mag > FALL_THRESHOLD:
        print(f"⚠️ Fall-like impact detected! Acc mag: {acc_mag:.2f}g")
        fall_detected = True
        still_start_time = time.time()
    
    elif fall_detected:
        if is_user_still(gyro_data):
            elapsed = time.time() - still_start_time
            print(f"🕒 Still for {elapsed:.2f}s")
            if elapsed > STILL_DURATION:
                send_emergency_alert()
                fall_detected = False
        else:
            print("🙆 Movement detected after impact. Cancelling fall status.")
            fall_detected = False
    
    time.sleep(0.5)
