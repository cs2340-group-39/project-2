import jwt
from django.contrib.auth.backends import BaseBackend
from django.http import HttpRequest
from jwt import DecodeError, ExpiredSignatureError, InvalidTokenError

from .models import User


class TokenAuthenticationBackend(BaseBackend):
    def authenticate(self, request: HttpRequest, token=None):
        if not token:
            return None

        try:
            payload = jwt.decode(token, algorithms=["HS256"], options={"verify_signature": False, "verify_exp": True})

            uuid = payload["sub"]
            user = User.objects.get(pk=uuid)

            return user
        except (User.DoesNotExist, InvalidTokenError, ExpiredSignatureError, DecodeError, KeyError):
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
