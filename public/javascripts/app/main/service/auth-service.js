app.factory('authService', ['$http', '$q', function($http, $q){

    var o = {};
    o.user = {};

    o.login = function (user) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'login',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {username: user.username, password: user.password}
        }).success(function(data, status){
            if (status === 200 && data.local){
                o.user = data.local;
                deferred.resolve();
            } else {
                deferred.reject();
            }
        });
        return deferred.promise;
    };
    o.signup = function(user){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'signup',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {username: user.username, password: user.password}
        }).success(function(data, status){
            if (status === 200 && data.local){
                o.user = data.local;
                deferred.resolve();
            } else {
                deferred.reject();
                throw 'err';
            }
        }).error(function(data, status){
            if(status === 401){
                deferred.reject('Not Authorized');
            }

        });
        return deferred.promise;
    };

    o.isLoggedIn = function(){
        if(o.user.username) {
            return true;
        }
        else return false;
    };
    return o;
}]);