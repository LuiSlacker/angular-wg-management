/**
 * @ngdoc service
 * @name app.service: allWGsService
 * @requires $http
 * @requires $log
 * @description
 * service to retrieve Data
 */
app.factory('allWGsService', ['$http', '$log', function($http, $log) {

    var o = {
        wgs: []
    };

    /**
     * @ngdoc method
     * @name getAllWGs
     * @methodOf app.service: allWGsService
     * @description  function that retrieves all wgs
     * @returns {promise} all wgs
     */
    o.getAllWGs = function(){
       return $http.get('/wgs').success(function(data){
          angular.copy(data, o.wgs);
       });
    };

    /**
     * @ngdoc method
     * @name getAllWGs
     * @methodOf app.service: allWGsService
     * @description  function that retrieves a single wg
     * @param {number} wgID the id of a wg
     * @returns {promise} single wg
     */
    o.getSingleWG = function(wgID){
      return $http.get('/wgs/' + wgID);
    };

    /**
     * @ngdoc method
     * @name create
     * @methodOf app.service: allWGsService
     * @description  function that creates a single wg
     * @param {object} newWG the new wg
     * @returns {promise} new wg
     */
    o.create = function(newWG){
        return $http.post('/wgs', newWG).success(function(data){
            o.wgs.push(data);
        })
    };

    /**
     * @ngdoc method
     * @name getAllWGs
     * @methodOf app.service: allWGsService
     * @description  function that deletes a single wg
     * @param {number} id the id of a wg
     * @returns {promise} -
     */
    o.delete = function(id){
        return $http.delete('/wgs/' + id);
    };

    /**
     * @ngdoc method
     * @name update
     * @methodOf app.service: allWGsService
     * @description  function that updates a single wg
     * @param {number} wgID the id of a wg
     * @param {object} wg the updated wg
     * @returns {promise} the updated wg
     */
    o.update = function(wgID, wg){
        return $http.put('/wgs/' + wgID, wg);
    };

    /**
     * @ngdoc method
     * @name registerForWG
     * @methodOf app.service: allWGsService
     * @description  function that registers a user with a wg
     * @param {number} wgID the id of a wg
     * @param {number} userID the id of the user to be registered
     * @returns {promise} -
     */
    o.registerForWG = function(wgID, userID){
        return $http.put('/wgs/'+ wgID + "/members/" + userID)
    };

    /**
     * @ngdoc method
     * @name unRegisterForWG
     * @methodOf app.service: allWGsService
     * @description  function that unregisters a user from a wg
     * @param {number} wgID the id of a wg
     * @param {number} userID the id of the user to be registered
     * @returns {promise} -
     */
    o.unRegisterForWG = function(wgID, userID){
        return $http.delete('/wgs/'+ wgID + "/members/" + userID)
    };

    /**
     * @ngdoc method
     * @name unRegisterForWG
     * @methodOf app.service: allWGsService
     * @description  function that retrieves all members from a wg
     * @returns {promise} all members
     */
    o.getAllMembers = function(wgID){
        return $http.get('/wgs/'+ wgID + "/members/")
    };

    return o;
}]);



