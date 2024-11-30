from django.db import models

from .user import User


class Profile(models.Model):
  user = models.OneToOneField(
    User, on_delete=models.CASCADE, related_name="profile_for_user"
  )

  spotify_email = models.EmailField(blank=True, null=True)
  spotify_access_token = models.CharField(
    max_length=10000, blank=True, null=True
  )
  spotify_refresh_token = models.CharField(
    max_length=10000, blank=True, null=True
  )
  spotify_access_token_expires_in = models.DateTimeField(
    null=True, blank=True
  )
