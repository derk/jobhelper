angular.module('myApp', ['ionic', 'myApp.controllers'])

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
		.state('tabs', {
			url: "/tab",
			abstract: true,
			templateUrl: "templates/tabs.html"
		})
		.state('tabs.searchjob', {
			url: "/searchjob",
			views: {
				'SearchJob-tab': {
					templateUrl: "templates/searchjob.html",
				}
			}
		})
		.state('tabs.selectjob', {
			url: "/selectjob",
			views: {
				'SearchJob-tab': {
					templateUrl: "templates/selectjob.html",
					controller:'SelectJobCtrl'
				}
			}
		})
		.state('tabs.personinfo', {
			url: "/personinfo",
			views: {
				'PersonInfo-tab': {
					templateUrl: "templates/personinfo.html",
					controller:'UserCtrl'
				}
			}
		})
		.state('tabs.login', {
			url: "/login",
			views: {
				'PersonInfo-tab': {
					templateUrl: "templates/login.html",
					controller:'LoginCtrl'
				}
			}
		})
		.state('tabs.register', {
			url: "/register",
			views: {
				'PersonInfo-tab': {
					templateUrl: "templates/register.html",
					controller:'RegisterCtrl'
				}
			}
		});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise("/tab/searchjob");
});