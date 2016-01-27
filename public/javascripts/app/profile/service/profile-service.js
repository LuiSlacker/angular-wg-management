app.factory('profileService', ['$http', '$log', function($http, $log) {

    return {
        updateUser: function(user){
            return $http.put('/users/' + user._id, user);
        }
    };

}]);



