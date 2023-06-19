from django.db import models

# Create your models here.

class FoodInfo(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=255)
    type = models.CharField(max_length=50)
    image = models.ImageField(upload_to='food_images')
    price = models.IntegerField()

    def __str__(self):
        return f'{self.pk} - {self.name}'
