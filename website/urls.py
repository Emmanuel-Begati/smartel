from django.urls import path
from . import views

urlpatterns = [ 
    path('', views.index, name='index'),
    path('home/', views.index, name='index'),
    path('base/', views.base, name='base'),
    path('career/', views.career, name='career'),
    # path('about/', views.about, name='about'),
    # path('services/', views.services, name='services'),
    # path('contact/', views.contact, name='contact'),
]