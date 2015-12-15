/**
 * Created by petulantslacker on 12/12/15.
 */
app.controller('allWGsController', function(){
    var vm = this;

    vm.showNewItem = false;
    vm.wgs= [
        {name: "Simon-Dach-Buddies", street:"Simon-Dach-Straße", city:"Berlin"},
        {name: "The Flying FHainers",street:"Boxhagener-Straße", city:"Berlin"},
        {name: "Simon-Dach-Buddies", city:"Berlin"},
        {name: "Simon-Dach-Buddies", city:"Berlin"},
        {name: "Simon-Dach-Buddies", city:"Berlin"}
    ];

    vm.newItem = function(){
        vm.showNewItem = true;
    };

    vm.addNewWG = function(){
        vm.wgs.push({
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
});