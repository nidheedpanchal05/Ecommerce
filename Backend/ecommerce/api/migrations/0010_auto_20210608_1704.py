# Generated by Django 3.1.2 on 2021-06-08 11:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='phone',
            new_name='phoneno',
        ),
    ]
