angular.module('App')
        .factory('Order', function () {
          var Class = function () {
            this.id = null;
            this.items = [];
            this.state = null;
          };
          
          Class.prototype.active = function(){
            return this.state !== null || this.state === 'ended';
          };
          
          return Class;
        });