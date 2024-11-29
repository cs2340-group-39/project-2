from django.http import HttpRequest

from ..backends import TokenAuthenticationBackend
from ..schemas import (
  TokenVerificationRequestSchema,
  TokenVerificationResponseSchema,
)
from . import api


@api.post(
  "verify-access-token", response={200: TokenVerificationResponseSchema}
)
def verify_access_token(
  request: HttpRequest, data: TokenVerificationRequestSchema
):
  user = TokenAuthenticationBackend().authenticate(
    request=request, token=data.access_token
  )

  if user is None:
    return 200, TokenVerificationResponseSchema(verified=False)

  return 200, TokenVerificationResponseSchema(verified=True)
