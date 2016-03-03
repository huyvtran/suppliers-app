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
        'ionic',
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
        //"host": "http://vendor.canguanwuyou.cn"
        "host": "http://115.28.64.174"  //测试
        //"host": ""//本地   http://192.168.1.114
        // "environment": "develop"
    })
    .run(function ($ionicPlatform, $cordovaFile, $cordovaFileOpener2, $cordovaFileTransfer, $ionicPopup, $ionicLoading, $timeout, ConfirmModalDialogService,$state,UpdateService,NetworkUtil) {

        $ionicPlatform.ready(function () {
            if (ionic.Platform.isAndroid()) {

                cordova.getAppVersion.getVersionCode(function (versionCode) {
                    var curVersionCode = 18;
                    if (versionCode < curVersionCode) {
                        ConfirmModalDialogService.AsyncConfirmYesNo("版本有更新，是否需要升级？",
                            function () {
                                var url = "http://115.28.66.10:9090/cgwy_verdor_28.apk";
                                var targetPath = cordova.file.externalApplicationStorageDirectory + 'cgwy/cgwy_' + curVersionCode + '.apk';
                                var trustHosts = true;
                                var options = {};
                                $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                    .then(function (result) {
                                        // 打开下载下来的APP
                                        $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive')
                                            .then(function () {
                                            }, function (err) {
                                                ConfirmModalDialogService.AsyncAlert("文件打开失败，请稍后重试！");
                                            });
                                    }, function (err) {
                                        ConfirmModalDialogService.AsyncAlert("当前网络不稳定,下载失败!");
                                    }, function (progress) {
                                        $timeout(function () {
                                            var downloadProgress = (progress.loaded / progress.total) * 100;
                                            var msg = "已经下载:" + Math.floor(downloadProgress) + "%";
                                            ConfirmModalDialogService.AsyncDialogShow("下载进度" , msg);
                                            //$("#downloadProgressMessage").innerText("已经下载:"+Math.floor(downloadProgress) + "%");
                                            //$ionicLoading.show({template: "<div style='font-size: 16px; height:50px; line-height:50px;font-weight:bold; color:red;margin: 50px;8%;0 8%;text-align: center; border: 2px solid red;border-radius: 5px;'>已经下载:" + Math.floor(downloadProgress) + "%" + "</div>"});
                                            if (downloadProgress > 99) {
                                                ConfirmModalDialogService.hide();
                                            }
                                        })
                                    });
                            }

                        );
                    } else {

                        //if (NetworkUtil.getNetworkRs()) {
                        //    var updateObject = function () {
                        //        UpdateService.updateApp().then(function (result) {
                        //            if (result == 2) {
                        //                ConfirmModalDialogService.AsyncConfirmYesNo("数据更新失败是否需要重试?",
                        //                function(){
                        //                    updateObject();
                        //                });
                        //            }
                        //        });
                        //    }
                        //    updateObject();
                        //}
                    }
                });

            }
        });
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

window.BOOTSTRAP_OK = true;

angular.element(document).ready(function () {
    angular.bootstrap(document, ['vendorConsoleApp']);
});