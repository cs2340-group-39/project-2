from django.http import HttpRequest
from ninja import NinjaAPI

api = NinjaAPI(urls_namespace="users")


@api.get("signup-user")
def signup_user(request: HttpRequest):
    return {"success": True}


@api.get("login-user")
def login_user(request: HttpRequest):
    return {"success": True}


@api.get("get-user")
def get_user(request: HttpRequest):
    return {"success": True}


@api.get("logout-user")
def logout_user(request: HttpRequest):
    return {"success": True}
