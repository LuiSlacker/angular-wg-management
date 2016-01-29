/**
 * @ngdoc service
 * @name app.service: profileService
 * @requires $http
 * @requires $log
 * @description
 * service to retrieve Data
 */
app.factory('profileService', ['$http', function($http) {

    return {
        /**
         * @ngdoc method
         * @name updateUser
         * @methodOf app.service: profileService
         * @description  function that updates user credentials
         * @returns {promise} user-object
         */
        updateUser: function(user){
            return $http.put('/users/' + user._id, user);
        }
    };

}]);



