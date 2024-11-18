from django.http import HttpRequest
from ninja import NinjaAPI

api = NinjaAPI(urls_namespace="users")


@api.get("get-user")
def get_user(request: HttpRequest):
    return {"success": False}
