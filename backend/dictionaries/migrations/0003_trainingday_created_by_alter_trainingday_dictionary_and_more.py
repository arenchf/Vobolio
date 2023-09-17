# Generated by Django 4.2 on 2023-08-25 03:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('dictionaries', '0002_remove_trainingday_day_trainingday_created_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='trainingday',
            name='created_by',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='trainingday',
            name='dictionary',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='trainings', to='dictionaries.dictionary'),
        ),
        migrations.AlterField(
            model_name='trainingday',
            name='right_answers',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='trainingday',
            name='total_answers',
            field=models.IntegerField(default=0),
        ),
    ]