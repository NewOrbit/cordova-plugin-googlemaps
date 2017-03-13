var q = require('./q');
var cordovaExec = require('cordova/exec');

var queue = q.resolve();

var EnqueuedCordova = {};

EnqueuedCordova.exec = function(success, error, service, action, args) {
    queue = queue.then(function() { 
        cordovaExec(success, error, service, action, args); 
    });
}

module.exports = EnqueuedCordova;