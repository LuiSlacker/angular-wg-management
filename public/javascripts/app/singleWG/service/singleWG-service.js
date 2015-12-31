app.factory('singleWGService', ['$http', '$log', function($http, $log) {

    var o = {
        shoppinglists: []
    };

    o.getAllShoppinglists = function(wgId){
       return $http.get('/wgs/'+ wgId + '/shoppinglists').success(function(data){
          angular.copy(data, o.shoppinglists);
       });
    };

    o.createShoppinglist = function(wgId, newShoppinglist){
        return $http.post('/wgs/'+ wgId + '/shoppinglists', newShoppinglist).success(function(data){
            o.shoppinglists.push(data);
        })
    };

    o.deleteShoppinglist = function(wgId, shoppinglistId){
        return $http.delete('/wgs/'+ wgId + '/shoppinglists/' + shoppinglistId);
    };

    return o;
}]);



