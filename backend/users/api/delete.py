from django.http import HttpRequest

from ..authenticators import TokenAuthenticator
from . import api


@api.delete("delete", auth=TokenAuthenticator())
def delete(request: HttpRequest):
  user = request.auth

  try:
    user.delete()
  except Exception as e:
    print(f"Unexpected error deleting `User` object: {e}")
    return 500

  return 200
