/**
 * Created by petulantslacker on 14/12/15.
 */
app.controller('singleWGController', ['$stateParams',
                                      'singleWGService',
                                      'allWGsService', function($stateParams,
                                                                singleWGService,
                                                                allWGsService){

    // config ====================================================================
    var vm = this;
    vm.showNewItem = false;
    vm.wgID = $stateParams.wgID;
    vm.wgMembersHeadline = "WG Members";
    vm.shoppinglists = singleWGService.shoppinglists;
    vm.wgMembers= [
        {name: "Ludwig"},
        {name: "Kati"},
        {name: "Kommissar Borowski"},
        {name: "Romano"}
    ];

    // controller functions ======================================================
    allWGsService.getSingleWG(vm.wgID).success(function(data){
        vm.wgName = data.name;
    });

    vm.shoppinglists = singleWGService.shoppinglists;
    singleWGService.getAllShoppinglists(vm.wgID);

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

    vm.deleteShoppinglist = function(shoppinglistId){
        singleWGService.deleteShoppinglist(vm.wgID, shoppinglistId).success(function(){
            singleWGService.getAllShoppinglists(vm.wgID);
        });
    }
}]);