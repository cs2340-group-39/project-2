from django.db import models

from ..users.models import Profile


class WrappedManager(models.Manager):
  def create(self):
    wrapped = self.model()
    wrapped.save()
    return wrapped

  def get():
    """Filter by profile."""
    super.create()


class Wrapped(models.Model):
  profile = models.ForeignKey(
    Profile,
    on_delete=models.CASCADE,
    related_name="wrapped_for_profile",
  )

  objects = WrappedManager()
