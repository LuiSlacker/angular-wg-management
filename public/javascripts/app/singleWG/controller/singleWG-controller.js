/**
 * Created by petulantslacker on 14/12/15.
 */
app.controller('singleWGController', ['$stateParams',
                                      'singleWGService',
                                      'allWGsService',
                                      'authService', function($stateParams,
                                                              singleWGService,
                                                              allWGsService,
                                                              authService){

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

    singleWGService.getAllShoppinglists(vm.wgID);

    vm.newItem = function(){
        vm.showNewItem = true;
    };

    vm.addNewShoppinglist = function(){
        vm.newShoppinglist.wg = vm.wgID;
        vm.newShoppinglist.initiator = authService.user.username;
        singleWGService.createShoppinglist(vm.wgID, vm.newShoppinglist);
        vm.showNewItem = false;
        vm.newShoppinglist = {};
    };

    vm.cancelAddingNewShoppinglist = function(){
        vm.showNewItem = false;
        vm.newShoppinglist = {};
    };

    vm.updateShoppinglist = function(shoppinglistID){
        singleWGService.updateShoppinglist(vm.wgID, vm.shoppinglistID, 
            {"name": vm.name,
             "date": vm.date
            }
        ).success(function(data){
            singleWGService.getAllShoppinglists(vm.wgID);
        });
    };

    vm.deleteShoppinglist = function(shoppinglistId){
        singleWGService.deleteShoppinglist(vm.wgID, shoppinglistId).success(function(){
            singleWGService.getAllShoppinglists(vm.wgID);
        });
    }
}]);