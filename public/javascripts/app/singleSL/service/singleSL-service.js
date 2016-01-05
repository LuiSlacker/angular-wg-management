app.factory('singleSLService', ['$http', function($http){
    var o = {
        items: []
    };

    o.getAllItems = function(wgID, shoppinglistId){
      return $http.get('/wgs/' + wgID + '/shoppinglists/' + shoppinglistId + '/items').success(function(data){
          angular.copy(data, o.items);
      });
    };

    o.createItem = function(wgID, shoppinglistId, newItem){
      return $http.post('/wgs/' + wgID + '/shoppinglists/' + shoppinglistId + '/items', newItem).success(function(data){
          o.items.push(data);
      });
    };

    o.updateItem = function(wgID, shoppinglistId, itemID, item){
        return $http.put('/wgs/' + wgID + '/shoppinglists/' + shoppinglistId + '/items/' + itemID, item);
    };

    o.deleteItem = function(wgID, shoppinglistId, itemID){
      return $http.delete('/wgs/' + wgID + '/shoppinglists/' + shoppinglistId + '/items/' + itemID)
    };

    return o;
}]);