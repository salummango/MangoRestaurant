from rest_framework import serializers
from .models import FoodInfo

class FoodInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodInfo
        fields = '__all__'
