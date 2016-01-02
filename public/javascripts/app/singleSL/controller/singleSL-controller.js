/**
 * Created by petulantslacker on 15/12/15.
 */
app.controller('singleSLController', ['$stateParams','singleSLService', function($stateParams, singleSLService){
    var vm = this;

    vm.showNewItem = false;
    vm.wgID = $stateParams.wgID;
    vm.shoppinglistID = $stateParams.shoppinglistID;

    vm.items = singleSLService.items;
    singleSLService.getAllItems(vm.wgID, vm.shoppinglistID);

    vm.enableAddingNewItem = function(){
        vm.showNewItem = true;
    };

    vm.addNewItem = function(){
        singleSLService.createItem(vm.wgID, vm.shoppinglistID, vm.newItem);
        vm.showNewItem = false;
        vm.newItem = {};
    };

    vm.cancelAddingNewItem = function(){
        vm.showNewItem = false;
        vm.newItem = {};
    };

    vm.purchaseItem = function(index){
        vm.items[index].purchased = true;
    };
}]);