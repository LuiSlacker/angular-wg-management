/**
 * @ngdoc controller
 * @name app.controller: allWGsController
 * @requires $location
 * @requires $state
 * @requires allWGsService
 * @requires authService
 * @description
 *  This controller is responsible for displaying all WGs
 */
app.controller('allWGsController', ['$location','$state','allWGsService','authService', function($location, $state, allWGsService, authService){

    // config ===============================================================
    var vm = this;
    vm.showNewItem = false;
    vm.wgs = allWGsService.wgs;
    allWGsService.getAllWGs();
    vm.user = authService.user;

    // controller functions ==================================================
    vm.newItem = function(){
        vm.showNewItem = true;
    };

    /**
     * @ngdoc method
     * @name addNewWG
     * @methodOf app.controller: allWGsController
     * @description  function that adds a new wg <br>
     */
    vm.addNewWG = function(){
        allWGsService.create({
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

    /**
     * @ngdoc method
     * @name deleteWG
     * @methodOf app.controller: allWGsController
     * @description  function that deletes a wg
     */
    vm.deleteWG = function(id){
        allWGsService.delete(id).then(
            allWGsService.getAllWGs()
        );
    };

    /**
     * @ngdoc method
     * @name updateWG
     * @methodOf app.controller: allWGsController
     * @description  function that updates a wg
     */
    vm.updateWG = function(wgID, data){
        allWGsService.update(wgID, data).success(function(data){
            allWGsService.getAllWGs();
        });
    };

    /**
     * @ngdoc method
     * @name registerForWg
     * @methodOf app.controller: allWGsController
     * @description  function that registers a user for a wg
     */
    vm.registerForWg = function(wgID){
        allWGsService.registerForWG(wgID,authService.user._id).success(function(data){
            authService.user = data;
            $state.go('app.wg',{wgID:wgID});
        });
    };
}]);