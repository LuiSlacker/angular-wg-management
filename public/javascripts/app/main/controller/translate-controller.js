app.controller('translateController', ['$scope', '$translate', function($scope, $translate){
    $scope.language = 'DE';
    $scope.changeLanguage = function(key){
        $translate.use(key);
        $scope.language = (key === 'en_US') ? 'EN':'DE';
    }
}]);

