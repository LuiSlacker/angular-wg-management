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
                    templateUrl: 'app/allWGs/view/all_wgs.html',
                    resolve: {
                        deps: ['uiLoad', function (uiLoad) {
                            return uiLoad.load([
                                'app/allWGs/controller/allWGs-controller.js',
                                'app/allWGs/service/allWGs-service.js'
                            ]);
                        }]
                        /*postPromise: ['allWGsService', function(allWGsService){
                            return allWGsService.getAllWGs();
                        }]*/
                    }
                })
                .state('wg', {
                    url: '/wg/:wgName',
                    templateUrl: 'app/singleWG/view/single_wg.html',
                    resolve: {
                        deps: ['uiLoad', function (uiLoad) {
                            return uiLoad.load(
                                'app/singleWG/controller/singleWG-controller.js'
                            );
                        }]
                    }
                })
                .state('shoppinglist', {
                    url: '/shoppinglist/:shoppinglistName&:wgName',
                    templateUrl: 'app/singleSL/view/single_sl.html',
                    resolve: {
                        deps: ['uiLoad', function (uiLoad) {
                            return uiLoad.load(
                                'app/singleSL/controller/singleSL-controller.js'
                            );
                        }]
                    }
                })

                .state('profile', {
                    url: '/profile',
                    templateUrl: 'app/profile/view/profile.html',
                    resolve: {
                        deps: ['uiLoad', function (uiLoad) {
                            return uiLoad.load(
                                'app/profile/controller/profile-controller.js'
                            );
                        }]
                    }
                })
        }])

   .run(function($rootScope, utils){
        $rootScope.utils = utils;
    });