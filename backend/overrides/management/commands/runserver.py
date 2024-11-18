import textwrap

from django.core.management.commands.migrate import Command as RunServerCommand
from django.db import connection


class Command(RunServerCommand):
    def handle(self, *args, **options):
        with connection.cursor() as cursor:
            cursor.execute(
                textwrap.dedent(
                    """
                    CREATE SCHEMA IF NOT EXISTS private;
                    ALTER USER "postgres" SET search_path TO private;
                    SET search_path TO private;
                    """
                )
            )
        return super().handle(*args, **options)
