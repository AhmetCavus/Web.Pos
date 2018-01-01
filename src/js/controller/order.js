var OrderCtrl = Controllers.controller('OrderCtrl',
        ['$scope', '$log', '$http', 'Rest', 'Data', 'Notification', 'Setting', 'Product', 'Order', 'Sale',
            function($scope, $log, $http, Rest, Data, Notification, Setting, Product, Order, Sale) {
                $scope.data = Data;
                $scope.flash = false;
                $scope.lang = Data.lang.order;
                $scope.product = Product;
                $scope.loading = false;
                Product.getProducts.then(function(products) {
                    $scope.products = products;
                });
                $scope.getOrders = function() {
                    Order.request();
                    Order.getOrders.then(function(orders) {
                        $scope.orders = orders;
                    });
                };
                $scope.getOrders();
                $scope.onRemove = function(order) {
                    $scope.loading = true;
                    var json = {id: order.id};
                    Order.remove(json,
                            function(res) {
                                if (!res.success) {
                                    Notification.showError("Silinemedi", res.error);
                                    return;
                                }
                                Notification.showInfo("Silindi", "");
                                $scope.getOrders();
                            },
                            function(res) {
                                    Notification.showError("Silinemedi", res.error);
                            });
                };
                $scope.onSubmit = function(order) {
                    $scope.loading = true;
                    var json = {id: order.id};
                    Order.remove(json,
                            function(res) {
                                if (!res.success) {
                                    Notification.showError("Bir hata olustu", res.error);
                                    return;
                                }
                                Sale.add(order,
                                    function(res){
                                        $scope.getOrders();
                                        if (!res.success) {
                                            Notification.showError("Bir hata olustu", res.error);
                                            return;
                                        }
                                        Notification.showInfo("Basarili","");
                                    },
                                    function(res){
                                        $scope.getOrders();
                                        Notification.showError("Bir hata olustu", res.error);
                                    });
                            },
                            function(res) {
                                    Notification.showError("Bir hata olustu", res.error);
                            });
                };
            }]);