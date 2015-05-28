angular.module('starter.controllers', ['ngCordova','baiduMap'])

//全局变量
.factory('ServerIp', function () {
		return {
			value:"http://172.24.8.178:8080/cqu" //"http://172.24.8.178:8080/cqu"
		}
	})
//用户
.factory('globalUser', function () {
	return {
		username: "",
		phonenum: "",
		password: ""
	}
})
//工作
.factory('jobDetail',function(){
	return {
		object:{
			id:0,
			jobCategory:"",jobName:"null",jobId:"",jobCity:"",jobSalary:"",jobExperience:"",
			jobEduction:"",jobFormality:"",companyName:"",companyId:"",companyLat:0,companyLng:0,
			companyPage:"",jobDescribe:"",companyDescribe:"",companyImgSrc:"",companyDetailName:"",jobDate:""
		}
	}
})
.factory('jobSelect', function () {
	return {
		city: "",
		subCate: "",
	}
})
.factory('jobSelectHelper', function () {
	return {
		list: ['null', 'null'],
		number: 0,
		cate: ""
	}
})
.factory('jobList',function(){
	return{
		array:[{},{},{}]
	}
})
.controller('SearchJobCtrl', function ($scope,$http,$ionicPlatform,$cordovaToast,ServerIp,jobSelect,jobList,globalUser) {
//	$scope.user = globalUser;
//	console.log("Loginuser.username:"+$scope.user.username);
	
	$scope.jobselect = jobSelect;
	$scope.searchJob = function(){
		$http({
			method:'POST',
			url:ServerIp.value+'/job/searchJob.json',
			data:"cityname="+$scope.jobselect.city+"&jobcate="+$scope.jobselect.subCate,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'
			}
		}).success(function(data){
			jobList.array = data;
			window.location.href="#/home/listjob";
		}).error(function(data){
			$ionicPlatform.ready(function () {
				$cordovaToast.showShortBottom('连接服务器失败');
			});
		});
	};
})

.controller('SelectCityCtrl', function ($scope,$ionicHistory,jobSelect) {
	$scope.hotCity = [
		'全国', '北京', '上海', '广州', '深圳', '成都', '重庆', '杭州', '武汉', '南京'
	];
	$scope.hotCityRow1 = ['全国', '北京', '上海', '广州', '深圳'];
	$scope.hotCityRow2 = ['成都', '重庆', '杭州', '武汉', '南京'];

	$scope.ABCDEF = [
		'鞍山', '蚌埠', '保定', '北京', '长春', '成都', '重庆',
		'长沙', '常熟', '朝阳', '常州', '东莞', '大连', '德州',
		'佛山', '福州'
	];
	$scope.GHIJ = [
		'桂林', '贵阳', '广州', '赣州', '哈尔滨', '合肥', '呼和浩特',
		'海口', '杭州', '惠州', '湖州', '金华', '江门', '济南',
		'济宁', '嘉兴', '江阴', '锦州'
	];
	$scope.KLMN = [
		'昆明', '昆山', '聊城', '廊坊', '洛阳', '临沂', '龙岩',
		'连云港', '兰州', '绵阳', '宁波', '南昌', '南京', '南宁',
		'南通'
	];
	$scope.OPQR = [
		'青岛', '秦皇岛', '泉州', '日照'
	];
	$scope.STUV = [
		'上海', '石家庄', '汕头', '绍兴', '沈阳', '三亚', '深圳',
		'苏州', '天津', '唐山', '太原', '台州'
	];
	$scope.WXYZ = [
		'潍坊', '武汉', '芜湖', '威海', '乌鲁木齐', '无锡', '温州',
		'西安', '香港', '厦门', '西宁', '邢台', '徐州', '银川',
		'盐城', '运城', '烟台', '珠海', '张家港', '肇庆', '中山',
		'郑州'
	];
	$scope.citiesShown = [
		false, false, false, false, false, false
	];
	$scope.toggleCityShow = function (number) {
		$scope.citiesShown[number] = !$scope.citiesShown[number];
	};
	$scope.isCitiesShown = function (number) {
		return $scope.citiesShown[number] == true;
	};
	$scope.chooseCity = function (city) {
		jobSelect.city = city;
		console.log("SelectCity:" + jobSelect.city);
//		$ionicHistory.clearCache();
//		$ionicHistory.clearHistory();
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		window.location.href = "#/home/searchjob";
	};
})

