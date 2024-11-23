from django.http import HttpRequest
from ninja import NinjaAPI

api = NinjaAPI(urls_namespace="dummy")


@api.get("get-dummy-data")
def get_dummy_data(request: HttpRequest):
  return {
    "dummy_data": "Hello, World!",
  }

