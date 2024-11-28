import os

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

DEFAULT_FROM_EMAIL = os.getenv("RESEND_FROM_EMAIL")
