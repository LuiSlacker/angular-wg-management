app.controller('profileController', ['authService','profileService', function(authService, profileService){
    var vm = this;
    vm.user = authService.user;

	vm.updateUsername= function(data){
        profileService.updateUsername(vm.user._id, data.username).success(function(data) {
        	authService.setUser(data);
        });        	
    };

    vm.updatePassword = function(){
        profileService.updatePassword(vm.user._id, vm.user.local.password).success(function(data) {
            authService.setUser(data);
        });
    };
}]);

