import uuid as uuid_

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, username=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address.")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()

        if not username:
            username = str(user.uuid)
        user.username = username

        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, username=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have `is_staff=True`.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have `is_superuser=True.`")

        return self.create_user(email, password, username, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    uuid = models.UUIDField(
        unique=True, default=uuid_.uuid4, editable=False, primary_key=True
    )

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=36, unique=True, blank=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    email_verification_code = models.UUIDField(null=True, blank=True)
    email_verification_code_created_at = models.DateTimeField(null=True, blank=True)
    email_verified_at = models.DateTimeField(null=True, blank=True)

    token_salt = models.UUIDField(default=uuid_.uuid4)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = UserManager()

    def get_short_name(self):
        return self.username

    def delete(self):
        super().delete()

    def __str__(self):
        return self.email
