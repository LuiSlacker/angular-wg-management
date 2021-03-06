/**
 * @ngdoc controller
 * @name app.controller: loginController
 * @requires authService
 * @requires $location
 * @description
 *  This controller is responsible for login and signup procedures
 */
app.controller('loginController',['authService','$location', function(authService, $location){
    var vm = this;

    vm.user = {};
    vm.newUser = {};
    vm.login = function(){
        console.log(vm.user);
        authService.login(vm.user).then(function(){
            $location.path('app/wgs');
        });
    };
    vm.signup = function(){
        console.log(vm.newUser);
        authService.signup(vm.newUser).then(function(){
            $location.path('app/wgs');
        }).catch(function(e){
            console.log(e);
        });
    };

    vm.facebookSignup = function(){
        authService.facebookSignup().then(function(){
            $location.path('app/wgs');
        }).catch(function(e){
            console.log(e);
        });
    };

    angular.element('.toggle').on('click', function(){
        angular.element('.containers').addClass('active');
    });
    angular.element('.close').on('click', function(){
        angular.element('.containers').removeClass('active');
    })
}]);