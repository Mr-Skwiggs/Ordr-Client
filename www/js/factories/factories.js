angular.module('App')
        .factory('Sitting', function () {
          var Class = function () {
            this.active = false;
            this.id = -1;
            this.table = -1;
          };

          return {
            new : function () {
              return new Class();
            },
            end: function () {
              console.log('End sitting plz');
            }
          };
        });