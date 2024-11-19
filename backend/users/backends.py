import jwt
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User
from django.http import HttpRequest
from jwt import DecodeError, ExpiredSignatureError, InvalidTokenError
from supabase import AuthApiError

from .models import SupabaseUser


class SupabaseTokenAuthenticationBackend(BaseBackend):
    def authenticate(self, request: HttpRequest, token=None):
        if not token:
            return None

        try:
            payload = jwt.decode(
                token,
                audience="authenticated",
                algorithms=["HS256"],
                options={
                    "verify_signature": False,
                    "verify_aud": True,
                    "verify_exp": True,
                },
            )

            uuid = payload["sub"]
            user = SupabaseUser.objects.get(pk=uuid)

            return user
        except (
            SupabaseUser.DoesNotExist,
            InvalidTokenError,
            ExpiredSignatureError,
            DecodeError,
            AuthApiError,
            KeyError,
        ):
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
