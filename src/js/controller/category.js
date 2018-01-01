var CategoryCtrl = Controllers.controller('CategoryCtrl',
        ['$scope', 'Data','Notification', 'Setting', 'Category',
            function($scope, Data, Notification,  Setting, Category) {
                $scope.data = Data;
                $scope.lang = Data.lang.category;
                
                $scope.category = Category;
                
                Category.getCategories.then(function(items){
                   $scope.categories = items; 
                });
                
            }]);
        
        