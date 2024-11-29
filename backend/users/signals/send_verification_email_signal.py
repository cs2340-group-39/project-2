from django.db.models.signals import post_save
from django.dispatch import receiver

from ..utils import send_verification_email as _send_verification_email
from . import User


@receiver(post_save, sender=User)
def send_verification_email(sender, instance, created, **kwargs):
  if not (instance.is_staff or instance.is_superuser) and (
    created and not instance.is_active
  ):
    _send_verification_email(instance)