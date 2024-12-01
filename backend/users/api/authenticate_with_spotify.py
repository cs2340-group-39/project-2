import base64
from datetime import timedelta

import requests
from django.conf import settings
from django.http import HttpRequest
from django.utils import timezone
from requests.exceptions import RequestException

from ..authenticators import TokenAuthenticator
from ..schemas import (
    AuthenticateWithSpotifyRequestSchema,
    AuthenticateWithSpotifyResponseSchema,
    UserErrorResponseSchema,
    UserResponseSchema,
)
from ..utils import generate_tokens
from . import api


@api.get("authenticate-with-spotify", response={200: AuthenticateWithSpotifyResponseSchema})
def authenticate_with_spotify(request: HttpRequest):
    return AuthenticateWithSpotifyResponseSchema(
        spotify_auth_url=f"https://accounts.spotify.com/authorize"
        f"?response_type=code"
        f"&client_id={settings.SPOTIFY_CLIENT_ID}"
        f"&scope={settings.SPOTIFY_SCOPES}"
        f"&redirect_uri={settings.SITE_URL}/users/api/o/"
    )


@api.post(
    "link-user-with-spotify",
    response={400: UserErrorResponseSchema, 200: UserResponseSchema},
    auth=TokenAuthenticator(),
)
def link_user_with_spotify(
    request: HttpRequest, data: AuthenticateWithSpotifyRequestSchema
):
    user = request.auth
    profile = user.profile_for_user

    credentials = base64.b64encode(
        f"{settings.SPOTIFY_CLIENT_ID}:{settings.SPOTIFY_CLIENT_SECRET}".encode()
    ).decode()

    try:
        response = requests.post(
            "https://accounts.spotify.com/api/token",
            headers={
                "content-type": "application/x-www-form-urlencoded",
                "Authorization": f"Basic {credentials}",
            },
            data={
                "code": data.code,
                "redirect_uri": f"{settings.SITE_URL}/users/api/o/",
                "grant_type": "authorization_code",
            },
        )

        response.raise_for_status()
    except RequestException:
        return 400, UserErrorResponseSchema(
            detail="Unable to retrieve Spotify access token for user."
        )

    spotify_data = response.json()
    if not all(
        key in spotify_data
        for key in ["access_token", "token_type", "scope", "expires_in", "refresh_token"]
    ):
        raise ValueError("Spotify API error: Missing required fields in Spotify response.")

    try:
        spotify_profile = requests.get(
            "https://api.spotify.com/v1/me",
            headers={"Authorization": f"Bearer {spotify_data["access_token"]}"},
        )
        spotify_profile.raise_for_status()
    except RequestException:
        return 400, UserErrorResponseSchema(
            detail="Unable to retrieve Spotify profile for user."
        )

    spotify_profile = spotify_profile.json()

    profile.spotify_email = spotify_profile["email"]
    profile.spotify_access_token = spotify_data["access_token"]
    profile.spotify_refresh_token = spotify_data["refresh_token"]
    profile.spotify_access_token_expires_at = timezone.now() + timedelta(
        seconds=spotify_data["expires_in"]
    )
    profile.save()

    access_token, refresh_token = generate_tokens(user)

    return 200, UserResponseSchema(
        uuid=str(user.uuid),
        username=user.username,
        email=user.email,
        access_token=access_token,
        refresh_token=refresh_token,
    )
