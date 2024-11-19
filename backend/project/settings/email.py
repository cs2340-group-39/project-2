import os

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

EMAIL_HOST = "smtp.resend.com"

EMAIL_PORT = 465

EMAIL_HOST_USER = os.getenv("RESEND_USERNAME")

EMAIL_HOST_PASSWORD = os.getenv("RESEND_API_KEY")

EMAIL_USE_TLS = False
