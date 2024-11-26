AUTH_USER_MODEL = "users.SupabaseUser"

AUTHENTICATION_BACKENDS = ["django.contrib.auth.backends.ModelBackend", "users.backends.SupabaseTokenAuthenticationBackend"]
