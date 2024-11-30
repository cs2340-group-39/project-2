from django.conf import settings
from django.http import HttpRequest

from ..schemas import (
  AuthenticateWithSpotifyResponseSchema,
  UserResponseSchema,
)
from . import api


@api.get(
  "authenticate-with-spotify",
  response={200: AuthenticateWithSpotifyResponseSchema},
)
def authenticate_with_spotify_get(request: HttpRequest):
  return AuthenticateWithSpotifyResponseSchema(
    spotify_auth_url=f"https://accounts.spotify.com/authorize"
    f"?response_type=code"
    f"&client_id={settings.SPOTIFY_CLIENT_ID}"
    f"&scope={settings.SPOTIFY_SCOPES}"
    f"&redirect_uri={settings.SITE_URL}/users/api/o"
  )


@api.post(
  "authenticate-with-spotify", response={200: UserResponseSchema}
)
def authenticate_with_spotify_post(request: HttpRequest):
  pass
