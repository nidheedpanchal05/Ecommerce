from django.shortcuts import render

from django.http import HttpResponse
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.filters import OrderingFilter
from . models import Seller, Category, Product, WebUser
from . serializers import CategorySerializer, ProductSerializer, SellerSerializer, WebUserSerializer

# Create your views here.

class ProductList(APIView):

    def get(self, request):
        products = Product.objects.all()
        serialized = ProductSerializer(products, many=True)
        return Response(serialized.data)

    def post(self, request):
        serialize = ProductSerializer(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data, status=status.HTTP_201_CREATED)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductListFiltered(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (OrderingFilter,)
    ordering_fields = ('date_added', 'price')

class ProductAlter(APIView):

    def put(self, request, pid, format=None):
        product = Product.objects.get(pk=pid)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pid, format=None):
        productId = Product.objects.get(pk=pid)
        productId.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class Categories(APIView):

    def get(self, request):
        categories = Category.objects.all()
        serialized = CategorySerializer(categories, many=True)
        return Response(serialized.data)

class Sellers(APIView):

    def get(self, request):
        sellers = Seller.objects.all()
        serialized = SellerSerializer(sellers, many=True)
        return Response(serialized.data)

    def post(self, request):
        serialize = SellerSerializer(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data, status=status.HTTP_201_CREATED)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)


class Catelog(APIView):

    def get(self, request, catname):
        # If the category exists in category table
        existing_category = Category.objects.get(category_name = catname)

        catelog = Product.objects.filter(category = existing_category.category_id)
        serialized = ProductSerializer(catelog, many=True)
        if serialized:
            return Response(serialized.data)
        return 'No data'

class WebUsers(APIView):

    def get(self, request):
        webusers = WebUser.objects.all()
        serialized = WebUserSerializer(webusers, many=True)
        return Response(serialized.data)
