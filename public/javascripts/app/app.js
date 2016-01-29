/**
 * Created by petulantslacker on 12/12/15.
 */
'use strict';
/**
 * @ngdoc object
 * @name app
 * @description main module
 */
var app = angular.module("app", ['ui.router', 'ui.load', 'xeditable'])

    .config([
        '$urlRouterProvider',
        '$stateProvider',
        '$controllerProvider',
        '$provide', function ($urlRouterProvider,
                              $stateProvider,
                              $controllerProvider,
                              $provide) {

            app.controller = $controllerProvider.register;
            app.factory = $provide.factory;

            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'public/javascripts/app/login/view/login.html',
                    resolve: {
                        deps: ['uiLoad', function (uiLoad) {
                            return uiLoad.load([
                                'public/javascripts/app/login/controller/login-controller.js',
                                'public/javascripts/app/main/service/auth-service.js']);
                        }]
                    }
                })
                .state('app', {
                    url: '/app',
                    templateUrl: 'public/javascripts/app/main/view/app.html',
                    abstract:true
                })
                .state('app.wgs', {
                    url: '/wgs',
                    templateUrl: 'public/javascripts/app/allWGs/view/all_wgs.html',
                    access: {restricted:true},
                    resolve: {
                        deps: ['uiLoad', function (uiLoad) {
                            return uiLoad.load([
                                'public/javascripts/app/allWGs/controller/allWGs-controller.js',
                                'public/javascripts/app/allWGs/service/allWGs-service.js'
                            ]);
                        }]
                    }
                })
                .state('app.wg', {
                    url: '/wg/:wgID',
                    templateUrl: 'public/javascripts/app/singleWG/view/single_wg.html',
                    access: {restricted:true},
                    resolve: {
                        deps: ['uiLoad', function (uiLoad) {
                            return uiLoad.load([
                                'public/javascripts/app/singleWG/controller/singleWG-controller.js',
                                'public/javascripts/app/singleWG/service/singleWG-service.js',
                                'public/javascripts/app/allWGs/service/allWGs-service.js']);
                        }]
                    }
                })
                .state('app.shoppinglist', {
                    url: '/shoppinglist/:shoppinglistID&:wgID',
                    templateUrl: 'public/javascripts/app/singleSL/view/single_sl.html',
                    access: {restricted:true},
                    resolve: {
                        deps: ['uiLoad', function (uiLoad) {
                            return uiLoad.load([
                                'public/javascripts/app/singleSL/controller/singleSL-controller.js',
                                'public/javascripts/app/singleSL/service/singleSL-service.js',
                                'public/javascripts/app/singleWG/service/singleWG-service.js',
                                'public/javascripts/app/allWGs/service/allWGs-service.js']);
                        }]
                    }
                })
                .state('app.profile', {
                    url: '/profile',
                    templateUrl: 'public/javascripts/app/profile/view/profile.html',
                    access: {restricted:true},
                    resolve: {
                        deps: ['uiLoad', function (uiLoad) {
                            return uiLoad.load([
                                'public/javascripts/app/profile/controller/profile-controller.js',
                                'public/javascripts/app/profile/service/profile-service.js',
                                'public/javascripts/app/main/service/auth-service.js']);
                        }]
                    }
                })
                .state('app.impressum', {
                    url: '/impressum',
                    templateUrl: 'public/javascripts/app/impressum/view/impressum.html'
                })
                .state('docs', {
                    url: '/docs',
                    templateUrl: 'public/docs/index.html'
                })
        }])

   .run(['$rootScope', '$location', 'authService', 'utils',function($rootScope, $location, authService, utils){
        $rootScope.utils = utils;
        $rootScope.$on('$stateChangeStart', function(event, next, current){
            if (next.access && next.access.restricted && !authService.isLoggedIn()){
                $location.path('login')
            }
        });
    }]);