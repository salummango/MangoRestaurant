from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Order, Payment
from django.http import HttpResponse

class OrderAPIView(APIView):
    def post(self, request):
        orderid = request.data.get('orderid')
        controlno = request.data.get('controlno')
        userid = request.data.get('userid')

        # Save the order details to the Order model
        order = Order.objects.create(orderid=orderid, controlno=controlno, userid=userid)

        # Create a payment record 
        payment = Payment.objects.create(payid='PAYID', paychannel='PayChannel', controlno=controlno)

        return Response({'order_id': order.id, 'payment_id': payment.id, 'userid': userid})

def payment(request, order_id, payment_id):
    order = Order.objects.get(id=order_id)
    payment = Payment.objects.get(id=payment_id)
    return render(request, 'orderPayment/payment.html', {'order': order, 'payment': payment, 'userid': request.user.id})

def cancel_order(request, order_id):
    order = Order.objects.filter(id=order_id, userid=request.user.id).first()

    if order:
        order.delete()
        return HttpResponse('Order canceled successfully.')
    else:
        return HttpResponse('Order not found or you are not authorized to cancel the order.')
