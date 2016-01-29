/**
 * @ngdoc controller
 * @name app.controller: profileController
 * @requires authService
 * @requires profileService
 * @description
 * The controller to handle profile changes
 */
app.controller('profileController', ['authService','profileService', function(authService, profileService){
    var vm = this;
    vm.user = authService.user;

	vm.updateUser = function(){
        profileService.updateUser(vm.user).success(function(serverdata) {
        	authService.setUser(serverdata);
        });        	
    };
}]);

