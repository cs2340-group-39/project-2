# Generated by Django 5.1 on 2024-12-01 00:04

import django.contrib.postgres.fields
import django.db.models.deletion
import wrapped.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("users", "0008_remove_profile_spotify_access_token_expires_in_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Wrapped",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "artists",
                    django.contrib.postgres.fields.ArrayField(
                        base_field=wrapped.fields.PydanticJSONField(), size=3
                    ),
                ),
                (
                    "albums",
                    django.contrib.postgres.fields.ArrayField(
                        base_field=wrapped.fields.PydanticJSONField(), size=2
                    ),
                ),
                (
                    "genres",
                    django.contrib.postgres.fields.ArrayField(
                        base_field=wrapped.fields.PydanticJSONField(), size=2
                    ),
                ),
                (
                    "profile",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="wrapped_for_profile",
                        to="users.profile",
                    ),
                ),
            ],
        ),
    ]