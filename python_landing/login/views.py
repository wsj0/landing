from django.shortcuts import HttpResponse
from django.shortcuts import render,redirect
from login import models
from django.contrib import messages
from django.contrib import auth
from django.contrib.auth.decorators import login_required
import random,bs4,json
from _datetime import date
import time

# Create your views here.
host = 'http://106.ihuyi.com/webservice/sms.php?method=Submit'
account = 'C27187646'
password = '64713042f161ae0555e9617afef40610'

#@login_required(login_url='index/')  #如果没登陆 则跳到登陆页面
def login(request): #   登陆
   if request.method == "POST":
       
       username = request.POST.get("username",None)
       password = request.POST.get("password",None)
       remember = request.POST.get("remember",None)
       try:
           user = models.UserInfo.objects.get(username=username) #通过models查找数据库
           if user.password == password:  #用户名密码一致
               request.session['user'] = username  #先写入session
               response = redirect('/userindex/')
               if remember =="1":
                   response.set_cookie('name',username,max_age=7*24*3600)
               return response
           else:
               messages.success(request,"密码不正确")  #逻辑处理1
       except:
            messages.success(request,"用户名不正确")
   #user_list = models.UserInfo.objects.all()
       return render(request, "login.html",{"data":username})#,{"data":user_list}11
   else:
       return render(request, "login.html")

def register(request):#注册 两步验证 存入session   
    if request.method == "POST": #如果请求方法为post get方法不通过
        username = request.POST.get("username",None)  #前端传参就写入 没传参就是none
        password = request.POST.get("password",None)
        try:
            user = models.UserInfo.objects.get(username=username) #后台查找数据库 返回对象
        #if  user:
            messages.success(request,"用户名已被注册") #如果try里面找到了就显示被注册 和java不一样
        #else:
        except:
            request.session['user'] = username  #写入session  
            #return redirect('/register2/')
            return render(request, "register2.html")
        return render(request, "register.html")
    else:   #点击登陆按钮 非post进入
        return render(request, "register.html")
    

def forget(request): #忘记密码 两步验证 存入session  
    if request.method == "POST":
        username = request.POST.get("username",None)
        try:
            user = models.UserInfo.objects.get(username=username)
            request.session['user'] = username
        except:
            messages.success(request,"手机号未注册")
            return render(request, "forget.html")
        return render(request, "forget2.html")
    else:   #点击登陆按钮 非post进入
        return render(request, "forget.html")

def check(request): 
    return render(request, "check.html")


def register2(request): #注册验证密码     
    if request.method == "POST":
        username = request.session['user']
        #username = request.POST.get("user", None)
        password = request.POST.get("password",None)
        models.UserInfo.objects.create(username=username,password=password) #如果数据库没有就创建对象
    return redirect('/login/')

def forget2(request): #忘记密码验证密码     
    if request.method == "POST":
        username = request.session['user']
        password = request.POST.get("password",None)
        obj = models.UserInfo.objects.get(username=username)
        obj.password = password
        obj.save()
    return redirect('/login/')

def create_verify_code(request):#
    localtime = time.asctime( time.localtime(time.time()) )  #获取当前时间
    msg = "验证码发送频繁"
    try:
        time = request.session['time']  #session中有无值
    except:
        request.session['time'] = localtime  #没值 添加现在的时间
    else:
        if(time - localtime > 10):  #有值 比较
            verify_code = ''
            for i in range(4):
                verify_code += str(random.randint(0,9))
            return verify_code
        else:
            return msg
    #随机产生一个4位数验证码


def index(request):#
    if 'name' in request.COOKIES: #检测是否有存入cookie的
           username = request.COOKIES['name'] #直接用用户名
    else:
        username = ''
    return render(request, "login.html",{"data":username})

def left(request):#  左边栏
    username = request.session['user']
    return render(request,"left.html",{"data":username})

def top(request):#   上边栏
    username = request.session['user']
    return render(request,"top.html",{"data":username})

def userindex(request):#   主页面 如果没登陆 复制url会检测session然后跳转登录页
    try:
        username = request.session['user']
    except:
        return redirect('/index/')
    else:
        return render(request,"userindex.html",{"data":username})

def logout(request):#  注销 
    del request.session["user"]
    return redirect('/index/')

def tooriginalInfo(request):# 原始数据显示页
    info = models.HumitureInfo.objects.all()
    return render(request,"originalInfo.html",{"info":info})

def originalInfo(request):#  点击查询以后根据条件显示原始数据
    try:  #不加try的话 如果不输入日期就查询 会报错给用户 说日期格式不对 所以格式对就查 格式不对(没输入)就查全部   格式对没数据就正常  
        starttime = request.POST.get("starttime",None)
        endtime = request.POST.get("endtime",None)
        info = models.HumitureInfo.objects.filter(date__range=(starttime,endtime))
    except:
        info = models.HumitureInfo.objects.all()
        return render(request,"originalInfo.html",{"info":info})
    else:
        return render(request,"originalInfo.html",{"info":info})

def temhumwifiInfo(request):
    num = models.wifi_elec.objects.all()
    return render(request, 'temhumwifiInfo.html', {"count":num})

def chart(request):
    data1=models.message.objects.get(id='1')#从数据库取值，id为1的数据或者写为get(value=“温度”)来查，查出value id data赋值给data1
    data2=models.message.objects.get(id='2')
    data3=models.message.objects.get(id='3')
    data4=models.message.objects.get(id='4')
    info1=models.info.objects.get(id='1')
    info2=models.info.objects.get(id='2')
    info3=models.info.objects.get(id='3')
    info4=models.info.objects.get(id='4')
    info5=models.info.objects.get(id='5')
#m=[data1,data2,data3....]写为数组格式，list:m,前端list[0].data这样写得不到data值html无法识别数组
    return render(request,'chart.html',{"list1":data1,"list2":data2,"list3":data3,"list4":data4,"info1":info1,"info2":info2,"info3":info3,"info4":info4,"info5":info5})#返回值为{：}{：}{：}{}这样写则返回报错为dic格式
#render函数返回值list得到每个字段的值后赋值给前端取值

def versionInfo(request):
    info = models.version.objects.all()
    return render(request, 'versionInfo.html', {"info":info})

def updateVersion(request,sn):
    obj = models.version.objects.get(sn=sn) #根据id查找设备信息
    if(obj.now_version==obj.new_version):
        messages.success(request,"已是船新版本")
    elif(obj.need_update==201): #201代表等待更新 0代表不用更新
        messages.success(request,"正在等待更新")
    else:
        obj.need_update = 201  #加入更新队列 更新完了改成0
        obj.save()
        messages.success(request,"正在更新")
    info = models.version.objects.all()
    return render(request, 'versionInfo.html', {"info":info})

def deviceInfo(request):
    info = models.deviceInfo.objects.all()
    return render(request, 'deviceInfo.html', {"info":info})

def toAddDevice(request):
    return render(request, 'addDevice.html')

def addDevice(request):
    sn = request.POST.get("sn",None)
    models.deviceInfo.objects.create(sn=sn)
    info = models.deviceInfo.objects.all()#1111
    return render(request, 'deviceInfo.html', {"info":info})
