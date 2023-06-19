from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import FoodInfoSerializer
from django.shortcuts import render
from .models import FoodInfo
from django.http import JsonResponse
import json
from django.utils.safestring import mark_safe
from django.views import View

# this view does not work well with javascript for retrieving data (newfood.html)
# class FoodAPIView(APIView):
#     def get(self, request, template_name=None):
#         foods = FoodInfo.objects.all()
#         serializer = FoodInfoSerializer(foods, many=True)

#         return render(request, 'food/food.html', {'data': serializer.data})


# this view work well it retrive data from database (food.html)
class FoodAPIView(APIView):
    def get(self, request, template_name='food/food.html'):
        foods = FoodInfo.objects.all()
        serializer = FoodInfoSerializer(foods, many=True)
        data = {'foods': serializer.data}
        return render(request, template_name, data)

class FoodDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            food = FoodInfo.objects.get(pk=pk)
            serializer = FoodInfoSerializer(food)
            return Response(serializer.data)
        except FoodInfo.DoesNotExist:
            return Response({'error': 'Food item not found'}, status=404)






