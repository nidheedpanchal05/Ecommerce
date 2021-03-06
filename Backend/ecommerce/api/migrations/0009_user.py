# Generated by Django 3.1.2 on 2021-06-08 11:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_delete_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('user_name', models.CharField(max_length=100)),
                ('house_no', models.IntegerField()),
                ('pin_number', models.IntegerField(help_text='E.g. 400006')),
                ('address', models.CharField(default='', max_length=255)),
                ('phone', models.BigIntegerField(default=12)),
            ],
        ),
    ]
