from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import url
from . import views

urlpatterns = [
    path(('all-products/products'), views.ProductListFiltered.as_view()),
    path('all-products/', views.ProductList.as_view()),
    path('all-products/<int:pid>/', views.ProductAlter.as_view()),
    path('category/', views.Categories.as_view(), name="category"),
    path('category/<str:catname>/', views.Catelog.as_view(), name="catelog"),
    path('seller/', views.Sellers.as_view(), name="seller"),
    path('user/', views.WebUsers.as_view())
]

