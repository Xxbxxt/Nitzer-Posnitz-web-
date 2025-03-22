from django.db.models import F
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.utils import timezone
from .models import Product, Sale, Category
from django.db.models import Sum
from .forms import ProductForm


# Create your views here.

def dashboard(request):
    products = Product.objects.all()
    low_stock = Product.objects.filter(stock_level__lt=F('reorder_point'))
    
    return render(request, 'dashboard/dashboard.html', {
        'products': products,
        'categories': Category.objects.all(),
        'low_stock_count': low_stock.count(),
        'monthly_sales': Sale.objects.filter(
            sale_date__month=timezone.now().month
        ).aggregate(Sum('total'))['total__sum'] or 0
    })

def delete_product(request, pk):
    if request.method == 'POST':
        product = get_object_or_404(Product, pk=pk)
        product.delete()
        return JsonResponse({'status': 'success'})