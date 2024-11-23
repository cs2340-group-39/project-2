from requests import post, put, get
from .models import token
from django.utils import TIME_ZONE
from datetime import timedelta

BASE_URL = "https://api.spotify.com/v1/me/"

# Function to execute API requests to Spotify
def execute_spotify_api_request(session_id, endpoint, post_=False, put_=False):
    # Get the token associated with the session
    tokens = Token.objects.filter(user=session_id)
    
    if tokens.exists():  # If tokens are found, use the first one
        token = tokens[0]
    else:
        return None  # If no token is found, return None

    # Set up the authorization header
    headers = {'Authorization': f'Bearer {token.access_token}'}

    # Send the appropriate HTTP request based on post_ or put_ flags
    if post_:
        response = post(BASE_URL + endpoint, headers=headers)
    elif put_:
        response = put(BASE_URL + endpoint, headers=headers)
    else:
        response = get(BASE_URL + endpoint, headers=headers)

    # Check for a successful response
    if response.status_code == 200:
        return response.json()
    else:
        return {'Error': 'Request failed with status code: ' + str(response.status_code)}

# Function to create or update tokens in the database
def create_or_update_tokens(session_id, access_token, refresh_token, expires_in, token_type):
    # Find if a token already exists for the given session
    tokens = Token.objects.filter(user=session_id)

    expires_in = timezone.now() + timedelta(seconds=expires_in)  # Set the expiration date based on current time and expires_in

    if tokens.exists():
        # If a token exists, update it
        token = tokens[0]
        token.access_token = access_token
        token.refresh_token = refresh_token
        token.expires_in = expires_in
        token.token_type = token_type
        token.save(update_fields=['access_token', 'refresh_token', 'expires_in', 'token_type'])
    else:
        # If no token exists, create a new one
        Token.objects.create(
            user=session_id,
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=expires_in,
            token_type=token_type
        )
