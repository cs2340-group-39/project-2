# Generated by Django 5.1.3 on 2024-11-18 08:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="supabaseuser",
            name="is_superuser",
            field=models.BooleanField(default=False),
        ),
    ]