.controller('SelectJob1Ctrl', function ($scope, jobSelect, jobSelectHelper) {
	$scope.jishu = [
		'后端开发', '移动开发', '前端开发', '测试', '运维', 'DBA', '高端职位', '项目管理',
		'硬件开发', '企业软件'
	];
	$scope.chanpin = [
		'产品经理', '产品设计师', '高端职位'
	];
	$scope.sheji = [
		'视觉设计', '用户研究', '高端职位', '交互设计'
	];
	$scope.yunying = [
		'运营', '编辑', '客服', '高端职位'
	];
	$scope.shichangyuxiaoshou = [
		'市场/营销', '公关', '销售', '高端职位', '供应链', '采购', '投资'
	];
	$scope.zhineng = [
		'人力资源', '行政', '财务', '高端职位', '法务'
	];
	$scope.jinrong = [
		'投融资', '风控', '审计税务', '高端职位'
	];
	//显示类别
	$scope.cateShow = [
		false, false, false, false, false, false, false
	];
	$scope.toggleCateShow = function (number) {
		$scope.cateShow[number] = !$scope.cateShow[number];
	};
	$scope.isCateShown = function (number) {
		return $scope.cateShow[number] == true;
	};
	$scope.chooseCate = function (number, cate) {
		console.log("num:" + number);
		console.log("cate:" + cate);
		jobSelectHelper.cate = cate;
		jobSelectHelper.number = number;
		window.location.href = "#/home/selectjob2";
	};
})

