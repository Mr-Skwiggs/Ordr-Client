angular.module('App')
	.service('SilentServerChecker', function (API) {
		var running = false;
		var interval;

		this.disable = function () {
			if (running) {
				clearInterval(interval);
				interval = null;
				running = false;
			}
		};

		this.enable = function () {
			if (!running) {
				interval = setInterval(function () {
					API.checkServerStatus(null, true);
				}, 10000);
				running = true;
			}
		};

		this.toggle = function () {
			if (running) {
				disable();
			} else {
				enable();
			}
		};
	});
