from django.http import HttpRequest

from ..authenticators import TokenAuthenticator
from ..schemas import UserErrorResponseSchema, UserResponseSchema
from . import api


@api.delete(
  "delete",
  response={201: UserResponseSchema, 400: UserErrorResponseSchema},
  auth=TokenAuthenticator(),
)
def delete(request: HttpRequest):
  pass
