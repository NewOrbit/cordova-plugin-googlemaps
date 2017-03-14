var q = require('./q');
var cordovaExec = require('cordova/exec');

var queue = q.resolve();

var EnqueuedCordova = {};

EnqueuedCordova.exec = function(success, error, service, action, args) {
    var cordovaDeferred = q.defer();
    queue = queue.then(function() {
        cordovaExec(
            function(result) {
                success && success(result);
                cordovaDeferred.resolve(result);
            }, 
            function(result) { 
                error && error(result);
                cordovaDeferred.resolve(result);
            }, 
            service, action, args
        );
        return cordovaDeferred.promise; 
    });
}

module.exports = EnqueuedCordova;