# Generated by Django 5.1.3 on 2024-12-01 21:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [("users", "0001_initial")]

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
                ("public", models.BooleanField(default=False)),
                ("artists", models.JSONField(blank=True, default=list)),
                ("tracks", models.JSONField(blank=True, default=list)),
                (
                    "profile",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="wrapped_for_profile",
                        to="users.profile",
                    ),
                ),
            ],
        )
    ]
