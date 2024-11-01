from django.core.management.base import BaseCommand


class Command(BaseCommand):
        def handle(self, *args, **kwargs):
                self.setup_tunnel()

        def setup_tunnel(self):
                raise NotImplementedError()
