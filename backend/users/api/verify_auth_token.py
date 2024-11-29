from django.http import HttpRequest

from ..authenticators import TokenAuthenticator
from ..schemas import TokenVerificationSchema
from . import api


@api.get(
  "verify-auth-token",
  response={200: TokenVerificationSchema},
  auth=TokenAuthenticator(),
)
def verify_auth_token(request: HttpRequest):
  user = request.auth

  if user is None:
    return 200, TokenVerificationSchema(verified=False)

  return 200, TokenVerificationSchema(verified=True)
