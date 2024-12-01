from django.http import HttpRequest

from ..authenticators import SpotifyLinkedTokenAuthenticator
from ..schemas import UserResponseSchema
from . import api


@api.get(
    "get-user", response={200: UserResponseSchema}, auth=SpotifyLinkedTokenAuthenticator()
)
def get_user(request: HttpRequest):
    user = request.auth

    return 200, UserResponseSchema(
        uuid=str(user.uuid), username=user.username, email=user.email
    )
