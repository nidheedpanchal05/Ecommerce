# Generated by Django 3.1.2 on 2021-06-08 11:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20210608_1704'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='User',
            new_name='WebUser',
        ),
    ]