.controller('SelectJob2Ctrl', function ($scope, $ionicHistory, jobSelect, jobSelectHelper) {
	$scope.jishu_houduankaifa = [
		'Java', 'Python', 'PHP', '.NET', 'C/C++', 'VB', 'Delphi', 'Perl', 'Ruby',
		'Hadoop', 'Node.js', '数据挖掘', '自然语言处理', '搜索算法', '精准推荐', '全栈工程师',
		'Go', 'ASP', 'Shell', '后端开发其他'
	];
	$scope.jishu_yidongkaifa = [
		'HTML5', 'Android', 'iOS', 'WP', '移动开发其他'
	];
	$scope.jishu_qianduankaifa = [
		'web前端', 'Flash', 'html5', 'JavaScript', 'U3D', 'COCOS2D-X', '前端开发其他'
	];
	$scope.jishu_ceshi = [
		'测试工程师', '自动化测试', '功能测试', '性能测试', '测试开发', '游戏测试', '白盒测试',
		'灰盒测试', '黑盒测试', '手机测试', '硬件测试', '测试经理', '测试其他'
	];
	$scope.jishu_yunwei = [
		'运维工程师', '运维开发工程师', '网络工程师', '系统工程师', 'IT支持', 'IDC', 'CDN', 'F5',
		'系统管理员', '病毒分析', 'WEB安全', '网络安全', '系统安全', '运维经理', '运维其他'
	];
	$scope.jishu_DBA = [
		'MySQL', 'SQLServer', 'Oracle', 'DB2', 'MongoDB', 'ETL', 'Hive', '数据仓库', 'DBA其他'
	];
	$scope.jishu_gaoduanzhiwei = [
		'技术经理', '技术总监', '架构师', 'CTO', '云魏总监', '技术合伙人', '项目总监', '测试总监', '安全专家', '高端技术职位其他'
	];
	$scope.jishu_xiangmuguanli = [
		'项目经理', '项目助理'
	];
	$scope.jishu_yingjiankaifa = [
		'硬件', '嵌入式', '自动化', '单片机', '电路设计', '驱动开发', '系统集成', 'FPGA开发', 'DSP开发',
		'ARM开发', 'PCB工艺', '模具设计', '热传导', '材料工程师', '精益工程师', '射频工程师', '硬件开发其他'
	];
	$scope.jishu_qiyeruanjian = [
		'实施工程师', '售前工程师', '售后工程师', 'BI工程师', '企业软件其他'
	];
	$scope.chanpin_chanpinjingli = [
		'产品经理', '网页产品经理', '移动产品经理', '产品助理', '数据产品经理', '电商产品经理', '游戏策划', '产品实习生'
	];
	$scope.chanpin_chanpinshejishi = [
		'网页产品设计师', '无线产品设计师'
	];
	$scope.chanpin_gaoduanzhiwei = [
		'产品部经理', '产品总监', '游戏制作人'
	];
	$scope.sheji_shijuesheji = [
		'网页设计师', 'Flash设计师', 'APP设计师', 'UI设计师', '平面设计师', '美术设计师（2D/3D）', '广告设计师', '多媒体设计师',
		'原画师', '游戏特效', '游戏界面设计师', '视觉设计师', '游戏场景', '游戏角色', '游戏动作'
	];
	$scope.sheji_yonghuyanjiu = [
		'数据分析师', '用户研究员', '游戏数值策划'
	];
	$scope.sheji_gaoduanzhiwei = [
		'设计经理/主管', '设计总监', '视觉设计经理/主管', '视觉设计总监', '交互设计总理/主管', '交互设计总监', '用户研究经理/主管', '用户研究总监'
	];
	$scope.sheji_jiaohusheji = [
		'网页交互设计师', '交互设计师', '无线交互设计师', '硬件交互设计师'
	];
	$scope.yunying_yunying = [
		'内容运营', '产品运营', '数据运营', '用户运营', '活动运营', '商家运营', '品类运营', '游戏运营', '网络推广', '运营专员', '网店运营', '新媒体运营', '海外运营', '运营经理'
	];
	$scope.yunying_bianji = [
		'副主编', '内容编辑', '文案策划', '记者'
	];
	$scope.yunying_kefu = [
		'售前咨询', '售后客服', '淘宝客服', '客服经理'
	];
	$scope.yunying_gaoduanzhiwei = [
		'主编', '运营总监', 'COO', '客服总监'
	];
	$scope.shichangyuxiaoshou_shichangyingxiao = [
		'市场策划', '市场顾问', '市场营销', '市场推广', 'SEO', 'SEM', '商务渠道', '商业数据分析', '活动策划', '网络营销', '海外市场', '政府关系'
	];
	$scope.shichangyuxiaoshou_gongguan = [
		'媒介经理', '广告协调', '品牌公关'
	];
	$scope.shichangyuxiaoshou_xiaoshou = [
		'销售专员', '销售经理', '客户代表', '大客户代表', 'BD经理', '商务渠道', '渠道销售', '代理商销售', '销售助理', '电话销售', '销售顾问', '商品经理'
	];
	$scope.shichangyuxiaoshou_gaoduanzhiwei = [
		'市场总监', '销售总监', '商务总监', 'CMO', '公关总监', '采购总监', '投资总监'
	];
	$scope.shichangyuxiaoshou_gongyinglian = [
		'物流', '仓储'
	];
	$scope.shichangyuxiaoshou_caigou = [
		'采购专员', '采购经理', '商品经理'
	];
	$scope.shichangyuxiaoshou_touzi = [
		'分析师', '投资顾问', '投资经理'
	];
	$scope.zhineng_renliziyuan = [
		'人事/HR', '培训经理', '薪资福利经理', '绩效考核经理', '人力资源', '招聘', 'HRBP', '员工关系'
	];
	$scope.zhineng_xingzheng = [
		'助理', '前台', '行政', '总助', '文秘'
	];
	$scope.zhineng_caiwu = [
		'会计', '出纳', '财务', '结算', '税务', '审计', '风控'
	];
	$scope.zhineng_gaoduanzhiwei = [
		'行政总监/经理', '财务总监/经理', 'HRD/HRM', 'CFO', 'CEO'
	];
	$scope.zhineng_fawu = [
		'法务', '律师', '专利'
	];
	$scope.jinrong_tourongzi = [
		'投资经理', '分析师', '投资助理', '融资', '并购', '行业研究',
		'投资者关系', '资产管理', '理财顾问', '交易员'
	];
	$scope.jinrong_fengkong = [
		'风控', '资信评估', '合规稽查', '律师'
	];
	$scope.jinrong_shenjishuiwu = [
		'审计', '法务', '会计', '清算'
	];
	$scope.jinrong_gaoduanzhiwei = [
		'投资总监', '融资总监', '并购总监', '风控总监', '副总裁'
	];
	//根据jobSelectHelper的number和cate来决定显示什么
	if (jobSelectHelper.number == 0) {
		if (jobSelectHelper.cate == "后端开发") {
			jobSelectHelper.list = $scope.jishu_houduankaifa;
		} else if (jobSelectHelper.cate == "移动开发") {
			jobSelectHelper.list = $scope.jishu_yidongkaifa;
		} else if (jobSelectHelper.cate == "前端开发") {
			jobSelectHelper.list = $scope.jishu_qianduankaifa;
		} else if (jobSelectHelper.cate == "测试") {
			jobSelectHelper.list = $scope.jishu_ceshi;
		} else if (jobSelectHelper.cate == "运维") {
			jobSelectHelper.list = $scope.jishu_yunwei;
		} else if (jobSelectHelper.cate == "DBA") {
			jobSelectHelper.list = $scope.jishu_DBA;
		} else if (jobSelectHelper.cate == "高端职位") {
			jobSelectHelper.list = $scope.jishu_gaoduanzhiwei;
		} else if (jobSelectHelper.cate == "项目管理") {
			jobSelectHelper.list = $scope.jishu_xiangmuguanli;
		} else if (jobSelectHelper.cate == "硬件开发") {
			jobSelectHelper.list = $scope.jishu_yingjiankaifa;
		} else if (jobSelectHelper.cate == "企业软件") {
			jobSelectHelper.list = $scope.jishu_qiyeruanjian;
		}
	} else if (jobSelectHelper.number == 1) {
		if (jobSelectHelper.cate == "产品经理") {
			jobSelectHelper.list = $scope.chanpin_chanpinjingli;
		} else if (jobSelectHelper.cate == "产品设计师") {
			jobSelectHelper.list = $scope.chanpin_chanpinshejishi;
		} else if (jobSelectHelper.cate == "高端职位") {
			jobSelectHelper.list = $scope.chanpin_gaoduanzhiwei;
		}
	} else if (jobSelectHelper.number == 2) {
		if (jobSelectHelper.cate == "视觉设计") {
			jobSelectHelper.list = $scope.sheji_shijuesheji;
		} else if (jobSelectHelper.cate == "用户研究") {
			jobSelectHelper.list = $scope.sheji_yonghuyanjiu;
		} else if (jobSelectHelper.cate == "高端职位") {
			jobSelectHelper.list = $scope.sheji_gaoduanzhiwei;
		} else if (jobSelectHelper.cate == "交互设计") {
			jobSelectHelper.list = $scope.sheji_jiaohusheji;
		}
	} else if (jobSelectHelper.number == 3) {
		if (jobSelectHelper.cate == "运营") {
			jobSelectHelper.list = $scope.yunying_yunying;
		} else if (jobSelectHelper.cate == "编辑") {
			jobSelectHelper.list = $scope.yunying_bianji;
		} else if (jobSelectHelper.cate == "客服") {
			jobSelectHelper.list = $scope.yunying_kefu;
		} else if (jobSelectHelper.cate == "高端职位") {
			jobSelectHelper.list = $scope.yunying_gaoduanzhiwei;
		}
	} else if (jobSelectHelper.number == 4) {
		if (jobSelectHelper.cate == "市场/营销") {
			jobSelectHelper.list = $scope.shichangyuxiaoshou_shichangyingxiao;
		} else if (jobSelectHelper.cate == "公关") {
			jobSelectHelper.list = $scope.shichangyuxiaoshou_gongguan;
		} else if (jobSelectHelper.cate == "销售") {
			jobSelectHelper.list = $scope.shichangyuxiaoshou_xiaoshou;
		} else if (jobSelectHelper.cate == "高端职位") {
			jobSelectHelper.list = $scope.shichangyuxiaoshou_gaoduanzhiwei;
		} else if (jobSelectHelper.cate == "供应链") {
			jobSelectHelper.list = $scope.shichangyuxiaoshou_gongyinglian;
		} else if (jobSelectHelper.cate == "采购") {
			jobSelectHelper.list = $scope.shichangyuxiaoshou_caigou;
		} else if (jobSelectHelper.cate == "投资") {
			jobSelectHelper.list = $scope.shichangyuxiaoshou_touzi;
		}
	} else if (jobSelectHelper.number == 5) {
		if (jobSelectHelper.cate == "人力资源") {
			jobSelectHelper.list = $scope.zhineng_renliziyuan;
		} else if (jobSelectHelper.cate == "行政") {
			jobSelectHelper.list = $scope.zhineng_xingzheng;
		} else if (jobSelectHelper.cate == "财务") {
			jobSelectHelper.list = $scope.zhineng_caiwu;
		} else if (jobSelectHelper.cate == "高端职位") {
			jobSelectHelper.list = $scope.zhineng_gaoduanzhiwei;
		} else if (jobSelectHelper.cate == "法务") {
			jobSelectHelper.list = $scope.zhineng_fawu;
		}
	} else if (jobSelectHelper.number == 6) {
		if (jobSelectHelper.cate == "投融资") {
			jobSelectHelper.list = $scope.jinrong_tourongzi;
		} else if (jobSelectHelper.cate == "风控") {
			jobSelectHelper.list = $scope.jinrong_fengkong;
		} else if (jobSelectHelper.cate == "财务") {
			jobSelectHelper.list = $scope.jinrong_caiwu;
		} else if (jobSelectHelper.cate == "高端职位") {
			jobSelectHelper.list = $scope.jinrong_gaoduanzhiwei;
		}
	}
	//测试list是否正确
	console.log("list的长度:" + jobSelectHelper.list.length);
	$scope.selectHelper = jobSelectHelper;
	//选择最终类别
	$scope.chooseSubCate = function (subCate) {
		console.log("subCate:" + subCate);
		jobSelect.subCate = subCate;
//		$ionicHistory.clearCache();
//		$ionicHistory.clearHistory();
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		window.location.href = "#/home/searchjob";
	};
})

