from django.db import models

class Order(models.Model):
    orderid = models.CharField(max_length=100)
    controlno = models.IntegerField()
    userid = models.CharField(max_length=100)

class Payment(models.Model):
    payid = models.CharField(max_length=100)
    paychannel = models.CharField(max_length=100)
    controlno = models.IntegerField()
