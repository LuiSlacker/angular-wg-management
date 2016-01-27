describe('wg-managementApp', function () {
    var $rootScope,
        $scope,
        controller;

    beforeEach(function(){
        module('app');

        /*inject(function($injector){
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            controller = $injector.get('$controller')("singleSLController", {$scope:scope});
        });*/
    });

    it('should be true', function () {
        expect(true).toBe(true);
    });

    describe('singleSL-controller', function(){

        it('should be true', function () {
            expect(true).toBe(true);
        });
        /*var singleSLController;
        beforeEach(inject(function(_singleSLController_){
            singleSLController = _singleSLController_;

        }));

        it('should be defined', (function(){
            expect(singleSLController).toBeDefined();
        }));*/
    });

});