'use strict';
/**
 * @ngdoc overview
 * @name vendorConsoleApp
 * @description
 * # vendorConsoleApp
 *
 * Main module of the application.
 */
angular
    .module('vendorConsoleApp', [
        'templatesCache',
        'ngCordova',
        'oc.lazyLoad',
        'angular-loading-bar',
        'ui.router',
        'ui.bootstrap',
        'ui.bootstrap.datetimepicker',
        'checklist-model',
        'ngTouch'
    ])
    .constant('apiConfig', {
        //"host": "http://115.28.66.10"  //线上
        "host": "http://vendor.canguanwuyou.cn"
        //"host": "http://115.28.64.174",  //测试
        //"host": ""
        // "environment": "develop"
    })
    .run(function () {
    })
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$locationProvider', '$httpProvider', '$provide',
        function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider, $httpProvider, $provide) {

            $ocLazyLoadProvider.config({
                debug: false,
                events: true
            });

            $urlRouterProvider.otherwise('/login');

            $httpProvider.interceptors.push(function ($q, $rootScope, $location) {
                return {
                    'responseError': function (rejection) {
                        var status = rejection.status;
                        var config = rejection.config;
                        var method = config.method;
                        var url = config.url;

                        if (status == 401) {
                            $location.path("/login");
                        } else {
                            $rootScope.error = method + " on " + url + " failed with status " + status;
                        }

                        return $q.reject(rejection);
                    }
                };
            });

            $stateProvider
                .state('login', {
                    templateUrl: 'login/login.html',
                    controller: 'LoginCtrl',
                    url: '/login',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'vendorConsoleApp',
                                files: [
                                    'app/common/CommonService.js',
                                    'app/login/login.js'
                                ]
                            })
                        }
                    }
                })
                .state('home', {
                    templateUrl: 'home/home.html',
                    controller: 'HomeCtrl',
                    url: '/home',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'vendorConsoleApp',
                                files: [
                                    'app/home/HomeCtrl.js'
                                ]
                            })
                        }
                    }
                })
                .state('purchase-order-list', {
                    templateUrl: 'purchase-order-list/purchase-order-list.html',
                    controller: 'PurchaseOrderListCtrl',
                    url: '/purchase-order-list',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'vendorConsoleApp',
                                files: [
                                    'app/common/CommonService.js',
                                    'app/purchase-order-list/PurchaseOrderListCtrl.js'
                                ]
                            })
                        }
                    }
                })
                .state('stock-order-list', {
                    templateUrl: 'stock-order-list/stock-order-list.html',
                    controller: 'StockOrderListCtrl',
                    url: '/stock-order-list',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'vendorConsoleApp',
                                files: [
                                    'app/common/CommonService.js',
                                    'app/stock-order-list/StockOrderListCtrl.js'
                                ]
                            })
                        }
                    }
                })
                .state('history-purchase-list', {
                    templateUrl: 'history-purchase-list/history-purchase-list.html',
                    controller: 'HistoryPurchaseListCtrl',
                    url: '/history-purchase-list/?page&pageSize&start&end',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'vendorConsoleApp',
                                files: [
                                    'app/history-purchase-list/HistoryPurchaseListCtrl.js'
                                ]
                            })
                        }
                    }
                })
                .state('profile', {
                    templateUrl: 'profile/profile.html',
                    controller: 'ProfileCtrl',
                    url: '/profile',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'vendorConsoleApp',
                                files: [
                                    'app/profile/CameraService.js',
                                    'app/profile/FeedbackService.js',
                                    'app/profile/ProfileCtrl.js'
                                ]
                            })
                        }
                    }
                })
        }
    ]);

//window.BOOTSTRAP_OK = true;
//
//angular.element(document).ready(function () {
//    angular.bootstrap(document, ['vendorConsoleApp']);
//});