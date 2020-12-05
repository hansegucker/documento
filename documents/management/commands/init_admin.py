import os

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    def handle(self, *args, **options):
        if User.objects.count() == 0:
            new_admin = User.objects.create_superuser(
                username=os.getenv("DOCUMENTO_SUPERUSER", "admin"),
                email=os.getenv("DOCUMENTO_SUPERUSER_MAIL", "admin@example.com"),
                password=os.getenv("DOCUMENTO_SUPERUSER_PASSWORD", "adminadmin"),
            )
            new_admin.save()
        else:
            print("Admin accounts can only be initialized if no Accounts exist")
