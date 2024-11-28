from django.http import HttpRequest

from ..schemas import UserErrorResponseSchema, UserResponseSchema
from . import api


@api.get(
  "login",
  response={200: UserResponseSchema, 400: UserErrorResponseSchema},
)
def login(request: HttpRequest):
  pass
