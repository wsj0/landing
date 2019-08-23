//全局js
// var $posi=$(".posi");
// var $posi_w=$posi.width()/2;
// var $posi_h=$posi.height()/2;
// $posi.css({"margin-left": - $posi_w +"px","margin-top":- $posi_h + "px"});

//登陆框切换
$(".hdbox h2").click(function(){
	$(this).addClass("cur").siblings().removeClass("cur");
	$(".cha_box").children(".cha_list").eq($(this).index()).addClass("cur").siblings().removeClass("cur");
	// $(".cha_box .cha_list").eq($(this).index()).addClass("cur").siblings().removeClass("cur");
})
//弹出注册协议
$('.reginfo').click(function (){
	layer.open({
		type: 1,
		title:['注册服务条款','font-weight:bold'],
		area: ['740px', '550px'], //宽高
		content: '<textarea style="width:718px;height:484px;line-height:23px;padding:10px;resize:none;"  readonly="readonly">'+$('#res_info').html()+'</textarea>',
	});
});
//Ajax获取验证码
function getCode(id,tip,url){
	var obj = $("#"+id);
	var objtip = $("#"+tip);
	obj.click( function(){
		var thisval = objtip.val();
		$.post(url, { param: thisval },
		function(data){
			if(data){
				layer.tips(data, objtip, {
				  tips: [3, '#FF0000'],
				  time: 5000
				});
				objtip.select();
			}else{
				layer.tips('验证码已经发送至您的邮箱或手机，请您注意查收！', obj, {
				  tips: [3, '#039803'],
				  time: 6000
				});
				countdown = setInterval(CountDown, 1000);
			}
		});
		var count = 120;
		function CountDown() {
			obj.attr("disabled", true);
			obj.val( count + "秒后可重新发送");
			if (count == 0) {
				obj.val("重新获取验证码").removeAttr("disabled");
				clearInterval(countdown);
			}
			count--;
		}
	});
}
//邮箱注册提交检测是否为空
$("#emailform").submit( function(){
	var useremail = $("#useremail").val();
	var emailpass = $("#emailpass").val();
	var emailcode = $("#emailcode").val();
	var emailreb = $('#emailreb').is(':checked');
	if( !useremail ){
		layer.tips("邮箱不能为空！", "#useremail", {
		  tips: [3, '#FF0000'],
		  time: 3000,
		  tipsMore: true
		});
	}
	if( !emailpass ){
		layer.tips("密码不能为空！", "#emailpass", {
		  tips: [3, '#FF0000'],
		  time: 4500,
		  tipsMore: true
		});
	}
/*	if( !emailcode ){
		layer.tips("验证码不能为空！", "#emailcode", {
		  tips: [3, '#FF0000'],
		  time: 6000,
		  tipsMore: true
		});
		return false;
	}*/
	/*if( !emailreb ){
		layer.tips("请阅读并同意注册条款！", "#emailreb", {
		  tips: [3, '#FF0000'],
		  time: 2000,
		});
		return false;
	}*/
	else{
		$(this).submit();
	}
	return false;
});
//手机注册提交检测是否为空
$("#phoneform").submit( function(){
	var userphone = $("#userphone").val();
	var phonepass = $("#phonepass").val();
	var phonecode = $("#phonecode").val();
	var phonereb = $('#phonereb').is(':checked');
	/*if( !userphone ){
		layer.tips("手机号不能为空！", "#userphone", {
		  tips: [3, '#FF0000'],
		  time: 3000,
		  tipsMore: true
		});
	}*/
	if( !phonepass ){
		layer.tips("密码不能为空！", "#phonepass", {
		  tips: [3, '#FF0000'],
		  time: 4500,
		  tipsMore: true
		});
	}
	/*if( !phonecode ){
		layer.tips("验证码不能为空！", "#phonecode", {
		  tips: [3, '#FF0000'],
		  time: 6000,
		  tipsMore: true
		});
		return false;
	}
	if( !phonereb ){
		layer.tips("请阅读并同意注册条款！", "#phonereb", {
		  tips: [3, '#FF0000'],
		  time: 2000,
		});
		return false;
	}*/else{
		$(this).submit();
	}
	return false;
});

//Ajax检测输入内容
function inputAjax(id,url){
	var obj = $("#"+id);
	obj.blur( function(){
		var thisval = obj.val();
		if( !thisval ){
			return false;
		}
		$.post(url, { param: thisval },
		function(data){
			alert(data);
			if(data){
				layer.tips(data, obj, {
				  tips: [3, '#FF0000'],
				  time: 5000
				});
				obj.select();
			}
		});
	});
}
//Ajax检测输入内容
function passCheck(id,tip){
	$("#"+id).keyup(function () { 
		var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g"); 
		var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g"); 
		var enoughRegex = new RegExp("(?=.{6,}).*", "g"); 
	
		if (false == enoughRegex.test($(this).val())) { 
			$("#"+tip+" li:eq(0)").removeClass('red');
			$("#"+tip+" li:eq(1)").removeClass('orange'); 
			$("#"+tip+" li:eq(2)").removeClass('green'); 
			 //密码小于六位的时候，密码强度图片都为灰色 
		} 
		else if (strongRegex.test($(this).val())) { 
			$("#"+tip+" li:eq(0)").addClass('red');
			$("#"+tip+" li:eq(1)").addClass('orange'); 
			$("#"+tip+" li:eq(2)").addClass('green'); 
			 //密码为八位及以上并且字母数字特殊字符三项都包括,强度最强 
		} 
		else if (mediumRegex.test($(this).val())) { 
			$("#"+tip+" li:eq(0)").addClass('red');
			$("#"+tip+" li:eq(1)").addClass('orange'); 
			$("#"+tip+" li:eq(2)").removeClass('green'); 
			 //密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等 
		} 
		else { 
			$("#"+tip+" li:eq(0)").addClass('red');
			$("#"+tip+" li:eq(1)").removeClass('orange'); 
			$("#"+tip+" li:eq(2)").removeClass('green'); 
			 //如果密码为6为及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的 
		} 
		return true; 
	}); 
}