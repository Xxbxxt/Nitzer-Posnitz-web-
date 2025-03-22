from django.urls import path
from . import views
    
    
urlpatterns = [
    path('dashboard/', views.dashboard, name='dashboard'),
    path('product/delete/<int:pk>/', views.delete_product, name='delete_product'),
]