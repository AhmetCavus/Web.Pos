'use strict';

/* Directives */

var Directives = angular.module('Directives', []);

Directives.directive('pwCheck', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
                elem.on('keyup', function () {
                        scope.$apply(function () {
                                var p1 = scope.form[attrs.pwCheck].$modelValue;
                                var v = elem.val()=== p1;
                                ctrl.$setValidity('pwmatch', v);
                        });
                });
        }
    };
}]);

Directives.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

Directives.directive('mediachoser', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'view/popup/media_choser.html'
    };
});