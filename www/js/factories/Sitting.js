angular.module('App')
	.factory('Sitting', function (Order) {
		var Class = function () {
			this.active = false;
			this.id = -1;
			this.table = -1;
			this.order = new Order();
		};

		Class.prototype.sitDown = function (id, table) {
			this.active = true;
			this.id = id;
			this.table = table;
		};

		return Class;
	});
