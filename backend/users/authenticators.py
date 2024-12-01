from typing import Optional

from django.contrib.auth import authenticate as authenticate_
from ninja.security import HttpBearer

from .models import User


class TokenAuthenticator(HttpBearer):
    def authenticate(self, request, token: str) -> Optional[User]:
        user = authenticate_(request, token=token)
        return user if user and user.is_authenticated else None


class SpotifyLinkedTokenAuthenticator(HttpBearer):
    def authenticate(self, request, token: str) -> Optional[User]:
        user = authenticate_(request, token_of_spotify_linked_user=token)
        return user if user and user.is_authenticated else None
