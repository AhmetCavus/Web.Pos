var HomeCtrl = Controllers.controller('HomeCtrl',
        ['$scope', '$log', '$http' ,'Rest', 'Data','Notification', 'Setting',
            function($scope, $log, $http, Rest, Data, Notification,  Setting) {
                $scope.data = Data;
                $scope.flash = false;
                $scope.lang = Data.lang.home;
                $scope.onCreateProduct = function(){
                    Notification.showInfo("Gelecek sürümlerde","");
                };
            }]);
        
        