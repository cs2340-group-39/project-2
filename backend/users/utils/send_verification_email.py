import os
import uuid

from django.conf import settings
from django.core.mail import EmailMultiAlternatives, get_connection
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.html import strip_tags

from . import User


def send_verification_email(user):
    code = uuid.uuid4()

    User.objects.filter(pk=user.uuid).update(
        email_verification_code=code, email_verification_code_created_at=timezone.now()
    )

    context = {
        "user": user,
        "verification_url": f"{settings.SITE_URL}/users/api/verify?code={code}",
        "site_name": settings.SITE_NAME,
        "valid_for": str(settings.AUTH_VERIFY_EMAIL_TIMEOUT),
    }

    subject = "Confirm Your Email"
    recipient_list = [user.email]
    from_email = settings.DEFAULT_FROM_EMAIL

    html_content = render_to_string("users/emails/verify_email.html", context)
    text_content = strip_tags(html_content)

    with get_connection(
        host=settings.RESEND_SMTP_HOST,
        port=settings.RESEND_SMTP_PORT,
        username=settings.RESEND_SMTP_USERNAME,
        password=os.getenv("RESEND_API_KEY"),
        use_tls=True,
    ) as connection:
        email = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            to=recipient_list,
            from_email=from_email,
            connection=connection,
        )

        email.attach_alternative(html_content, "text/html")
        email.send()
