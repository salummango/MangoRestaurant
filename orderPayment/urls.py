from django.urls import path
from .views import OrderAPIView
from . import views
from .views import payment
from .views import cancel_order

urlpatterns = [
    path('orders/', OrderAPIView.as_view(), name='order-api'),
    path('payment/<int:order_id>/<int:payment_id>/', views.payment, name='payment'),
    path('orders/<int:order_id>/', cancel_order, name='cancel-order'),
]
