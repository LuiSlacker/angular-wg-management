/**
 * Created by petulantslacker on 12/12/15.
 */
app.controller('allWGsController', ['allWGsService', function(allWGsService){
    var vm = this;

    vm.showNewItem = false;
    vm.wgs = allWGsService.wgs;
    allWGsService.getAllWGs();

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

}]);