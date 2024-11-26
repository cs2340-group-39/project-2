from typing import Optional

from django.contrib.auth import authenticate as supabase_token_authenticate
from ninja.security import HttpBearer

from .models import SupabaseUser


class SupabaseTokenAuthenticator(HttpBearer):
    def authenticate(self, request, token: str) -> Optional[SupabaseUser]:
        user = supabase_token_authenticate(request, token=token)
        return user if user and user.is_authenticated else None
