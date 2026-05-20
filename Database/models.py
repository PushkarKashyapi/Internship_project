from mongoengine import Document, StringField, DateTimeField, FloatField
from datetime import datetime

class User(Document):
    name = StringField(max_length=100)
   
   
class sensordata(Document):
    name = StringField(max_length=100)
    temperature = StringField(max_length=100)
    humidity = StringField(max_length=100)
    timestamp = DateTimeField(default=datetime.utcnow)  # Optional field for timestamp

class EmergencyAlert(Document):
    name = StringField(required=True)
    latitude = FloatField(required=True)
    longitude = FloatField(required=True)
    timestamp = DateTimeField(default=datetime.utcnow)
    
class pothole(Document):
    depth = FloatField(required=True)
    distance = FloatField(required=True)
    time = DateTimeField(default=datetime.utcnow)
    
