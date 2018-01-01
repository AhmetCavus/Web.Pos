'use strict';

/* Services */

var Services = angular.module('Services', ['ngResource']);

//var baseUrl = "http://192.168.0.11:9090/WebPosServer/";
var baseUrl = "http://cinarsoft.net/rest/webpos/";

Services.factory('Rest', ['$resource','$http',
    function($resource,$http) {
        var rest = {  };
        rest.resQuery = 
            $resource('data/:path', {}, {
            queryArr: {method: 'GET', params: {path: ''}, isArray: true},
            queryObj: {method: 'GET', params: {path: ''}, isArray: false},
        });
        
        rest.get = function(url, onSuccess, onFail){
            $http({
                method: 'GET',
                url: url,
                data: param,
                headers: {
//                            'Origin': 'chrome-extension://hgmloofddffdnphfgcellkdfbfbjeloo',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': '*/*'
                }
            })
            .success(onSuccess)
            .error(onFail);
        };
        
        rest.post = function(url, param, onSuccess, onFail){
            $http({
                method: 'POST',
                url: url,
                data: param,
                headers: {
//                            'Origin': 'chrome-extension://hgmloofddffdnphfgcellkdfbfbjeloo',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': '*/*'
                }
            })
            .success(onSuccess)
            .error(onFail);
        };
        return rest;
    }]);

Services.factory('Data', ['$q', '$http', 'Rest', function($q, $http, Rest) {
        var data = {};
        data.lang = lang;
        return data;
    }]);


Services.factory('Notification', function() {
    return new Notification();
});

Services.factory('Category', ['$q', '$http', 'Rest', function($q, $http, Rest) {
        var category = {};
        
        category.request = function(){
            var d = $q.defer();
            category.getCategories = d.promise;
            $http({method: 'GET', url: baseUrl + 'categories/' + lang.code}).
                success(function(result, status, headers, config) {
                    category.categories = result.res;
                    d.resolve(category.categories);
                }).
                error(function(data, status, headers, config) {
                    d.reject();
                });
        };
        category.request();
        return category;
    }]);

Services.factory('Product', ['$q', '$http', 'Rest', function($q, $http, Rest) {
        var product = {};
        
        product.request = function(){
            var d = $q.defer();
            product.getProducts = d.promise;
            $http({method: 'GET', url: baseUrl + 'products/' + lang.code}).
                success(function(result, status, headers, config) {
                    product.products = result.res;
                    d.resolve(product.products);
                }).
                error(function(data, status, headers, config) {
                    d.reject();
                });
        };
        product.request();
        return product;
    }]);

Services.factory('Order', ['$q', '$http', 'Rest', function($q, $http, Rest) {
        var order = {};
        
        order.request = function(){
            var d = $q.defer();
            order.getOrders = d.promise;
            $http({method: 'GET', url: baseUrl + 'orders/' + lang.code}).
                success(function(result, status, headers, config) {
                    order.orders = result.res;
                    d.resolve(order.orders);
                }).
                error(function(data, status, headers, config) {
                    d.reject();
                });
        };
        order.requestWithCid = function(cid){
            var d = $q.defer();
            order.getOrders = d.promise;
            $http({method: 'GET', url: baseUrl + 'orders/' + cid + '/' + lang.code}).
                success(function(result, status, headers, config) {
                    order.orders = result.res;
                    d.resolve(order.orders);
                }).
                error(function(data, status, headers, config) {
                    d.reject();
                });
        };
        order.requestTimestamp = function(){
            var d = $q.defer();
            order.getTimestamp = d.promise;
            $http({method: 'GET', url: baseUrl + 'orders/timestamp/' + lang.code}).
                success(function(result, status, headers, config) {
                    order.timestamp = result.res;
                    d.resolve(order.timestamp);
                }).
                error(function(data, status, headers, config) {
                    d.reject();
                });
        };
        order.add = function(input,success,error){
            $http({
                method: 'POST', 
                data: input,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': '*/*'
                },
                url: baseUrl + 'orders/add/' + lang.code
            }).
            success(success).
            error(error);
        };
        order.remove = function(data,success,error){
            $http({
                method: 'POST', 
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': '*/*'
                },
                url: baseUrl + 'orders/remove/' + lang.code
            }).
            success(success).
            error(error);
        };
        return order;
    }]);

