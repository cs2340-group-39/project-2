from django.db import models
from users.models import Profile


class Wrapped(models.Model):
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="wrapped_for_profile"
    )

    public = models.BooleanField(default=False)

    artists = models.JSONField(default=list, blank=True)
    tracks = models.JSONField(default=list, blank=True)
