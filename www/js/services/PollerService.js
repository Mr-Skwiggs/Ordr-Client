angular.module('App')
        .service('Poller', function ($rootScope) {

          var runningIntervals = [];

          this.run = function (name, func, everyMillis) {
            var newItvl = {
              id: '',
              name: name,
              func: func,
              loopTime: everyMillis
            };
            newItvl.id = setInterval(func, everyMillis);
            runningIntervals.push(newItvl);
          };
          
          this.removeAll = function() {
            stopAll();
            delete runningIntervals;
            runningIntervals = [];
          };
          
          this.removeInterval = function(name){
            for(var i = 0; i < runningIntervals.size; ++i){
              if(runningIntervals[i].name === name){
                stop(runningIntervals[i].id);
                runningIntervals.splice(i, 1);
                break;
              }
            }
          };
          
          function stop(interval){
            clearInterval(interval);
          }
          
          function stopAll(){
            var count = 0;
            var stoppedItvls = ' (';
            for(var i = 0; i < runningIntervals.length; ++i){
              clearInterval(runningIntervals[i].id);
              stoppedItvls += runningIntervals[i].id + ', ';
              ++count;
            }
            stoppedItvls = stoppedItvls.substr(0, stoppedItvls.length - 2) + ')';
            console.log(count + ' intervals stopped' + stoppedItvls);
          }
          
          function startAll(){
            var count = 0;
            for(var i = 0; i < runningIntervals.length; ++i){
              runningIntervals[i].id = setInterval(runningIntervals[i].func, runningIntervals[i].loopTime);
              ++count;
            }
            console.log(count + ' intervals started');
          }
          
          $rootScope.$on('API:connection:lost', function(){
            stopAll();
          });
          
          $rootScope.$on('API:checkServerStatus:online', function(){
            startAll();
          });
        });