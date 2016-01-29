/**
 * @ngdoc controller
 * @name app.controller: singleWGController
 * @requires $stateParams
 * @requires $state
 * @requires singleWGService
 * @requires allWGsService
 * @requires authService
 * @description
 * The controller to handle all shoppinglist related stuff
 */
app.controller('singleWGController', ['$stateParams',
    '$state',
    'singleWGService',
    'allWGsService',
    'authService', function ($stateParams,
                             $state,
                             singleWGService,
                             allWGsService,
                             authService) {

        // config ====================================================================
        var vm = this;
        vm.showNewItem = false;
        vm.wgID = $stateParams.wgID;
        vm.shoppinglists = singleWGService.shoppinglists;
        singleWGService.getAllShoppinglists(vm.wgID);
        vm.user = authService.user;

        allWGsService.getAllMembers(vm.wgID).success(function (data) {
            vm.members = data;
        });

        // controller functions ======================================================
        allWGsService.getSingleWG(vm.wgID).success(function (data) {
            vm.wg = data;
        });

        vm.newItem = function () {
            vm.showNewItem = true;
        };

        vm.addNewShoppinglist = function () {
            vm.newShoppinglist.wg = vm.wgID;
            vm.newShoppinglist.initiator = authService.user.local.username;
            singleWGService.createShoppinglist(vm.wgID, vm.newShoppinglist);
            vm.showNewItem = false;
            vm.newShoppinglist = {};
        };

        vm.cancelAddingNewShoppinglist = function () {
            vm.showNewItem = false;
            vm.newShoppinglist = {};
        };

        vm.updateShoppinglist = function (shoppinglistId, data) {
            singleWGService.updateShoppinglist(vm.wgID, shoppinglistId, data).success(function (data) {
                singleWGService.getAllShoppinglists(vm.wgID);
            });
        };

        vm.deleteShoppinglist = function (shoppinglistId) {
            singleWGService.deleteShoppinglist(vm.wgID, shoppinglistId).success(function () {
                singleWGService.getAllShoppinglists(vm.wgID);
            });
        };

        vm.unRegisterFromWg = function () {
            allWGsService.unRegisterForWG(vm.wgID, authService.user._id).success(function (data) {
                authService.user = data;
                $state.go('app.wgs');
            });
        };

    }]);