/**
 * Created by petulantslacker on 15/12/15.
 */
app.controller('singleSLController', ['$stateParams',
                                      'singleSLService',
                                      'singleWGService', function($stateParams,
                                                                  singleSLService,
                                                                  singleWGService){
        var vm = this;
        vm.wgID = $stateParams.wgID;
        vm.shoppinglistID = $stateParams.shoppinglistID;
        vm.showNewItem = false;
        vm.items = singleSLService.items;
        singleSLService.getAllItems(vm.wgID, vm.shoppinglistID);

        singleWGService.getSingleShoppinglist(vm.wgID,vm.shoppinglistID).success(function(data){
            vm.wg = data;
        });


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