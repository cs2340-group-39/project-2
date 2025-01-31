from django.urls import path

from .api import api as users_api

app_name = "users"

urlpatterns = [path("api/", users_api.urls)]
