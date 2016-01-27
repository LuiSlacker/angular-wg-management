app.factory('profileService', ['$http', '$log', function($http, $log) {

    return {
        updateUsername: function(user){
            return $http.put('/users/' + user._id, user);
        },
        updatePassword: function(id, password){
            return $http.put('/users/' + id , {
                password: password
            });
        }
    };

}]);



