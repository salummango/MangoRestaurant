from django.urls import path
from .views import FoodAPIView,FoodDetailAPIView

urlpatterns = [
    path('foods', FoodAPIView.as_view(), name='food-api'),
    path('foods/<int:pk>', FoodDetailAPIView.as_view(), name='food-detail'),

    # Other URL patterns...
]
