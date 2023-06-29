from django.shortcuts import redirect,render
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from .models import User
from rest_framework.exceptions import AuthenticationFailed
import jwt,datetime
from django.http import JsonResponse
from rest_framework import status
from django.contrib.auth.hashers import make_password
from users.models import User
from rest_framework.parsers import MultiPartParser
from django.urls import reverse
from django.contrib.auth import authenticate, login

# import secrets
# from django.core.mail import send_mail
# def generate_verification_token():
#     return secrets.token_urlsafe(32)

# def send_verification_email(user_email, verification_token):
#     verification_link = f'http://localhost:8000/verify/?token={verification_token}'
#     subject = 'Email Verification'
#     message = f'Please click on the following link to verify your email address: {verification_link}'
#     sender = 'salummango16@gmail.com'
#     recipient = user_email

#     send_mail(subject, message, sender, [recipient])

# def verify_email(request):
#     token = request.GET.get('token')
#     # Check if the token is valid and associated with a user in your database
#     # Perform necessary validation and activate the user's account
#     # If token is invalid or expired, display an error message or redirect to an appropriate page
#     return redirect('verification-success')

# def registration_success(request):
#     return render(request, 'registration_success.html')

# def verification_success(request):
#     return render(request, 'verification_success.html')

# class RegisterUser(APIView):
#     parser_classes = [MultiPartParser]

#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
        
#         # Generate verification token
#         verification_token = generate_verification_token()

#         # Send verification email
#         send_verification_email(user.email, verification_token)
        
#         # Redirect to the registration success page
#         return redirect('registration-success')



# Create your views here.
# this first view does not support files
# class RegisterUser(APIView):
#     def post(self,request):
#         serializer=UserSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)

# ****** does not redirect user to login page
# class RegisterUser(APIView):
#     parser_classes = [MultiPartParser]

#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)

class RegisterUser(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        # Redirect to the login page
        return redirect(reverse('login'))


# ******* this login view does not support get method for receiving data from template
# class LoginUser(APIView):
#     def post(self,request):
#         email=request.data['email']
#         password=request.data['password']
        
#         # finding user by using email
#         user=User.objects.filter(email=email).first()
        
#         if user is None:
#             raise AuthenticationFailed('user not found')
        
#         # for hashed password
#         if not user.check_password(password):
#             raise AuthenticationFailed('incorrect password')
        
#         # for non hashed password
#         # if user.password != password:
#         #     raise AuthenticationFailed('incorrect password')

#         # creating token by using jwt
#         payload={
#             'id':user.id,
#             'exp':datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
#             'iat':datetime.datetime.utcnow()
#         }
        
#         token=jwt.encode(payload,'secrete',algorithm='HS256')

#         # RETURNING TOKEN VIA COOKIES
#         response = JsonResponse({'jwt': token})
#         response.set_cookie('jwt', token, httponly=True)#The httponly=True argument ensures that the cookie is only accessible via HTTP and cannot be accessed by JavaScript

#         return response

class LoginUser(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        # Finding user by using email
        user = authenticate(request, email=email, password=password)
        
        if user is None:
            raise AuthenticationFailed('User not found')
        
        # Creating token using JWT
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=180),
            'iat': datetime.datetime.utcnow()
        }
        
        token = jwt.encode(payload, 'secrete', algorithm='HS256')

        # Returning token via JSON response
        response = JsonResponse({'jwt': token})
        response.set_cookie('jwt', token, httponly=True)

        return response

    def get(self, request):
        # Handle GET requests for login page
        # Return the HTML template for the login page
        return render(request, 'user/login.html')



    
    
# class LogoutUser(APIView):
#     def post(self,request):
#         response= Response()
#         response.delete_cookie('jwt')
#         response.data={
#             'message':'succsessfully logout'
#         }
#         return response

class LogoutUser(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'Successfully logged out'
        }
        return redirect('/')
    


    
# class UserView(APIView):
#     def get(self,request):
#         token=request.COOKIES.get('jwt')
        
#         if not token:
#             raise AuthenticationFailed('unauthenticated')
        
#         try:
#          payload=jwt.decode(token,'secrete',algorithms=['HS256'])
        
#         except jwt.ExpiredSignatureError:
#             raise AuthenticationFailed('unauthenticated')
        
#         user=User.objects.filter(id=payload['id']).first()
        
#         serializer=UserSerializer(user)
        
#         return Response(serializer.data)



class UserView(APIView):
    def get_user_from_token(self, request):
        token = request.COOKIES.get('jwt')
        
        if not token:
            raise AuthenticationFailed('unauthenticated')
        
        try:
            payload = jwt.decode(token, 'secrete', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('unauthenticated')
        
        user = User.objects.filter(id=payload['id']).first()
        
        if not user:
            raise AuthenticationFailed('user not found')
        
        return user

    # **** this return only login user
    # def get(self, request):
    #     user = self.get_user_from_token(request)
    #     serializer = UserSerializer(user)
    #     return Response(serializer.data)
    
    # **** this return all user
    # def get(self, request):
    #     users = User.objects.all()
    #     serializer = UserSerializer(users, many=True)
    #     return Response(serializer.data)
    
    # this will return login user
    def get(self, request):
        user = self.get_user_from_token(request)
        serializer = UserSerializer(user)
        return Response(serializer.data)



    def delete(self, request):
        user = self.get_user_from_token(request)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    # **** this does not hash password after update
    # def put(self, request):
    #     user = self.get_user_from_token(request)
    #     serializer = UserSerializer(user, data=request.data)
        
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
        
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    # ***** this does not copy all data before hashing
    # def put(self, request):
    #     user = self.get_user_from_token(request)
    #     password = request.data.get('password')

    #     # Hash the password if it is provided in the request
    #     if password:
    #         request.data['password'] = make_password(password)

    #     serializer = UserSerializer(user, data=request.data)

    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
        
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request):
        user = self.get_user_from_token(request)
        password = request.data.get('password')

        # Create a mutable copy of the request data
        mutable_data = request.data.copy()

        # Hash the password if it is provided in the request
        if password:
            mutable_data['password'] = make_password(password)

        serializer = UserSerializer(user, data=mutable_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.errors)  # Print the error details for troubleshooting
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



def userdashboard(request):
    return render(request=request,template_name="user/user_dashboard.html")