/**
 * @ngdoc service
 * @name app.service: singleWGService
 * @requires $http
 * @requires $log
 * @description
 * service to interact with all shoppinglist REST routes
 */
app.factory('singleWGService', ['$http', '$log', function($http, $log) {

    var o = {
        shoppinglists: []
    };

    /**
     * @ngdoc method
     * @name getAllShoppinglists
     * @methodOf app.service: singleWGService
     * @description  function that retrieves all shoppinglists for a wg
     * @param {number} wgID the id of a wg
     * @returns {promise} all shoppinglists
     */
    o.getAllShoppinglists = function(wgId){
       return $http.get('/wgs/'+ wgId + '/shoppinglists').success(function(data){
          angular.copy(data, o.shoppinglists);
       });
    };

    /**
     * @ngdoc method
     * @name getSingleShoppinglist
     * @methodOf app.service: singleWGService
     * @description  function that retrieves a single shoppinglist for a wg
     * @param {number} wgID the id of a wg
     * @param {number} shoppinglistId the id of a shoppinglist
     * @returns {promise} single shoppinglist
     */
    o.getSingleShoppinglist = function(wgId, shoppinglistId){
      return $http.get('/wgs/'+ wgId + '/shoppinglists/'+ shoppinglistId);
    };

    /**
     * @ngdoc method
     * @name createShoppinglist
     * @methodOf app.service: singleWGService
     * @description  function that creates a single shoppinglist for a wg
     * @param {number} wgID the id of a wg
     * @param {object} newShoppinglist the new shoppinglist
     * @returns {promise} shoppinglist
     */
    o.createShoppinglist = function(wgId, newShoppinglist){
        return $http.post('/wgs/'+ wgId + '/shoppinglists', newShoppinglist).success(function(data){
            o.shoppinglists.push(data);
        })
    };

    /**
     * @ngdoc method
     * @name updateShoppinglist
     * @methodOf app.service: singleWGService
     * @description  function that updates a single shoppinglist within a wg
     * @param {number} wgID the id of a wg
     * @param {number} shoppinglistId the id of a shoppinglist
     * @param {object} shoppinglist the updated shoppinglist
     * @returns {promise} updated shoppinglist
     */
    o.updateShoppinglist = function(wgID, shoppinglistId, shoppinglist){
        return $http.put('/wgs/' + wgID + '/shoppinglists/' + shoppinglistId, shoppinglist);
    };

    /**
     * @ngdoc method
     * @name deleteShoppinglist
     * @methodOf app.service: singleWGService
     * @description  function that deletes a single shoppinglist for a wg
     * @param {number} wgID the id of a wg
     * @param {number} shoppinglistId the id of a shoppinglist
     * @returns {promise} -
     */
    o.deleteShoppinglist = function(wgId, shoppinglistId){
        return $http.delete('/wgs/'+ wgId + '/shoppinglists/' + shoppinglistId);
    };

    return o;
}]);



