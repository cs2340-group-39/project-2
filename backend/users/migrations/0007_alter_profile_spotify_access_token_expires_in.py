# Generated by Django 5.1 on 2024-11-30 17:41

from django.db import migrations, models


class Migration(migrations.Migration):
  dependencies = [("users", "0006_profile_spotify_email")]

  operations = [
    migrations.AddField(
      model_name="profile",
      name="spotify_access_token_expires_in_new",
      field=models.DurationField(null=True, blank=True),
    ),
    migrations.RemoveField(
      model_name="profile", name="spotify_access_token_expires_in"
    ),
    migrations.RenameField(
      model_name="profile",
      old_name="spotify_access_token_expires_in_new",
      new_name="spotify_access_token_expires_in",
    ),
  ]