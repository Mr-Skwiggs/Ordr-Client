angular.module('App')
        .service('ModalService', function ($ionicModal, $rootScope) {
          
          var modals = [
    
          ];

          var init = function (path, $scope) {

            var promise;
            $scope = $scope || $rootScope.$new();
            path = 'modals/' + path;
//            console.log(path);

            promise = $ionicModal.fromTemplateUrl(path, {
              scope: $scope,
              animation: 'slide-in-up'
            }).then(function (modal) {
              $scope.modal = modal;
              return modal;
            });

            $scope.openModal = function () {
              $scope.modal.show();
            };
            $scope.closeModal = function () {
              $scope.modal.hide();
            };
            $scope.$on('$destroy', function () {
              $scope.modal.remove();
            });

            return promise;
          };

          var initNoDismiss = function (path, $scope) {

            var promise;
            $scope = $scope || $rootScope.$new();
            path = 'modals/' + path;
            console.log(path);

            promise = $ionicModal.fromTemplateUrl(path, {
              scope: $scope,
              animation: 'slide-in-up',
              backdropClickToClose: false
            }).then(function (modal) {
              $scope.modal = modal;
              return modal;
            });

            $scope.openModal = function () {
              $scope.modal.show();
            };
            $scope.closeModal = function () {
              $scope.modal.hide();
            };
            $scope.$on('$destroy', function () {
              $scope.modal.remove();
            });

            return promise;
          };

          return {
            init: init,
            initNoDismiss: initNoDismiss
          };

        });