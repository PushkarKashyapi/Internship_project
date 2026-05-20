from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.conf import settings
from .models import User, sensordata, EmergencyAlert, pothole
import json
from datetime import datetime
import os
from twilio.rest import Client


@csrf_exempt
def home(request):
    return HttpResponse("Hello, world! This is the home page of my Django project.")


@csrf_exempt
def insert_user(request):
    name = request.GET.get('name')
    if name:
        user = User(name=name)
        user.save()
        return render(request, 'user_saved.html', {'username': name})
    else:
        return HttpResponse("Please provide a 'name' in the URL.")


@csrf_exempt
def post_req(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            name = data.get('name')
            temperature = data.get('temperature')
            humidity = data.get('humidity')

            if name and temperature is not None and humidity is not None:
                record = sensordata(
                    name=str(name),
                    temperature=str(temperature),
                    humidity=str(humidity)
                )
                record.save()
                return HttpResponse(f"Data saved: Name={name}, Temperature={temperature}, Humidity={humidity}")
            else:
                return HttpResponse("Please provide 'name', 'temperature', and 'humidity' in the form.")
        except Exception as e:
            return HttpResponse(f"Error: {str(e)}")
    else:
        return HttpResponse("Only POST requests are allowed.")


@csrf_exempt
def show_sensor_data(request):
    all_data = sensordata.objects.order_by('-id')[:10]
    message = "No data available"

    if all_data:
        try:
            temp = float(all_data[0].temperature)
            hum = float(all_data[0].humidity)
            message = ""
            if hum > 60:
                message += "High humidity! Carry a water bottle. "
            elif hum < 30:
                message += "Low humidity. Stay hydrated. "

            if temp > 35:
                message += "Very hot! Avoid afternoon rides."
            elif temp < 10:
                message += "Cold weather. Wear warm clothes."

            if not message:
                message = "Conditions are normal. Ride safely."
        except Exception as e:
            message = f"Error reading sensor values: {e}"

    return JsonResponse({
        'sensor_data': [
            {
                'name': data.name,
                'temperature': data.temperature,
                'humidity': data.humidity,
                'timestamp': data.timestamp.strftime("%Y-%m-%d %H:%M:%S")
            } for data in all_data
        ],
        'message': message
    })

TWILIO_SID = os.getenv('TWILIO_SID')
TWILIO_AUTH = os.getenv('TWILIO_AUTH')
TWILIO_PHONE = os.getenv('TWILIO_PHONE')
EMERGENCY_PHONE = os.getenv('EMERGENCY_PHONE')


from uuid import uuid4

@csrf_exempt


@csrf_exempt
def trigger_alert_browser(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            name = data.get('name', 'Cycle User')
            latitude = data.get('latitude', 'default_latitude')
            longitude = data.get('longitude', 'default_longitude')

            alert = EmergencyAlert(name=name, latitude=latitude, longitude=longitude)
            alert.save()

            # Convert ObjectId to str here
            return JsonResponse({
                "status": "success",
                "msg": "Alert triggered and saved",
                "alert_id": str(alert.id)  # Convert ObjectId to string
            })

        except Exception as e:
            return JsonResponse({
                "status": "fail",
                "msg": f"Error: {str(e)}"
            })
    else:
        return JsonResponse({
            "status": "fail",
            "msg": "Only POST method is allowed"
        })

latest_alert_id = None  # Simple in-memory cache
@csrf_exempt
def get_latest_alert(request):
    global latest_alert_id

    alert = EmergencyAlert.objects.order_by("-id").first()  # ✅ Updated model name
    if alert and str(alert.id) != latest_alert_id:
        latest_alert_id = str(alert.id)
        return JsonResponse({
            "new_alert": True,
            "alert_id": str(alert.id),
            "name": alert.name,
            "latitude": alert.latitude,
            "longitude": alert.longitude
        })
    else:
        return JsonResponse({"new_alert": False})


@csrf_exempt
def confirm_emergency_alert(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            alert_id = data.get('alert_id')
            alert = EmergencyAlert.objects.get(id=alert_id)

            client = Client(settings.TWILIO_SID, settings.TWILIO_AUTH)

            message_body = (
                f"🚨 Emergency Alert from {alert.name}!\n"
                f"Location: https://maps.google.com/?q={alert.latitude},{alert.longitude}"
            )

            client.messages.create(
                body=message_body,
                from_=settings.TWILIO_PHONE,
                to=settings.EMERGENCY_PHONE
            )

            client.calls.create(
                twiml=f'<Response><Say>Emergency alert from {alert.name}. Check location: {alert.latitude}, {alert.longitude}.</Say></Response>',
                from_=settings.TWILIO_PHONE,
                to=settings.EMERGENCY_PHONE
            )

            return JsonResponse({"status": "success", "msg": "Alert confirmed and sent."})
        except Exception as e:
            return JsonResponse({"status": "fail", "msg": f"Error: {str(e)}"})

    return JsonResponse({"status": "fail", "msg": "Only POST allowed."})


def show_emergency_alert(request):
    try:
        latest_alert = EmergencyAlert.objects.order_by('-timestamp').first()
        if latest_alert:
            context = {
                'user_name': latest_alert.name,
                'latitude': latest_alert.latitude,
                'longitude': latest_alert.longitude,
            }
        else:
            context = {
                'user_name': 'No Alert',
                'latitude': 'N/A',
                'longitude': 'N/A',
            }
    except Exception as e:
        context = {
            'user_name': 'Error',
            'latitude': 'Error',
            'longitude': str(e),
        }

    return render(request, 'emergency_dashboard.html', context)


@csrf_exempt
def cancel_alert(request, alert_id):
    try:
        EmergencyAlert.objects.filter(id=alert_id).delete()
        return HttpResponse("✅ Emergency alert canceled.")
    except Exception as e:
        return HttpResponse(f"❌ Error canceling alert: {str(e)}")

@csrf_exempt

def cancel_alert_browser(request):
    return render(request, 'error.html')

@csrf_exempt

@csrf_exempt

def pothole_alert(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode('utf-8'))
            depth = data.get("depth")
            distance = data.get("distance")
            time = data.get("time", datetime.utcnow())

            event = pothole(
                depth=depth,
                distance=distance,
                time=time
            )
            event.save()

            if depth is not None and distance is not None:
                message = f"Pothole Detected {float(distance):.1f} meters away with depth {float(depth):.1f} cm at {time}."
                print(message)
                return render(request, "pothole_warning.html", {
                    "depth": depth,
                    "distance": distance,
                    "time": time,
                    "message": message
                })
            else:
                return JsonResponse({"error": "Missing depth or distance data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    elif request.method == "GET":
        # Allow testing from browser
        try:
            depth = float(request.GET.get("depth", "10"))
            distance = float(request.GET.get("distance", "5"))
            time = datetime.utcnow()

            event = pothole(
                depth=depth,
                distance=distance,
                time=time
            )
            event.save()

            message = f"Pothole Detected {distance:.1f} meters away with depth {depth:.1f} "
            print(message)

            return render(request, "pothole_warning.html", {
                "depth": depth,
                "distance": distance,
                "time": time,
                "message": message
            })
        except Exception as e:
            return JsonResponse({"error": f"GET Error: {str(e)}"}, status=500)

    return JsonResponse({"error": "Only GET and POST methods are allowed"}, status=405)