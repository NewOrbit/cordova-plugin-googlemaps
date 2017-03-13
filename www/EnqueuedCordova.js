var q = require('./q');
var cordovaExec = require('./enqueuedCordova/exec');

var enqueuedCordova = function() {

    var queue = q.fcall(function() {});

    var exec = function(success, error, service, action, args) {
        queue = queue.then(function() { 
            cordovaExec(success, error, service, action, args); 
        });
    }
}

module.exports = enqueuedCordova;