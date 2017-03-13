var q = require('./q');
var cordovaExec = require('cordova/exec');

var queue = q.resolve();

var EnqueuedCordova = {};

EnqueuedCordova.exec = function(success, error, service, action, args) {
    var cordovaDeferred = q.defer();
    cordovaExec(
        function(result) { 
            cordovaDeferred.resolve(result);
            success(result);
        }, 
        function(result) { 
            cordovaDeferred.resolve(result);
            error(result);
        }, 
        service, action, args);
    queue = queue.then(function() { return cordovaDeferred.promise; });
}

module.exports = EnqueuedCordova;