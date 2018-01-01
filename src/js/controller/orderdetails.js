var OrderDetailsCtrl = Controllers.controller('OrderDetailsCtrl',
        ['$scope', '$log', '$http' ,'Rest', 'Data','Notification', 'Setting','Product', 'Order',
            function($scope, $log, $http, Rest, Data, Notification,  Setting, Product, Order) {
                $scope.data = Data;
                $scope.input = { contents : ["Komple"] , options: "Dürüm", packet: "false", name: "", price: 0, ordercount: 1 };
                $scope.flash = false;
                $scope.lang = Data.lang.order;
                $scope.loading = false;
                $scope.selected = Product.selected;
                $scope.contents = $scope.selected.contents.split(",");
                $scope.options = $scope.selected.options.split(",");
                $scope.input.name = $scope.selected.name;
                $scope.input.option = $scope.options[0];
                $scope.input.price = $scope.selected.price;
                $scope.input.pid = $scope.selected.id;
                $scope.onSend = function(){
                    console.log("order",$scope.input);
                    $scope.loading = true;
                    var contents = "";
                    for(var index = 0; index < $scope.input.contents.length; index++){
                        var content = $scope.input.contents[index];
                        if(content === undefined || content === null || content === 'false') continue;
                        contents+= content;
                        contents+= ",";
                    }
                    if($scope.input.options === undefined){
                        $scope.input.options = "";
                    }
                    contents = contents.substring(0,contents.length-1);
                    $scope.input.contents = contents;
                    $scope.input.packet = $scope.input.packet === "true" ? 1 : 0;
                    var count = parseInt($scope.input.ordercount);
                    var price = parseFloat($scope.input.price).toFixed(2);
                    $scope.input.price = price * count;
                    Order.add($scope.input,
                    function(res){
                        if(!res.success){
                            Notification.showError("Gönderilemedi",res.error);
                            return;
                        }
                        Notification.showInfo("Gönderildi","");
                        var scope = angular.element($("#orderId")).scope();
                        scope.getOrders();
                        $scope.loading = false;
                        $scope.ons.navigator.popPage();
                    },
                    function(res){
                        $scope.loading = false;
                        Notification.showError("Gönderilemedi","");
                        $scope.ons.navigator.popPage();
                    });
                };
            }]);
        
        