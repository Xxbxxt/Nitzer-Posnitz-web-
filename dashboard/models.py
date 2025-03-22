from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)
    
class Supplier(models.Model):
    name = models.CharField(max_length=200)
    contact = models.CharField(max_length=200)

class Product(models.Model):
    name = models.CharField(max_length=200)
    sku = models.CharField(max_length=50, unique=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    stock_level = models.IntegerField(default=0)
    reorder_point = models.IntegerField(default=10)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    cost_price = models.DecimalField(max_digits=10, decimal_places=2)
    last_updated = models.DateTimeField(auto_now=True)

class Sale(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    sale_date = models.DateTimeField(auto_now_add=True)
    customer = models.CharField(max_length=200)
    total = models.DecimalField(max_digits=10, decimal_places=2)