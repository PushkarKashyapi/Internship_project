# serializers.py
from rest_framework import serializers
from .models import EmergencyAlert

class EmergencyAlertSerializer(serializers.Serializer):
    name = serializers.CharField()
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()
    timestamp = serializers.DateTimeField(read_only=True)