.controller('ListJobCtrl', function($scope,$http,$ionicPlatform,$cordovaToast,jobList,jobDetail,ServerIp){
	$scope.listArray = jobList.array;
	console.log("listArray.length:"+$scope.listArray.length);
	$scope.buttonGetMore = {
		disable:false,
		text:'加载更多'
	};
	$scope.getMoreJobList = function(){
		$http({
			method:'GET',
			url:ServerIp.value+'/job/getMoreJobList.json',
		}).success(function(data){
			if(data==undefined){
				//error
				$scope.buttonGetMore.disable = true;
				$scope.buttonGetMore.text = '显示完毕';
			}
			else{
				$scope.listArray = $scope.listArray.concat(data);
				console.log("长度:"+$scope.listArray.length);
			}
		}).error(function(data){
			$ionicPlatform.ready(function () {
				$cordovaToast.showShortBottom('连接服务器失败');
			});
		});	
	};
	$scope.showJobDetail = function(job){
		//console.log(jobDetail.jobDate);
		$http({
			method:'POST',
			url:ServerIp.value+'/job/getJobDetail.json',
			data:job,
			headers: {
				'Content-Type': 'application/json;charset=utf8'
			}
		}).success(function(data){
			if(data==undefined){
				//error
			}
			else{
				jobDetail.object = data;
				//console.log(jobDetail.jobDate);
				window.location.href="#/home/jobdetail";
			}
		}).error(function(data){
			$ionicPlatform.ready(function () {
				$cordovaToast.showShortBottom('连接服务器失败');
			});
		});
	};
})
		
