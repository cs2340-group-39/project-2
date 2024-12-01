from typing import Optional

from django.contrib.auth import authenticate as _authenticate
from ninja.security import HttpBearer

from .models import User


class TokenAuthenticator(HttpBearer):
  def authenticate(self, request, token: str) -> Optional[User]:
    user = _authenticate(request, token=token)
    return user if user and user.is_authenticated else None


class SpotifyLinkedTokenAuthenticator(HttpBearer):
  def authenticate(self, request, token: str) -> Optional[User]:
    user = _authenticate(request, token_of_spotify_linked_user=token)
    return user if user and user.is_authenticated else None
