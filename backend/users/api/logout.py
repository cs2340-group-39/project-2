from django.http import HttpRequest

from ..authenticators import TokenAuthenticator
from ..schemas import UserErrorResponseSchema, UserResponseSchema
from . import api


@api.get(
    "logout",
    response={200: UserResponseSchema, 400: UserErrorResponseSchema},
    auth=TokenAuthenticator(),
)
def logout(request: HttpRequest):
    pass
