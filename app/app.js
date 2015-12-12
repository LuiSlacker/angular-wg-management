/**
 * Created by petulantslacker on 12/12/15.
 */
'use strict';

var app = angular.module("app", ['ui.router', 'ui.load']);

app.config([
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
                templateUrl: 'app/wgs/view/all_wgs.html',
                resolve: {
                    deps: ['uiLoad', function (uiLoad) {
                        return uiLoad.load(
                            'app/wgs/controller/allWGs-controller.js'
                        );
                    }]
                }
            })
    }]);