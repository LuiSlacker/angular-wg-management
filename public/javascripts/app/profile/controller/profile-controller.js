app.controller('profileController', ['authService', function(authService){
    var vm = this;

    vm.showNewItem = false;

    vm.name = authService.user.username;
    vm.email = "katia@example.com";
    vm.password = "xyz";

}]);