/**
 * Created by petulantslacker on 12/12/15.
 */
'use strict';

var app = angular.module("app", ['ui.router', 'ui.load'])

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

            $urlRouterProvider.otherwise('/wgs');

            $stateProvider
                .state('wgs', {
                    url: '/wgs',
                    templateUrl: 'public/javascripts/app/allWGs/view/all_wgs.html',
                    resolve: {
                        deps: ['uiLoad', function (uiLoad) {
                            return uiLoad.load([
                                'public/javascripts/app/allWGs/controller/allWGs-controller.js',
                                'public/javascripts/app/allWGs/service/allWGs-service.js'
                            ]);
                        }]
                        /*postPromise: ['allWGsService', function(allWGsService){
                            return allWGsService.getAllWGs();
                        }]*/
                    }
                })
                .state('wg', {
                    url: '/wg/:wgID',
                    templateUrl: 'public/javascripts/app/singleWG/view/single_wg.html',
                    resolve: {
                        deps: ['uiLoad', function (uiLoad) {
                            return uiLoad.load([
                                'public/javascripts/app/singleWG/controller/singleWG-controller.js',
                                'public/javascripts/app/singleWG/service/singleWG-service.js',
                                'public/javascripts/app/allWGs/service/allWGs-service.js']);
                        }]
                    }
                })
                .state('shoppinglist', {
                    url: '/shoppinglist/:shoppinglistID&:wgID',
                    templateUrl: 'public/javascripts/app/singleSL/view/single_sl.html',
                    resolve: {
                        deps: ['uiLoad', function (uiLoad) {
                            return uiLoad.load([
                                'public/javascripts/app/singleSL/controller/singleSL-controller.js',
                                'public/javascripts/app/singleSL/service/singleSL-service.js',
                                'public/javascripts/app/singleWG/service/singleWG-service.js']);
                        }]
                    }
                })

                .state('profile', {
                    url: '/profile',
                    templateUrl: 'public/javascripts/app/profile/view/profile.html',
                    resolve: {
                        deps: ['uiLoad', function (uiLoad) {
                            return uiLoad.load(
                                'public/javascripts/app/profile/controller/profile-controller.js'
                            );
                        }]
                    }
                })
        }])

   .run(function($rootScope, utils){
        $rootScope.utils = utils;
    });