.controller('JobDetailCtrl', function($scope,$http,$ionicPlatform,$cordovaToast,jobDetail,ServerIp){
	$scope.jobdetail = jobDetail.object;
	//console.log("详细信息界面:"+jobDetail.object.jobDescribe);
	$scope.showCompanyDetail = function(){
		$http({
			method:'POST',
			url:ServerIp.value+'/job/getCompanyDetail.json',
			data:$scope.jobdetail,
			headers: {
				'Content-Type': 'application/json;charset=utf8'
			}
		}).success(function(data){
			jobDetail.object = data;
			window.location.href="#/home/companydetail";
		}).error(function(data){
			$ionicPlatform.ready(function () {
				$cordovaToast.showShortBottom('连接服务器失败');
			});
		})
	};
})

.controller('CompanyDetailCtrl', function($scope,$http,$ionicPlatform,jobDetail,ServerIp){
	$scope.jobdetail = jobDetail.object;
	$scope.mapSrc = {
		value:""
	};
	$scope.mapSrc.value = "http://api.map.baidu.com/staticimage?center="+$scope.jobdetail.companyLng+","+$scope.jobdetail.companyLat+
			"&width=450&height=500&zoom=17";
	$scope.showMap = function(){
		console.log("公司地址:"+jobDetail.object.companyAddress);
		window.location.href="#/home/showmap";
	};
})

