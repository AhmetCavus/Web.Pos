var ObserveCtrl = Controllers.controller('ObserveCtrl',
        ['$scope', '$log', '$http', 'Rest', 'Data', 'Notification', 'Setting', 'Product', 'Order', 'Category',
            function($scope, $log, $http, Rest, Data, Notification, Setting, Product, Order, Category) {
                $scope.time = 0;
                $scope.data = Data;
                $scope.flash = false;
                $scope.lang = Data.lang.order;
                $scope.loading = false;
                $scope.orders = [];
                Order.requestWithCid(Category.selected.id);
                Order.getOrders.then(function(orders) {
                    $scope.orders = orders;
                    observe();
                });
                function observe() {
                    Order.requestTimestamp();
                    Order.getTimestamp.then(function(t) {
                        if ($scope.time >= t) {
                            setTimeout(function() {
                                observe();
                            }, 3000);
                            return;
                        }
                        $scope.time = t;
                        getOrders();
                    });
                }
                ;
                function getOrders() {
                    Order.requestWithCid(Category.selected.id);
                    Order.getOrders.then(function(orders) {
                        try {
                            if ($scope.orders.length < orders.length) {
                                Notification.showInfo("Yeni siparis", "");
                            } else if ($scope.orders.length > orders.length) {
                                Notification.showInfo("Siparis silindi", "");
                            }
                            $scope.orders = orders;
                            setTimeout(function() {
                                observe();
                            }, 3000);
                        } catch (err) {
                            setTimeout(function() {
                                observe();
                            }, 3000);
                        }
                    });
                }
            }]);