Services.factory('Sale', ['$q', '$http', 'Rest', function($q, $http, Rest) {
        var sale = {};
        
        sale.request = function(){
            var d = $q.defer();
            sale.getSales = d.promise;
            $http({method: 'GET', url: baseUrl + 'sales/' + lang.code}).
                success(function(result, status, headers, config) {
                    sale.sales = result.res;
                    d.resolve(sale.sales);
                }).
                error(function(data, status, headers, config) {
                    d.reject();
                });
        };
        sale.requestFrom = function(date){
            var d = $q.defer();
            sale.getSales = d.promise;
            $http({method: 'GET', url: baseUrl + 'orders/dates/' + date + '/' + lang.code}).
                success(function(result, status, headers, config) {
                    sale.sales = result.res;
                    d.resolve(sale.sales);
                }).
                error(function(data, status, headers, config) {
                    d.reject();
                });
        };
        sale.add = function(input,success,error){
            $http({
                method: 'POST', 
                data: input,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': '*/*'
                },
                url: baseUrl + 'sales/add/' + lang.code
            }).
            success(success).
            error(error);
        };
        
        sale.requestDates = function(input,success,error){
            var d = $q.defer();
            sale.getDates = d.promise;
            $http({method: 'GET', url: baseUrl + 'sales/dates/' + lang.code})
                .success(function(result, status, headers, config) {
                        sale.dates = result.res;
                        d.resolve(sale.dates);
                    })
                .error(function(data, status, headers, config) {
                    d.reject();
                });
        };

        return sale;
    }]);

Services.factory('Setting', function($q,$http, Data) {
    var setting = {};
    setting.requestData = function(){
        var d = $q.defer();
        $http.get('data/setting.json')
        .success(function(res) {
            d.resolve(res);
        })
        .error(function(res){
            d.reject();
        });
        setting.getData = d.promise;
    };
    if(setting.data === undefined || setting.data === null){
        setting.requestData();
        setting.getData.then(function(res){
            setting.data = res;
            if(!setting.data.development) return;
            Data.customer = setting.data.devAccount;
            Data.customer.loggedIn = true;
        });
    }
    var options = window.localStorage.getItem("options");
        if(options !== null){
            try{
                setting.options = JSON.parse(options);
        } catch(e){
                setting.options = { sound: true, flash: true };
            }
        } else{
            setting.options = { sound: true, flash: true };
        }
    setting.save = function(){
        window.localStorage.setItem("options",JSON.stringify(setting.options));
    };
    return setting;
});

var Notification = function() {

    this.hasInfo = false;
    this.title = "";
    this.content = "";
    this.type = "";
    this.ts = 0;
    
    this.showInfo = function(title, content) {
        notify(title, content, 'info',this.ts);
        this.ts = Date.now();
    };

    this.showError = function(title, content) {
        notify(title, content, 'error',this.ts);
        this.ts = Date.now();
    };

    this.showSuccess = function(title, content) {
        notify(title, content, 'success',this.ts);
        this.ts = Date.now();
    };

    this.showWarn = function(title, content) {
        notify(title, content, 'warning',this.ts);
        this.ts = Date.now();
    };

    function notify(title, content, type, ts) {
        var diff = Date.now() - ts;
        if(diff < 3001) return; 
        $.notify(
        {
            title: title,
            text: content + "<span style='color: transparent;'>\n\
            --------------------------\n\
            ---------------------------\n\
            ----------------------</span>",
            image: '<i class="fa fa-2x fa-info"></i>'
        },
        {
//            elementPosition: 'top center',
            globalPosition: 'top',
            style: 'metro',
            className: type,
            autoHide: true,
            clickToHide: true
        });
    }
};