.controller('ShowMapCtrl', function($scope,$http,$ionicPlatform,$cordovaToast,jobDetail,ServerIp){
	var longitude = jobDetail.object.companyLng;
	var latitude = jobDetail.object.companyLat; 
	var city = jobDetail.object.jobCity;
	var title = jobDetail.object.companyName;
	var content1 = jobDetail.object.companyDetailName;
	var content2 = jobDetail.object.companyAddress;
	var content = content1 + '。地址: '+content2;
//	$ionicPlatform.ready(function () {
//		$cordovaToast.showShortCenter(content);
//	});
	$scope.mapOptions = {
		center:{
			longitude:longitude,
			latitude:latitude
		},
		zoom:15,
		city:city,
		markers:[{
			longitude: longitude,
			latitude: latitude,
			//icon: 'img/mappiont.png',
			width: 49,
			height: 60,
			title: title,
			content: content
		}]
	};
})

.controller('Register1Ctrl', function ($scope, $http, $timeout, $ionicPlatform ,$cordovaSms, $cordovaToast, ServerIp, globalUser) {
	$scope.user = {
		phonenum: ""
	};
	$scope.validateButton = {
		enable: true,
		text: "获取验证码"
	};
	$scope.validate = {
		code: "",
		rightCode: "",
		text:""
	};
	$scope.sendValidateCode = function () {
		if ($scope.user.phonenum == undefined || $scope.user.phonenum.length != 11) {
			$ionicPlatform.ready(function () {
				$cordovaToast.showShortBottom('请输入正确的手机号码');
			});
			return;
		}
		console.log("发送验证码");
		$http({
			method: 'POST',
			url: ServerIp.value + '/user/sendSMS.json',
			data: "phonenum=" + $scope.user.phonenum,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'
			}
		}).success(function (data) {
			if (!data.success) {
				//用Toast显示错误
				$ionicPlatform.ready(function () {
					$cordovaToast.showShortBottom(data.msg);
				});
			} else {
				$scope.validate.rightCode = data.msg;
				//发送短信
				$scope.validate.text = '[Pirdboy] 验证码:'+data.msg+',您即将注册Pirdboy找工作app,请确认为本人操作。';
				$ionicPlatform.ready(function(){
					$cordovaSms
						.send($scope.user.phonenum,$scope.validate.text,{
								replaceLineBreaks: false, // true to replace \n by a new line, false by default
								android: {
									//intent: 'INTENT'  // send SMS with the native android SMS messaging
									//intent: '' // send SMS without open any other app
								}
						})
						.then(function(){
							$ionicPlatform.ready(function () {
								$cordovaToast.showShortBottom('信息已发送');
							});
					},function(error){
						// An error occurred
					})
				});
				//TODO:将验证码按钮设置为"30秒后再次发送"
			}
		}).error(function (data) {
			//用Toast或者其他方式显示错误		
		});
	};
	$scope.testValidateCode = function () {
		if ($scope.validate.code == $scope.validate.rightCode) {
			globalUser.phonenum = $scope.user.phonenum;
			window.location.href = "#/home/register2"
		} else {
			//用Toast显示错误
			$ionicPlatform.ready(function () {
				$cordovaToast.showShortBottom('验证码不正确');
			});
		}
	};

})

