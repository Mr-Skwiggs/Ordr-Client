angular.module('controllers').controller('HomeCtrl', function ($scope, $http, $timeout, $ionicLoading, $ionicPopup, Sitting, ModalService) {

  var sitting = Sitting.new();
  $scope.sitting = sitting;
//  sitting.active = true;

  $scope.server = {
    ip: 'Loading...',
    menu: 'Loading, too...'
  };

  $scope.showModal = function () {
    ModalService
            .initNoDismiss('server-check.html', $scope)
            .then(function (modal) {
              console.log(modal);
              modal.show();
            });
  };
  
  console.log($scope);

  $http.get('http://192.168.1.30:50505/client/authed')
          .then(function (response) {
            $scope.server.ip = '192.168.1.30';
          }, function (response) {
            $scope.server.ip = 'Error';
            console.log(response);
          });

  $http.get('http://192.168.1.30:50505/client/menu')
          .then(function (response) {
            $scope.server.menu = response.data.length;
            console.log(response);
//            alert(response);
          }, function (response) {
//            alert(response);
          });

//  $ionicModal.fromTemplateUrl('../modals/server-check.html', {
//    scope: $scope,
//    animation: 'slide-in-up'
//  }).then(function(modal){
//    $scope.modals.serverCheck = modal;
//    console.log('modal loaded');
//  });
//  
//  $scope.modals.serverCheck.show();
//  var comment = {
//    message: '',
//    rating: 5
//  };
//  $scope.comment = angular.copy(comment);
//
//  $scope.sendComments = function () {
//    // Send comment
//    $scope.cancelComments();
//    $ionicPopup.alert({
//      title: 'Thank you!',
//      template: 'We appreciate your comments!',
//      okText: 'Close'
//    });
//  };
//
//  $scope.cancelComments = function () {
//    $scope.comment = angular.copy(comment);
//    $scope.modal.hide();
//  };
//
//  $scope.openComments = function() {
//    $ionicModal.fromTemplateUrl('views/home/comments.html', {
//      scope: $scope,
//      animation: 'slide-in-up'
//    }).then(function(modal) {
//      $scope.modal = modal;
//      $scope.modal.show();
//    });
//  };
//
//  //Cleanup the modal when we're done with it!
//  $scope.$on('$destroy', function() {
//    if ($scope.modal) {
//      $scope.modal.remove();
//    }
//  });
//
//  $http.get('http://api.openweathermap.org/data/2.5/weather?q=Brussels, BE&units=metric').success(function (data) {
//    $scope.weather = data;
//  });
});
