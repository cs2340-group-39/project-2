from django.http import HttpRequest
from ninja import NinjaAPI

api = NinjaAPI(urls_namespace="users")


@api.get("authenticate-user")
def authenticate_user(request: HttpRequest):
  return {
    "success": False,
  }


@api.get("get-user")
def get_user(request: HttpRequest):
  return {
    "success": False,
  }


@api.get("logout-user")
def logout_user(request: HttpRequest):
  return {
    "success": False,
  }
