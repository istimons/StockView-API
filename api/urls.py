from django.urls import path
from .views import get_stock_price

urlpatterns = [
    path('price/', get_stock_price),
]

