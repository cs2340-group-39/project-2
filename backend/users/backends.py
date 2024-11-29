import jwt
from django.contrib.auth.backends import BaseBackend
from django.http import HttpRequest
from jwt import (
  DecodeError,
  ExpiredSignatureError,
  InvalidSignatureError,
  InvalidTokenError,
)

from .models import User
from .utils import get_token_secret_key


class TokenAuthenticationBackend(BaseBackend):
  def authenticate(self, request: HttpRequest, token=None):
    if not token:
      return None

    try:
      try:
        payload = jwt.decode(
          token,
          algorithms=["HS256"],
          options={"verify_signature": False},
        )
      except DecodeError:
        return None

      try:
        uuid = payload["sub"]
        user = User.objects.get(pk=uuid)
      except (User.DoesNotExist, KeyError):
        return None

      try:
        jwt.decode(
          token,
          get_token_secret_key(user),
          algorithms=["HS256"],
          options={"verify_signature": True},
        )
      except (
        InvalidTokenError,
        ExpiredSignatureError,
        InvalidSignatureError,
      ):
        return None

      return user
    except Exception as e:
      print(f"Decoding the JWT failed unexpectedly: {str(e)}")
      return None

  def get_user(self, user_id):
    try:
      return User.objects.get(pk=user_id)
    except User.DoesNotExist:
      return None
