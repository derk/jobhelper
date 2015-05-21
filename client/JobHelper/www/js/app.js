// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers','ngCordova'])

.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
})
.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	//改变android的一些默认行为
	$ionicConfigProvider.platform.android.tabs.style('stardard');
	$ionicConfigProvider.platform.android.tabs.position('bottom');
	$ionicConfigProvider.platform.android.views.transition('ios');
	$ionicConfigProvider.platform.android.navBar.alignTitle('center');
	$ionicConfigProvider.platform.android.navBar.positionPrimaryButtons('left');
	$ionicConfigProvider.platform.android.navBar.positionSecondaryButtons('right');


	$stateProvider
		.state('sidemenu', {
			url: "/home",
			abstract: true,
			templateUrl: "templates/sidemenu.html",
		})
		.state('sidemenu.searchjob', {
			url: "/searchjob",
			views: {
				'menuContent': {
					templateUrl: "templates/searchjob.html",
					controller:"SearchJobCtrl"
				}
			}
		})
		.state('sidemenu.selectcity',{
			url:"/selectcity",
			views:{
				'menuContent':{
					templateUrl:"templates/selectcity.html",
					controller:"SelectCityCtrl"
				}
			}
		})
		.state('sidemenu.selectjob1',{
			url:"/selectjob1",
			views:{
				'menuContent':{
					templateUrl:"templates/selectjob1.html",
					controller:"SelectJob1Ctrl"
				}
			}
		})
		.state('sidemenu.selectjob2',{
			url:"/selectjob2",
			views:{
				'menuContent':{
					templateUrl:"templates/selectjob2.html",
					controller:"SelectJob2Ctrl"
				}
			}
		})
		.state('sidemenu.listjob',{
			url:"/listjob",
			views:{
				'menuContent':{
					templateUrl:"templates/listjob.html",
					controller:"ListJobCtrl"
				}
			}
		})
		.state('sidemenu.jobdetail',{
			url:"/jobdetail",
			views:{
				'menuContent':{
					templateUrl:"templates/jobdetail.html",
					controller:"JobDetailCtrl"
				}
			}
		})
		.state('sidemenu.companydetail',{
			url:"/companydetail",
			views:{
				'menuContent':{
					templateUrl:"templates/companydetail.html",
					controller:"CompanyDetailCtrl"
				}
			}
		})
		.state('sidemenu.login',{
			url:"/login",
			views:{
				'menuContent':{
					templateUrl:"templates/login.html",
					controller:"LoginCtrl"
				}
			}
		})
		.state('sidemenu.register1',{
			url:"/register1",
			views:{
				'menuContent':{
					templateUrl:"templates/register1.html",
					controller:"Register1Ctrl"
				}
			}
		})
		.state('sidemenu.register2',{
			url:"/register2",
			views:{
				'menuContent':{
					templateUrl:"templates/register2.html",
					controller:"Register2Ctrl"
				}
			}
		})
		
		

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise("/home/searchjob");
});