from django.contrib.auth import authenticate
from ninja.security import HttpBearer


class SupabaseTokenAuthenticator(HttpBearer):
    def authenticate(self, request, token):
        user = authenticate(request, token=token)
        if user is not None:
            return user
