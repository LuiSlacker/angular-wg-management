app.controller('profileController', ['authService','profileService', function(authService, profileService){
    var vm = this;
    vm.user = authService.user;

	vm.updateProfile = function(){
        profileService.updateProfile(vm.user).success(function() {
        	authService.setUser(vm.user);
        });        	
    };

}]);

