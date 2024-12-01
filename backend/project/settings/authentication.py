from datetime import timedelta

AUTH_USER_MODEL = "users.User"

AUTHENTICATION_BACKENDS = [
  "django.contrib.auth.backends.ModelBackend",
  "users.backends.TokenAuthenticationBackend",
  "users.backends.SpotifyLinkedAuthenticationBackend",
]

AUTH_VERIFY_EMAIL_TIMEOUT = timedelta(days=1)
AUTH_ACCESS_TOKEN_TIMEOUT = timedelta(days=5)
AUTH_REFRESH_TOKEN_TIMEOUT = timedelta(days=7)
