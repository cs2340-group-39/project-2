import jwt
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User
from django.http import HttpRequest
from jwt import DecodeError, ExpiredSignatureError, InvalidTokenError
from services.supabase import supabase
from supabase import AuthApiError

from .models import SupabaseUser


class SupabaseCredentialsAuthenticationBackend(BaseBackend):
    def authenticate(self, request: HttpRequest, username=None, password=None):
        if not username or not password:
            return None

        try:
            supabase_user = supabase.auth.sign_in_with_password({"email": username, "password": password})

            uuid = supabase_user["user"]["id"]
            user = SupabaseUser.objects.get(pk=uuid)

            return user
        except (SupabaseUser.DoesNotExist, AuthApiError):
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

    def has_perm(self, user_obj, perm, obj=None):
        return user_obj.is_staff or user_obj.is_superuser

    def has_module_perms(self, user_obj, app_label):
        return user_obj.is_staff or user_obj.is_superuser


class SupabaseTokenAuthenticationBackend(BaseBackend):
    def authenticate(self, request: HttpRequest, token=None):
        if not token:
            return None

        try:
            payload = jwt.decode(token, algorithms=["HS256"], options={"verify_signature": True, "verify_aud": False})

            uuid = payload["sub"]
            user = SupabaseUser.objects.get(pk=uuid)

            return user
        except (SupabaseUser.DoesNotExist, InvalidTokenError, ExpiredSignatureError, DecodeError, AuthApiError):
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

    def has_perm(self, user_obj, perm, obj=None):
        return user_obj.is_staff or user_obj.is_superuser

    def has_module_perms(self, user_obj, app_label):
        return user_obj.is_staff or user_obj.is_superuser
