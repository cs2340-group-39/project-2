from django.urls import path

from .api import api as wrapped_api

app_name = "wrapped"

urlpatterns = [path("api/", wrapped_api.urls)]
