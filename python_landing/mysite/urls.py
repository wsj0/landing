"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from login import views

urlpatterns = [
    #path('admin/', admin.site.urls),    
    path(r'index/', views.index),
    path(r'register/', views.register),
    path(r'forget/', views.forget),
    path(r'check/', views.check),
    path(r'register2/', views.register2),
    path(r'forget2/', views.forget2),
    path(r'login/', views.login),
    path(r'left/',views.left),
    path(r'top/',views.top),
    path(r'logout/',views.logout),
    path(r'userindex/',views.userindex),
    path(r'tooriginalInfo/',views.tooriginalInfo),
    path(r'originalInfo/',views.originalInfo),
    path(r'temhumwifiInfo/',views.temhumwifiInfo),
    path(r'chart/',views.chart),
    path(r'versionInfo/',views.versionInfo),
    path(r'updateVersion(?P<sn>\d+)/',views.updateVersion,name='updateVersion'),
    path(r'deviceInfo/',views.deviceInfo),
    path(r'toAddDevice/',views.toAddDevice),
    path(r'addDevice/',views.addDevice),
]
