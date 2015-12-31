/**
 * Created by petulantslacker on 14/12/15.
 */
app.controller('singleWGController', function($stateParams){
    var vm = this;

    vm.showNewItem = false;
    vm.wgName = $stateParams.wgName;
    vm.wgMembersHeadline = "WG Members";

    vm.shoppinglists= [
        {name: "Feuerzangenbowle", creator:"Ludwig"},
        {name: "WG-Essen",creator:"Kati"},
        {name: "Tatort Abend", creator:"Kommissar Borowski"},
        {name: "Musik Session", creator:"Romano"}
    ];
    vm.wgMembers= [
        {name: "Ludwig"},
        {name: "Kati"},
        {name: "Kommissar Borowski"},
        {name: "Romano"}
    ];

    vm.newItem = function(){
        vm.showNewItem = true;
    };

    vm.addNewWG = function(){
        vm.shoppinglists.push({
            name: vm.newShoppinglist.name,
            creator: vm.newShoppinglist.creator
        });
        vm.showNewItem = false;
        vm.newShoppinglist = {};
    };

    vm.cancelAddingNewWG = function(){
        vm.showNewItem = false;
        vm.newWG = {};
    };
});