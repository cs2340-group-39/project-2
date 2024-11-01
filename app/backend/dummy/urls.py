from django.urls import path

from .api import api

app_name = "dummy"

urlpatterns = [
        path("api/", api.urls),
]
