from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from services.supabase import supabase


class SupabaseUserManager(BaseUserManager):
    def create_user(self, email, password, username=None):
        supabase.auth.sign_up({"email": email, "password": password})

        user = SupabaseUser.objects.get(email=email)

        if not username:
            username = str(user.uuid)
        user.username = username

        user.save()

        return user

    def create_superuser(self, email, password, username=None):
        user = self.create_user(email=self.normalize_email(email), username=username, password=password)

        user.is_staff = True
        user.is_active = True
        user.is_superuser = True

        user.save()

        return user


class SupabaseUser(AbstractBaseUser, PermissionsMixin):
    uuid = models.UUIDField(unique=True, editable=False, primary_key=True)

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=36, unique=True, blank=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = SupabaseUserManager()

    def get_short_name(self):
        return self.username

    def delete(self):
        supabase.auth.admin.delete_user(self.uuid)
        super().delete()

    def __str__(self):
        return self.email
