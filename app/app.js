/**
 * Created by petulantslacker on 12/12/15.
 */
'use strict';

var app = angular.module("app", ['ui.router', 'ui.load'])

    .config([
        '$urlRouterProvider',
        '$stateProvider',
        '$controllerProvider', function ($urlRouterProvider,
                                         $stateProvider,
                                         $controllerProvider) {

            //$controllerProvider.allowGlobals();
            app.controller = $controllerProvider.register;

            $urlRouterProvider.otherwise('/wgs');

            $stateProvider
                .state('wgs', {
                    url: '/wgs',
                    templateUrl: 'app/allWGs/view/all_wgs.html',
                    resolve: {
                        deps: ['uiLoad', function (uiLoad) {
                            return uiLoad.load(
                                'app/allWGs/controller/allWGs-controller.js'
                            );
                        }]
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
        }])

   .run(function($rootScope, utils){
        $rootScope.utils = utils;
    });