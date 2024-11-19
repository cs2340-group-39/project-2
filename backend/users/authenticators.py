from typing import Optional

from django.contrib.auth import authenticate as backend_authenticate
from ninja.security import HttpBearer

from .models import SupabaseUser


class SupabaseTokenAuthenticator(HttpBearer):
    def authenticate(self, request, token: str) -> Optional[SupabaseUser]:
        user = backend_authenticate(request, token=token)
        return user if user and user.is_authenticated else None
