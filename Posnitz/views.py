from django.shortcuts import render
from .models import Item
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required
def index(request):
    return render(request, 'Posnitz/index.html')

def analytics(request):
    return render(request, 'Posnitz/analytics.html')

def chatbot(request):
    return render(request, 'Posnitz/chatbot.html')

def inventory(request):
    
    return render(request, 'Posnitz/inventory.html')

def base(request):
    return render(request, )

def home(request):
    items = Item.objects.all()
    return render(request, 'Posnitz/home.html', {'items': items})