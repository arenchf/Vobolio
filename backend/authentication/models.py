from django.db import models
from django.contrib.auth.models import AbstractUser
import os,uuid
from django_cryptography.fields import encrypt
from django.utils import timezone


def update_filename(instance, filename):
    extension = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), extension)
    return os.path.join("users/", filename)

class User(AbstractUser):
    class DifficultyChoices(models.IntegerChoices):
        VERY_EASY           = 20, "Very Easy"
        EASY                = 15, "Easy"
        NORMAL              = 10, "Normal"
        DIFFICULT           = 5, "Hard"
        VERY_DIFFICULT      = 3, "Very Difficult"
        EXTREMELY_DIFFICULT = 1, "Extremely Difficult"


    id                      = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email                   = models.EmailField(blank=False)
    main_language           = models.CharField(max_length=10,null=False,default="EN")
    is_verified             = models.BooleanField(default=True)
    first_name              = None
    last_name               = None
    img                     = models.ImageField(upload_to=update_filename,blank=True,default="users/default_img.jpg")
    name                    = encrypt(models.CharField("name", max_length=300, blank=True))
    location                = encrypt(models.CharField(max_length=150,blank=True))
    public                  = models.BooleanField(default=False)
    difficulty              = models.IntegerField(choices=DifficultyChoices.choices,default=DifficultyChoices.NORMAL)

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self) -> str:
        return "{}".format(self.username)