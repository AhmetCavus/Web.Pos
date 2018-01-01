var OrderCtrl = Controllers.controller('SalesCtrl',
        ['$scope', '$log', '$http' ,'Rest', 'Data','Notification', 'Setting', 'Sale',
            function($scope, $log, $http, Rest, Data, Notification,  Setting, Sale) {
                $scope.data = Data;
                $scope.flash = false;
                $scope.lang = Data.lang.category;
                Sale.requestDates();
                Sale.getDates.then(function(res){
                   $scope.dates = res; 
                });
            }]);
        
        