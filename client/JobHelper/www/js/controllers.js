angular.module('myApp.controllers', ['ngCordova'])

//共享变量
.factory('ServerIp',function(){
	return{
		value:"http://172.24.9.40:8080/cqu"
	}
})
.factory('isLogin',function(){
	return{
		value:false
	}
})
.factory('LoginUser',function(){
	return{
		username:"",
		password:""
	}
})

//选择工作界面控制器
.controller('SelectJobCtrl',function($scope,$http){
	//技术子分类点击事件,共10个
	$scope.JiShusubMenuShow = [false,false,false,false,false,false,false,false,false,false];
	$scope.JiShuSubMenuClick = function(number){
		$scope.JiShusubMenuShow[number] = !$scope.JiShusubMenuShow[number];
	};
	
	//产品子分类点击事件,共3个
	
	//设计子分类点击事件,共4个
	
	//运营子分类点击事件,共4个
	
	//市场与销售子分类点击事件,共7个
	
	//职能子分类点击事件,共5个
	
	//金融子分类点击事件,共4个
})

//注册界面控制器
.controller('RegisterCtrl', function ($scope,$http,$ionicPopup,$ionicPlatform,$cordovaToast,$cordovaSms,ServerIp) {
	$scope.user = {};
	$scope.validate = {};
	//用户名验证
	$scope.msg1 = "";
	$scope.msgShow1 = false;
	$scope.usernameValidate = function(val){
		console.log("seruname:"+val);
		$http({
			method:'POST',
			url:ServerIp.value+'/user/validateUsername.json',
			data:"username="+$scope.user.username,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'
			}
		}).success(function (data){
			//访问成功
			if(!data.success){
				$scope.msg1 = data.msg;
				$scope.msgShow1 = true;
			} else{
				$scope.msgShow1 = false;
			}
		}).error(function (data){
			//访问失败
			$scope.msgShow1 = true;
			$scope.msg1 = "与服务器连接失败,请检查网络";
		});
	};
	//手机号验证
	$scope.msg2 = "";
	$scope.msgShow2 = false;
	$scope.phonenumValidate = function(val){
		$scope.msgShow2 = false;
		console.log("val:"+val);
		$http({
			method:'POST',
			url:ServerIp.value+'/user/validatePhone.json',
			data:"phonenum="+$scope.user.phonenum,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'
			}
		}).success(function (data){
			//访问成功
			$scope.msgShow2 = true;
			if(!data.success){
				$scope.msg2 = data.msg;
				$scope.msgShow2 = true;
			} else{
				$scope.msgShow2 = false;
			}
		}).error(function (data){
			//访问失败
			$scope.msgShow2 = true;
			$scope.msg2 = "与服务器连接失败,请检查网络";
		});
	};
	
	//发送手机验证码
	$scope.sendSMSId = function(){
		console.log("AAAAAAA");
		$ionicPlatform.ready(function(){
			$cordovaSms.send('18883869185', '验证码635638',{
				replaceLineBreaks: false, // true to replace \n by a new line, false by default
				android: {
					//intent: 'INTENT'  // send SMS with the native android SMS messaging
					//intent: '' // send SMS without open any other app
				}
			})
			  .then(function() {
				// Success! SMS was sent
			}, function(error) {
				// An error occurred
			});
		});
	};
	//第一次输入密码验证
	$scope.msg3 = "";
	$scope.msgShow3 = false;
	$scope.passwordValidate = function(val){
		console.log("password:"+val);
		if(val=="" || val==undefined){
			$scope.msg3 = "请输入至少6位的密码";
			$scope.msgShow3 = true;
			return;
		}
		
		if(val.length<6){
			$scope.msg3 = "请输入至少6位的密码";
			$scope.msgShow3 = true;
		}
		else{
			$scope.msgShow3 = false;
		}
	};

	//第二次输入密码验证
	$scope.msg4 = "";
	$scope.msgShow4 = false;
	$scope.pwdrepeatValidate = function(val){
		console.log("password2:"+val);
		if(val != $scope.user.password){
			$scope.msg4 = "两次输入的密码不一致";
			$scope.msgShow4 = true;
		}
		else{
			$scope.msgShow4 = false;
		}
	};

	//点击注册按钮
	$scope.register = function(){
		
		
		$http({
			method: 'POST',
			url: ServerIp.value+'/user/addUser.json',
			data: $scope.user,
			//data:"username="+$scope.user.username+"&phonenum="+$scope.user.phonenum+"&password="+$scope.user.password,
			headers: {
				'Content-Type': 'application/json;charset=utf8'
				//'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).success(function (data) {
			if (!data.success) {
				$ionicPopup.alert({
					title:'注册失败',
					template:data.msg,
					okText:'关闭',
					okType:'button-assertive'
				});
			} else {
				//用Toast提示成功
				$ionicPlatform.ready(function(){
					$cordovaToast.showShortBottom('注册成功').then(function(success){
						window.location.href="#/tab/login";
					},function(error){
						//error
						//window.location.href="#/tab/login";
					});
				});
			}
		}).error(function (data){
			$scope.errorMsg = "请检查网络(若网络正常则为服务器故障)";
		});
	};
})

.controller('LoginCtrl',function ($scope,$http,$ionicPopup,$ionicPlatform,$cordovaToast,isLogin,LoginUser,ServerIp){
	//登录的用户信息
	$scope.loginuser={};
	//登录
	$scope.login = function () {
		console.log("login()");
		$http({
			method:'POST',
			url:ServerIp.value+'/user/loginUser.json',
			data:"phonenum="+$scope.loginuser.phonenum+"&password="+$scope.loginuser.password,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'
				//'Content-Type': 'application/json;charset=utf8'
			}
		}).success(function (data){
			//访问成功
			if(!data.success){
				isLogin.value = data.success;
				$ionicPopup.alert({
					title:'登录失败',
					template:data.msg,
					okText:'关闭',
					okType:'button-assertive'
				});
			} else{
				isLogin.value = data.success;
				LoginUser.username = data.msg;
				//用Toast提示成功
				$ionicPlatform.ready(function(){
					$cordovaToast.showShortBottom('登录成功').then(function(success){
						window.location.href="#/tab/personinfo";
					},function(error){
						//error
						//window.location.href="#/tab/login";
					});
				});
			}
		}).error(function (data){
			//访问失败
			isLogin.value = false;
			$ionicPopup.alert({
				title:'登录失败',
				template:'请检查网络(若网络正常则为服务器故障)',
				okText:'关闭',
				okType:'button-assertive'
			});
		});
	};
	
})

//用户个人信息控制器
.controller('UserCtrl', function ($scope,isLogin,LoginUser){
	$scope.showUser = isLogin;
	$scope.user = LoginUser;
})
