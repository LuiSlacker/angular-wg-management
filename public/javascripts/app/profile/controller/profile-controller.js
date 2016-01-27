app.controller('profileController', ['authService','profileService', function(authService, profileService){
    var vm = this;
    vm.user = authService.user;

	vm.updateUsername= function(){
        profileService.updateUsername(vm.user).success(function(serverdata) {
        	authService.setUser(serverdata);
        });        	
    };

    vm.updatePassword = function(){
        profileService.updatePassword(vm.user._id, vm.user.local.password).success(function(data) {
            authService.setUser(data);
        });
    };
}]);

