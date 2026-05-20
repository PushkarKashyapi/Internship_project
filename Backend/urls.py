from django.urls import path
from . import views

urlpatterns = [
    path('viewer/', views.home, name='viewer'),
    path('insert/', views.insert_user, name='insert_user'),
    path('sensordata/', views.post_req, name='post_sensordata'),
    path('showdata/', views.show_sensor_data, name='show_sensor_data'),
    path('test-alert/', views.trigger_alert_browser, name='trigger_alert_browser'),
    path('get-latest-alert/', views.get_latest_alert, name='get_latest_alert'),
    path('dashboard/', views.show_emergency_alert, name='show_emergency_alert'),
     path('confirm-alert/', views.confirm_emergency_alert, name='show_emergency_alert'),
     path('cancel_alert/<str:alert_id>/', views.cancel_alert, name='cancel_alert'),
    path('cancelled/', views.cancel_alert_browser, name='cancel_alert_browser'),
    path('pothole/', views.pothole_alert, name='pothole_alert')
]
