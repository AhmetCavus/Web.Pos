'use strict';

/* Filters */

var Filters = angular.module('Filters', []);

Filters.filter('checkmark', function() {
    return function(input) {
        return input ? '\u2713' : '\u2718';
    };
});

Filters.filter('boolToValue', function() {
    return function(bool, valTrue, valFalse) {
        if (bool === 'true' || bool === true) {
            return valTrue;
        }
        return valFalse;
    };
});

Filters.filter('dateToTime', function() {
    return function(date) {
        var tmp = date.split(" ");
        var d = tmp[0].split("-");
        var t = tmp[1].split(":");
        var year = parseInt(d[0]);
        var month = parseInt(d[1])-1;
        var day = parseInt(d[2]);
        var hour = parseInt(t[0]);
        var minute = parseInt(t[1]);
        var second = parseInt(t[2]);
        d = new Date(year,month,day,hour,minute,second,0);
        var now = Date.now();
        var dLong = d.getTime();
        var res = now - dLong;
        var time = { hour: 0, minute: 0, second: 0 };
        time.hour = parseInt((res / 1000 / 60 / 60) % 60);
        time.minute = parseInt((res / 1000 / 60) % 60);
        time.second = parseInt((res / 1000) % 60);
        return time;
    };
});

Filters.filter('readableDate', function() {
    return function(date) {
        var tmp = date.split(" ");
        var d = tmp[0].split("-");
        var year = parseInt(d[0]);
        var month = parseInt(d[1]);
        var day = parseInt(d[2]);
        return day + "." + month + "." + year;
    };
});
