import uuid

import jwt
from django.conf import settings
from django.utils import timezone


def get_token_secret_key(user):
    return f"{settings.SECRET_KEY}${str(user.token_salt)}"


def generate_tokens(user):
    current_time = timezone.now()

    access_token = jwt.encode(
        {
            "sub": str(user.uuid),
            "iat": int(current_time.timestamp()),
            "exp": int((current_time + settings.AUTH_ACCESS_TOKEN_TIMEOUT).timestamp()),
            "type": "access",
            "jti": str(uuid.uuid4()),
        },
        get_token_secret_key(user),
        algorithm="HS256",
    )

    refresh_token = jwt.encode(
        {
            "sub": str(user.uuid),
            "iat": int(current_time.timestamp()),
            "exp": int((current_time + settings.AUTH_REFRESH_TOKEN_TIMEOUT).timestamp()),
            "type": "refresh",
            "jti": str(uuid.uuid4()),
        },
        get_token_secret_key(user),
        algorithm="HS256",
    )

    return access_token, refresh_token
