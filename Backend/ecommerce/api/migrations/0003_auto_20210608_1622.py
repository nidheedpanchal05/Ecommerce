# Generated by Django 3.1.2 on 2021-06-08 10:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210608_1603'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAddress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('house_no', models.IntegerField()),
                ('pin_number', models.IntegerField(help_text='E.g. 400006')),
                ('address', models.CharField(max_length=255)),
            ],
        ),
        migrations.RemoveField(
            model_name='user',
            name='address',
        ),
        migrations.RemoveField(
            model_name='user',
            name='house_no',
        ),
        migrations.RemoveField(
            model_name='user',
            name='pin_number',
        ),
        migrations.AlterField(
            model_name='user',
            name='full_address',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='full_address', to='api.useraddress'),
        ),
    ]
