from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('registration',RegisterUser.as_view()),
    path('login/', views.LoginUser.as_view(), name='login'),
    path('logout',LogoutUser.as_view()),
    path('putdelete',UserView.as_view()),
    
    # path('verify/', verify_email, name='verify_email'),
    # path('registration-success/', registration_success, name='registration_success'),
    # path('verification-success/', verification_success, name='verification_success'),
]
