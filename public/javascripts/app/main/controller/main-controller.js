app.controller('ChatController', ['$scope','authService', function($scope, authService){
    $scope.name = '';
    $scope.newlyTypedMessage = '';
    $scope.messages = [];
    $scope.socket = io.connect();
    $scope.socket.on('tweet', function (msg) {
        $scope.messages.push({
            msg: msg.name + ': ' + msg.message,
            class: 'bubble'
        });
        $scope.$apply();
        $('.chat-box-content').scrollTop($('.chat-box-content')[0].scrollHeight);
    });

    $scope.sendMsg = function(){
        $scope.socket.emit('messageSent', {
            name: authService.user.local.username,
            message: $scope.newlyTypedMessage
        });
        $scope.messages.push({
            msg: $scope.newlyTypedMessage,
            class: 'bubble bubble-right'
        });
        $scope.newlyTypedMessage = '';
        $scope.$apply();
        $('.chat-box-content').scrollTop($('.chat-box-content')[0].scrollHeight);
    };

    $('#text').keypress(function (e) {
        if (e.which == 13) {
            $scope.sendMsg();
        }
    });
}]);