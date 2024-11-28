import os
import uuid

from django.conf import settings
from django.core.mail import EmailMultiAlternatives, get_connection
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.html import strip_tags

from . import User


@receiver(post_save, sender=User)
def send_verification_email(sender, instance, created, **kwargs):
  if not (instance.is_staff or instance.is_superuser) and (
    created and not instance.is_active
  ):
    code = uuid.uuid4()

    User.objects.filter(pk=instance.uuid).update(
      email_verification_code=code,
      email_verification_code_created_at=timezone.now(),
    )

    context = {
      "user": instance,
      "verification_url": f"{settings.SITE_URL}/users/api/verify?code={code}&redirect_to={settings.SITE_URL}/users/api/callback",
      "site_name": settings.SITE_NAME,
      "valid_for": str(settings.AUTH_VERIFY_EMAIL_TIMEOUT),
    }

    subject = "Confirm Your Email"
    recipient_list = [instance.email]
    from_email = settings.DEFAULT_FROM_EMAIL

    html_content = render_to_string(
      "users/emails/verify_email.html", context
    )
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
