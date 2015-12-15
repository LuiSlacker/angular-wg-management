/**
 * Created by petulantslacker on 15/12/15.
 */
app.controller('singleSLController', ['$stateParams', function($stateParams){
    var vm = this;

    vm.showNewItem = false;
    vm.wgName = $stateParams.wgName;
    vm.shoppinglistName = $stateParams.shoppinglistName;

        vm.items= [
        {name: "Bier", quantity:"2 Sixpacks", addedBy:"Luis"},
        {name: "trockener Weißwein", quantity:"3 Flaschen", addedBy:"Luis"},
        {name: "Sekt", quantity:"2 Flaschen", addedBy:"Luis"},
        {name: "Pfeffi", quantity:"1 Flachmann", addedBy:"Luis"}
    ];

    vm.enableAddingNewItem = function(){
        vm.showNewItem = true;
    };

    vm.addNewItem = function(){
        vm.items.push({
            name: vm.newItem.name,
            quantity: vm.newItem.quantity,
            addedBy: vm.newItem.addedBy
        });
        vm.showNewItem = false;
        vm.newItem = {};
    };

    vm.cancelAddingNewItem = function(){
        vm.showNewItem = false;
        vm.newItem = {};
    };
}]);