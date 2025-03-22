from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name


# Create SUPPLIERS model
class Supplier(models.Model):
    supplier_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    contact_name = models.CharField(max_length=255)
    contact_phone = models.CharField(max_length=50)
    address = models.TextField()

    def __str__(self):
        return self.name


# Create PRODUCTS model
class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.FloatField()
    quantity_in_stock = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


# Create CUSTOMERS model
class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=50)
    address = models.TextField()

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


# Create SALESORDERS model
class SalesOrder(models.Model):
    sales_order_id = models.AutoField(primary_key=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order_date = models.DateField()
    status = models.CharField(max_length=50)
    total_amount = models.FloatField()

    def __str__(self):
        return f'Order {self.sales_order_id} by {self.customer}'


# Create SALESORDERITEMS model
class SalesOrderItem(models.Model):
    sales_order_item_id = models.AutoField(primary_key=True)
    sales_order = models.ForeignKey(SalesOrder, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    unit_price = models.FloatField()
    total_price = models.FloatField()

    def __str__(self):
        return f'{self.product.name} (Order {self.sales_order.sales_order_id})'


# Create SALES model
class Sale(models.Model):
    sale_id = models.AutoField(primary_key=True)
    sales_order = models.ForeignKey(SalesOrder, on_delete=models.CASCADE)
    sale_date = models.DateField()
    amount = models.FloatField()
    payment_method = models.CharField(max_length=50)

    def __str__(self):
        return f'Sale {self.sale_id} for Order {self.sales_order.sales_order_id}'


# Create PURCHASEORDERS model
class PurchaseOrder(models.Model):
    purchase_order_id = models.AutoField(primary_key=True)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    order_date = models.DateField()
    status = models.CharField(max_length=50)
    total_cost = models.FloatField()

    def __str__(self):
        return f'PO {self.purchase_order_id} from {self.supplier}'


# Create PURCHASEORDERITEMS model
class PurchaseOrderItem(models.Model):
    purchase_order_item_id = models.AutoField(primary_key=True)
    purchase_order = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    unit_cost = models.FloatField()
    total_cost = models.FloatField()

    def __str__(self):
        return f'{self.product.name} (PO {self.purchase_order.purchase_order_id})'


# Create STOCKADJUSTMENTS model
class StockAdjustment(models.Model):
    stock_adjustment_id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    adjustment_type = models.CharField(max_length=50)
    adjustment_quantity = models.IntegerField()
    reason = models.TextField()
    adjustment_date = models.DateField()

    def __str__(self):
        return f'Adjustment for {self.product.name} on {self.adjustment_date}'


# Create USERS model
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    role = models.ForeignKey('Role', on_delete=models.CASCADE)

    def __str__(self):
        return self.username


# Create USER_INFO model
class UserInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    full_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=50)
    address = models.TextField()

    def __str__(self):
        return self.full_name


# Create ROLES model
class Role(models.Model):
    role_id = models.AutoField(primary_key=True)
    role_name = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.role_name


# Create AMOUNTGENERATED model
class AmountGenerated(models.Model):
    amount_generated_id = models.AutoField(primary_key=True)
    date = models.DateField()
    total_sales = models.FloatField()
    total_revenue = models.FloatField()


    def __str__(self):
        return self.name
    