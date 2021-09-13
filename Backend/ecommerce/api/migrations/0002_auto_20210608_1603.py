# Generated by Django 3.1.2 on 2021-06-08 10:33

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('user_name', models.CharField(max_length=100)),
                ('house_no', models.IntegerField()),
                ('pin_number', models.IntegerField()),
                ('address', models.CharField(max_length=255)),
                ('full_address', models.Field(verbose_name=[models.IntegerField(), models.IntegerField(), models.CharField(max_length=255)])),
            ],
        ),
        migrations.AddField(
            model_name='seller',
            name='seller_password',
            field=models.CharField(default=django.utils.timezone.now, max_length=255),
            preserve_default=False,
        ),
    ]
