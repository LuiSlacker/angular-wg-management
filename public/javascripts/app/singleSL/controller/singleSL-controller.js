/**
 * @ngdoc controller
 * @name app.controller: singleSLController
 * @requires $stateParams
 * @requires singleSLService
 * @requires singleWGService
 * @requires allWGsService
 * @requires authService
 * @description
 * The controller to handle all item related stuff
 */
app.controller('singleSLController', ['$stateParams',
    'singleSLService',
    'singleWGService',
    'allWGsService',
    'authService', function ($stateParams,
                             singleSLService,
                             singleWGService,
                             allWGsService,
                             authService) {
        var vm = this;
        vm.wgID = $stateParams.wgID;
        vm.shoppinglistID = $stateParams.shoppinglistID;
        vm.showNewItem = false;
        vm.items = singleSLService.items;
        singleSLService.getAllItems(vm.wgID, vm.shoppinglistID);

        singleWGService.getSingleShoppinglist(vm.wgID, vm.shoppinglistID).success(function (data) {
            vm.shoppinglist = data;
        });
        allWGsService.getSingleWG(vm.wgID).success(function (data) {
            vm.wg = data;
        });

        vm.enableAddingNewItem = function () {
            vm.showNewItem = true;
        };

        vm.addNewItem = function () {
            vm.newItem.shoppinglist = vm.shoppinglistID;
            vm.newItem.addedby = authService.user.local.username;
            singleSLService.createItem(vm.wgID, vm.shoppinglistID, vm.newItem);
            vm.showNewItem = false;
            vm.newItem = {};
        };

        vm.cancelAddingNewItem = function () {
            vm.showNewItem = false;
            vm.newItem = {};
        };

        vm.updateItem = function (itemID, data) {
            singleSLService.updateItem(vm.wgID, vm.shoppinglistID, itemID, data).success(function (data) {
                singleSLService.getAllItems(vm.wgID, vm.shoppinglistID);
            });
        };

        vm.purchaseItem = function (itemID) {
            singleSLService.updateItem(vm.wgID, vm.shoppinglistID, itemID, {
                "purchased": "true",
                "purchasedby": authService.user.local.username
            }).success(function (data) {
                singleSLService.getAllItems(vm.wgID, vm.shoppinglistID);
            });
        };

        vm.deleteItem = function (itemID) {
            singleSLService.deleteItem(vm.wgID, vm.shoppinglistID, itemID).success(function () {
                singleSLService.getAllItems(vm.wgID, vm.shoppinglistID);
            });
        }
    }]);