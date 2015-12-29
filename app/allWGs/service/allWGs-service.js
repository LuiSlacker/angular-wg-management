app.factory('allWGsService', ['$http', '$log', function($http, $log) {


    var o = {
        wgs: []
    };

    o.getAllWGs = function(){
       return $http.get('/wgs').success(function(data){
          angular.copy(data, o.wgs);
       });
    };

    o.create = function(newWG){
        return $http.post('/wgs', newWG).success(function(data){
            o.wgs.push(data);
        })
    };

    return o;
}]);