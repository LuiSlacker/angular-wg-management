/**
 * @ngdoc service
 * @name app.service: singleSLService
 * @requires $http
 * @description
 * service to interact with all item REST routes
 */
app.factory('singleSLService', ['$http', function($http){
    var o = {
        items: []
    };

    /**
     * @ngdoc method
     * @name getAllItems
     * @methodOf app.service: singleSLService
     * @description  function that retrieves all items from a certain shoppinglist
     * @param {number} wgID the id of a wg
     * @param {number} shoppinglistId the id of a shoppinglist
     * @returns {promise} all items
     */
    o.getAllItems = function(wgID, shoppinglistId){
      return $http.get('/wgs/' + wgID + '/shoppinglists/' + shoppinglistId + '/items').success(function(data){
          angular.copy(data, o.items);
      });
    };

    /**
     * @ngdoc method
     * @name createItem
     * @methodOf app.service: singleSLService
     * @description  function that creates an item for a  certain shoppinglist
     * @param {number} wgID the id of a wg
     * @param {number} shoppinglistId the id of a shoppinglist
     * @param {object} newItem the new item
     * @returns {promise} the new item
     */
    o.createItem = function(wgID, shoppinglistId, newItem){
      return $http.post('/wgs/' + wgID + '/shoppinglists/' + shoppinglistId + '/items', newItem).success(function(data){
          o.items.push(data);
      });
    };

    /**
     * @ngdoc method
     * @name updateItem
     * @methodOf app.service: singleSLService
     * @description  function that update an item for a  certain shoppinglist
     * @param {number} wgID the id of a wg
     * @param {number} shoppinglistId the id of a shoppinglist
     * @param {object} newItem the new item
     * @returns {promise} the updated item
     */
    o.updateItem = function(wgID, shoppinglistId, itemID, item){
        return $http.put('/wgs/' + wgID + '/shoppinglists/' + shoppinglistId + '/items/' + itemID, item);
    };

    /**
     * @ngdoc method
     * @name deleteItem
     * @methodOf app.service: singleSLService
     * @description  function that deletes an item for a  certain shoppinglist
     * @param {number} wgID the id of a wg
     * @param {number} shoppinglistId the id of a shoppinglist
     * @param {number} itemID the id of an item
     * @returns {promise} -
     */
    o.deleteItem = function(wgID, shoppinglistId, itemID){
      return $http.delete('/wgs/' + wgID + '/shoppinglists/' + shoppinglistId + '/items/' + itemID)
    };

    return o;
}]);