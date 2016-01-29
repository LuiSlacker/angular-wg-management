/**
 * @ngdoc service
 * @name app.service: authService
 * @requires $http
 * @requires $q
 * @description
 * This service is entirely responsible for the authentication process.
 * Login / Signup and providing a user object to the entire app<br>
 *
 */
app.factory('authService', ['$http', '$q', function($http, $q){

    var o = {};
    o.user = {};

    /**
     * @ngdoc method
     * @name login
     * @methodOf app.service: profileService
     * @description  function to log in user<br/>
     * When the username matches one in the database and the calucalted password hash matches with the one persisted
     * the user will successfully log in and will be redirected to the allWGs state
     * @param {object} an user object with username and password keys
     * @returns {promise} user object
     */
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
                o.user = data;
                deferred.resolve();
            } else {
                deferred.reject();
            }
        });
        return deferred.promise;
    };
    /**
     * @ngdoc method
     * @name signup
     * @methodOf app.service: profileService
     * @description  function to sign up user
     * @para, {object} an user object with username and password keys
     * @returns {promise} user object
     */
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
                o.user = data;
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

    o.facebookSignup = function(){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/auth/facebook'
        }).success(function(data, status){
            if (status === 200 && data.facebook){
                o.user = data.facebook;
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

    /**
     * @ngdoc method
     * @name isLoggedIn
     * @methodOf app.service: authService
     * @description  function that checks whether user object exists or not.
     * @returns {boolean} user is logged in or not
     */
    o.isLoggedIn = function(){
        if(o.user.local && o.user.local.username) {
            return true;
        }
        else return false;
    };

    /**
     * @ngdoc method
     * @name setUser
     * @methodOf app.service: authService
     * @description  function that sets a user object to this global service
     * @param {object} user complete user object
     */
    o.setUser = function(user){
        o.user = user;
    };

    return o;
}]);