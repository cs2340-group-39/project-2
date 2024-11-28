from datetime import timedelta

AUTH_USER_MODEL = "users.User"

AUTHENTICATION_BACKENDS = ["django.contrib.auth.backends.ModelBackend", "users.backends.TokenAuthenticationBackend"]

AUTH_VERIFY_EMAIL_TIMEOUT = timedelta(days=1)
