from django.db import models
from django.contrib.auth.models import AbstractUser
import os,uuid
# Create your models here.


class User(AbstractUser):
    id                      = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email                   = models.EmailField(blank=False)
    is_verified             = models.BooleanField(default=True)

    def __repr__(self) -> str:
        return "{}".format(self.username)