app.factory('singleWGService', ['$http', '$log', function($http, $log) {

    var o = {
        shoppinglists: []
    };

    o.getAllShoppinglists = function(wgId){
       return $http.get('/wgs/'+ wgId + '/shoppinglists').success(function(data){
          angular.copy(data, o.shoppinglists);
       });
    };

    o.getSingleShoppinglist = function(wgId, shoppinglistId){
      return $http.get('/wgs/'+ wgId + '/shoppinglists/'+ shoppinglistId);
    };

    o.createShoppinglist = function(wgId, newShoppinglist){
        return $http.post('/wgs/'+ wgId + '/shoppinglists', newShoppinglist).success(function(data){
            o.shoppinglists.push(data);
        })
    };

    o.updateShoppinglist = function(wgID, shoppinglistId, shoppinglist){
        return $http.put('/wgs/' + wgID + '/shoppinglists/' + shoppinglistId, shoppinglist);
    };

    o.deleteShoppinglist = function(wgId, shoppinglistId){
        return $http.delete('/wgs/'+ wgId + '/shoppinglists/' + shoppinglistId);
    };

    return o;
}]);



