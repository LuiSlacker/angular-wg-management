app.factory('allWGsService', ['$http', '$log', function($http, $log) {

    var o = {
        wgs: []
    };

    o.getAllWGs = function(){
       return $http.get('/wgs').success(function(data){
          angular.copy(data, o.wgs);
       });
    };

    o.getSingleWG = function(wgID){
      return $http.get('/wgs/' + wgID);
    };

    o.create = function(newWG){
        return $http.post('/wgs', newWG).success(function(data){
            o.wgs.push(data);
        })
    };

    o.delete = function(id){
        return $http.delete('/wgs/' + id);
    };

    o.update = function(wgID, wg){
        return $http.put('/wgs/' + wgID, wg);
    };

    o.registerForWG = function(wgID, userID){
        return $http.put('/wgs/'+ wgID + "/members/" + userID)
    };

    o.unRegisterForWG = function(wgID, userID){
        return $http.delete('/wgs/'+ wgID + "/members/" + userID)
    };

    o.getAllMembers = function(wgID){
        return $http.get('/wgs/'+ wgID + "/members/")
    };

    return o;
}]);



