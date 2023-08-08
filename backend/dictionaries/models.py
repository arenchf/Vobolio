from django.db import models
from django.core.validators import MaxValueValidator,MinValueValidator
import uuid
from django_cryptography.fields import encrypt

# Create your models here.

class Dictionary(models.Model):
    # id                      = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                    = models.CharField(max_length=64,null=False)
    created_by              = models.ForeignKey(
        "authentication.User",related_name="dictionaries",on_delete=models.SET_NULL,null=True
    )
    created_at              = models.DateTimeField(auto_now_add=True)
    language                = models.CharField(max_length=10,null=False)
    public                  = models.BooleanField(default=False,null=False,blank=True)

    class Meta:
        verbose_name = "dictionary"
        verbose_name_plural = "dictionaries"
        # unique_together = ("name","created_by")
    
    def __str__(self) -> str:
        return "{}({})".format(self.name,self.language)



class Category(models.Model):
    # id                      = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                    = models.CharField(max_length=64,null=False)
    dictionary              = models.ForeignKey(Dictionary,related_name="categories", on_delete=models.CASCADE,null=False)
    
    class Meta():
        verbose_name_plural = "categories"

    def __str__(self) -> str:
        return "{}".format(self.name)


class Word(models.Model):
    # id                      = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    word                    = models.CharField(max_length=255,null=False)
    translation             = models.CharField(max_length=255,null=True)
    sentence                = models.TextField(blank=True)
    sentence_translation    = models.TextField(blank=True)
    dictionary              = models.ForeignKey(Dictionary,related_name="words",on_delete=models.CASCADE,null=False)
    progress                = models.IntegerField(
        blank=True,
        editable=False,
        default=0,
        validators=[
            MaxValueValidator(100),
            MinValueValidator(0)
        ]
    )
    earned                  = models.BooleanField(default=False,null=False,blank=True)
    categories              = models.ManyToManyField(Category,blank=True)
    created_at              = models.DateTimeField(auto_now_add=True)
    created_by              = models.ForeignKey(
        "authentication.User", on_delete=models.SET_NULL,null=True
    )
    updated_at              = models.DateTimeField(auto_now=True)
    last_progress_at        = models.DateTimeField(null=True, blank=True)
    last_decline            = models.DateField(null=True,blank=True)

    def __str__(self) -> str:
        return "{}({})->{}({})".format(self.word,self.dictionary.language,self.translation,self.created_by.main_language)

class TrainingDay(models.Model):
    day = models.DateField(null=False)
