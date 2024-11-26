from django.contrib.auth import authenticate
from django.contrib.auth.models import AnonymousUser
from django.http import HttpRequest
from django.utils.deprecation import MiddlewareMixin


class SupabaseAuthenticationMiddleware(MiddlewareMixin):
  def __init__(self, get_response):
    self.get_response = get_response
    super().__init__(get_response)

  def process_request(self, request: HttpRequest):
    if request.user is not None and not isinstance(request.user, AnonymousUser):
      return self.get_response(request)

    request.user = AnonymousUser()

    authorization_header = request.headers.get("Authorization")
    if not authorization_header:
      return self.get_response(request)

    try:
      token = authorization_header.strip("Bearer").strip()
      user = authenticate(request, token=token)
      if user is not None:
        request.user = user
    except Exception:
      self.get_response(request)
