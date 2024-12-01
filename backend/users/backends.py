import base64
from datetime import timedelta

import jwt
import requests
from django.conf import settings
from django.contrib.auth.backends import BaseBackend
from django.http import HttpRequest
from django.utils import timezone
from jwt import (
  DecodeError,
  ExpiredSignatureError,
  InvalidAlgorithmError,
  InvalidSignatureError,
  InvalidTokenError,
)
from requests.exceptions import RequestException

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
        InvalidAlgorithmError,
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


class SpotifyLinkedAuthenticationBackend(TokenAuthenticationBackend):
  def authenticate(
    self, request: HttpRequest, token_of_spotify_linked_user=None
  ):
    user = super().authenticate(request, token_of_spotify_linked_user)

    if user:
      profile = user.profile_for_user
      if (
        profile.spotify_access_token
        and profile.spotify_refresh_token
        and profile.spotify_access_token_expires_at
      ):
        if (
          profile.spotify_access_token_expires_at - timezone.now()
        ) < timedelta(minutes=10):
          try:
            credentials = base64.b64encode(
              f"{settings.SPOTIFY_CLIENT_ID}:{settings.SPOTIFY_CLIENT_SECRET}".encode()
            ).decode()

            response = requests.post(
              "https://accounts.spotify.com/api/token",
              headers={
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": f"Basic {credentials}",
              },
              data={
                "grant_type": "refresh_token",
                "refresh_token": profile.spotify_refresh_token,
                "client_id": settings.SPOTIFY_CLIENT_ID,
              },
            )

            response.raise_for_status()

            data = response.json()

            profile.spotify_access_token = data["access_token"]
            if data.get("refresh_token"):
              profile.spotify_refresh_token = data["refresh_token"]
            profile.spotify_access_token_expires_at = (
              timezone.now() + timedelta(seconds=data["expires_in"])
            )
            profile.save()
          except RequestException as e:
            print(f"Unexpected error refreshing spotify tokens: {e}")
            return None

        return user

    return None
