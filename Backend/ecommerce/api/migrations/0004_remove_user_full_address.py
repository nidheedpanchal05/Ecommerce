# Generated by Django 3.1.2 on 2021-06-08 10:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210608_1622'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='full_address',
        ),
    ]