.controller('Register2Ctrl', function ($scope, $http, $ionicPlatform, $cordovaToast, ServerIp, globalUser) {
	$scope.user = {
		username: "",
		password: "",
		password2: ""
	};
	$scope.register = function () {
		if ($scope.user.password != $scope.user.password2) {
			$ionicPlatform.ready(function () {
				$cordovaToast.showShortBottom('两次密码不一致');
			});
			return;
		} else if ($scope.user.password.length < 6) {
			$ionicPlatform.ready(function () {
				$cordovaToast.showShortBottom('密码过短,请至少输入6位');
			});
			return;
		} else {
			globalUser.username = $scope.user.username;
			globalUser.password = $scope.user.password;
			$http({
				method: 'POST',
				url: ServerIp.value + '/user/addUser.json',
				data: globalUser,
				headers: {
					'Content-Type': 'application/json;charset=utf8'
				}
			}).success(function (data) {
				if (!data.success) {
					//用Toast提示失败
					$ionicPlatform.ready(function () {
						$cordovaToast.showShortBottom(data.msg);
					});
				} else {
					//用Toast提示成功
					$ionicPlatform.ready(function () {
						$cordovaToast.showShortBottom(data.msg)
							.then(function(success){
								window.location.href="#/home/login";
								globalUser.phonenum = "";
								globalUser.username = "";
								globalUser.password = "";
						},function(error){
							
						});
					});
				}
			}).error(function (data) {
				$ionicPlatform.ready(function () {
					$cordovaToast.showShortBottom('连接服务器失败');
				});
			});
		}
	};
})

.controller('LoginCtrl', function ($scope,$http,$ionicPlatform,$cordovaToast,ServerIp,globalUser) {
	$scope.user = {
		username:"",
		phonenum:"",
		password:""
	};
	$scope.login = function(){
		$http({
			method:'POST',
			url:ServerIp.value+'/user/loginUser.json',
			data:"phonenum="+$scope.user.phonenum+"&password="+$scope.user.password,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'
			}
		}).success(function (data){
			//访问成功
			if(!data.success){
				$ionicPlatform.ready(function () {
					$cordovaToast.showShortBottom(data.msg);
				});
			} else{
				$ionicPlatform.ready(function () {
					$cordovaToast.showShortBottom('登录成功')
						.then(function(success){
							globalUser.username = data.msg;
							globalUser.phonenum = $scope.user.phonenum;
							//globalUser.password = $scope.user.password;
							window.location.href="#/home/searchjob";
					},function(error){
						
					});
					
				});
			}
		}).error(function (data){
			$ionicPlatform.ready(function () {
				$cordovaToast.showShortBottom('连接服务器失败');
			});
		});
	};
})
