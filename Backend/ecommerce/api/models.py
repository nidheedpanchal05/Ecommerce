from django.db import models
from django.db.models.deletion import CASCADE, PROTECT
from django.utils import timezone

# Create your models here.

class Category(models.Model):
    category_id = models.AutoField(auto_created = True, primary_key = True)
    category_name = models.CharField(max_length=40)

    def __str__(self):
        return self.category_name

class Seller(models.Model):
    seller_id = models.AutoField(auto_created = True, primary_key = True)
    seller_name = models.CharField(max_length=80)
    email = models.EmailField(max_length=100, unique=True)
    contact = models.BigIntegerField()
    company_name = models.CharField(max_length=100)
    seller_password = models.CharField(max_length= 255)
    status = models.CharField(max_length=20)
    date_joined =  models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.seller_name 

class Product(models.Model):
    product_id = models.AutoField(auto_created=True, primary_key=True)
    product_name = models.CharField(max_length=100)
    prod_image = models.ImageField(upload_to = 'uploads/')
    price = models.DecimalField(max_digits=7, decimal_places=2)
    description = models.CharField( blank=True, null=True ,max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    seller = models.ForeignKey(Seller, on_delete=CASCADE)
    stock = models.IntegerField()
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-date_added',)

    def __str__(self):
        return self.product_name

class WebUser(models.Model):
    user_id = models.AutoField(auto_created=True, primary_key=True)
    user_name = models.CharField(max_length=100,null=False)
    house_no = models.IntegerField()
    pin_number = models.IntegerField(help_text="E.g. 400006")
    address = models.CharField(max_length=255, default='')
    phoneno = models.BigIntegerField()

    def __str__(self):
        return self.user_name
