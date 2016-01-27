app.controller('allWGsController', ['$location','$state','allWGsService','authService', function($location, $state, allWGsService, authService){

    // config ===============================================================
    var vm = this;
    vm.showNewItem = false;
    vm.wgs = allWGsService.wgs;
    allWGsService.getAllWGs();
    vm.user = authService.user;

    // controller functions ==================================================
    vm.newItem = function(){
        vm.showNewItem = true;
    };

    vm.addNewWG = function(){
        allWGsService.create({
            name: vm.newWG.name,
            street: vm.newWG.street,
            city: vm.newWG.city
        });
        vm.showNewItem = false;
        vm.newWG = {};
    };

    vm.cancelAddingNewWG = function(){
        vm.showNewItem = false;
        vm.newWG = {};
    };

    vm.deleteWG = function(id){
        allWGsService.delete(id).then(
            allWGsService.getAllWGs()
        );
    };

    vm.updateWG = function(wgID, data){
        allWGsService.update(wgID, data).success(function(data){
            allWGsService.getAllWGs();
        });
    };

    vm.registerForWg = function(wgID){
        allWGsService.update(wgID, {user: authService.user._id}).success(function(data){
            $state.go('app.wg',{wgID:wgID});
        });
    };
}]);