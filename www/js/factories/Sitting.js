angular.module('App')
        .factory('Sitting', function (Order) {
          var Class = function () {
            this.active = false;
            this.id = -1;
            this.table = -1;
            this.order = new Order();
          };
          
          return Class;
        });