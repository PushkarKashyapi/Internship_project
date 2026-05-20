import Adafruit_DHT
import requests
from time import sleep
from RPLCD.i2c import CharLCD

# Sensor Setup
SENSOR = Adafruit_DHT.DHT11
PIN = 4  # GPIO pin connected to DHT11 data pin

# LCD Setup
lcd = CharLCD('PCF8574', 0x27)  # Use your actual LCD I2C address

# Backend API endpoint
API_ENDPOINT = "http://yourserver/api/temperature/"  # Replace with your actual backend URL

# Function to read data from DHT11 sensor
def read_sensor():
    humidity, temperature = Adafruit_DHT.read_retry(SENSOR, PIN)
    if humidity is None or temperature is None:
        raise ValueError("Sensor read failed")
    return round(temperature, 1), round(humidity, 1)

# Function to display text on LCD
def show_on_lcd(line1, line2=""):
    lcd.clear()
    lcd.write_string(line1)
    lcd.cursor_pos = (1, 0)
    lcd.write_string(line2)

# Main loop
while True:
    try:
        # Read data from sensor
        temp, humid = read_sensor()
        print(f"Temp: {temp}C, Humidity: {humid}%")

        # Send data to backend and get response
        res = requests.post(API_ENDPOINT, json={"temperature": temp, "humidity": humid})

        if res.status_code == 200:
            message = res.json().get("message", "No message")
            print("Backend Message:", message)

            # Display message received from backend
            show_on_lcd("Server says:", message[:16])  # Trim to 16 chars for 16x2 LCD
            sleep(3)

        else:
            show_on_lcd("Server Error", f"Code: {res.status_code}")
            sleep(3)

    except Exception as e:
        print("Error:", e)
        show_on_lcd("Error:", str(e)[:16])
        sleep(5)

    sleep(10)  # Delay before next reading
