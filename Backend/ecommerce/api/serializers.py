from django.db.models import fields
from rest_framework import serializers
from . models import Seller, Category, Product, WebUser

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'

class SellerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Seller
        fields = '__all__'

class WebUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebUser
        fields = '__all__'
