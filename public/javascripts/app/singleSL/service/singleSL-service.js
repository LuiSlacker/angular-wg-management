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

    return o;
}]);