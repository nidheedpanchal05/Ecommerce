# Generated by Django 3.1.2 on 2021-06-05 14:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('category_id', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('category_name', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='Seller',
            fields=[
                ('seller_id', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('seller_name', models.CharField(max_length=80)),
                ('email', models.EmailField(max_length=100)),
                ('contact', models.BigIntegerField()),
                ('company_name', models.CharField(max_length=100)),
                ('status', models.CharField(max_length=20)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('product_id', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('product_name', models.CharField(max_length=100)),
                ('prod_image', models.ImageField(upload_to='uploads/')),
                ('price', models.DecimalField(decimal_places=2, max_digits=7)),
                ('description', models.CharField(blank=True, max_length=255, null=True)),
                ('stock', models.IntegerField()),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.category')),
                ('seller', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.seller')),
            ],
            options={
                'ordering': ('-date_added',),
            },
        ),
    ]
