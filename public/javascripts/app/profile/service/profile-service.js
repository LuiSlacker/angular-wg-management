app.factory('profileService', ['$http', '$log', function($http, $log) {

    return {
        updateUsername: function(id, username){
            return $http.put('/users/' + id , {
                username: username
            });
        },
        updatePassword: function(id, password){
            return $http.put('/users/' + id , {
                password: password
            });
        }
    };

}]);



