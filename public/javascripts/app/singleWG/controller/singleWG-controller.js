/**
 * Created by petulantslacker on 14/12/15.
 */
app.controller('singleWGController', ['$stateParams',
                                      'singleWGService',
                                      'allWGsService', function($stateParams, singleWGService, allWGsService){
    var vm = this;
    vm.showNewItem = false;
    vm.wgID = $stateParams.wgID;
    vm.wgMembersHeadline = "WG Members";
    allWGsService.getSingleWG(vm.wgID).success(function(data){
        vm.wgName = data.name;
    });

    vm.shoppinglists = singleWGService.shoppinglists;
    singleWGService.getAllShoppinglists(vm.wgID);

    vm.wgMembers= [
        {name: "Ludwig"},
        {name: "Kati"},
        {name: "Kommissar Borowski"},
        {name: "Romano"}
    ];

    vm.newItem = function(){
        vm.showNewItem = true;
    };

    vm.addNewShoppinglist = function(){
        vm.newShoppinglist.wg = vm.wgID;
        singleWGService.createShoppinglist(vm.wgID, vm.newShoppinglist);
        vm.showNewItem = false;
        vm.newShoppinglist = {};
    };

    vm.cancelAddingNewShoppinglist = function(){
        vm.showNewItem = false;
        vm.newShoppinglist = {};
    };
}]);