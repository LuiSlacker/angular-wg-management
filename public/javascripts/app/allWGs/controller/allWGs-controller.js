/**
 * Created by petulantslacker on 12/12/15.
 */
app.controller('allWGsController', ['allWGsService', function(allWGsService){

    // config ===============================================================
    var vm = this;
    vm.showNewItem = false;
    vm.wgs = allWGsService.wgs;
    allWGsService.getAllWGs();

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
    }

    vm.saveWG = function(id){
        allWGsService.edit(id, {
            name: vm.wg._id.name,
            street: vm.wg._id.street,
            city: vm.wg._id.city
        });
    }
}]);