'use strict';

/* Controllers */
var Controllers = angular.module('Controllers', []);

/*
 * PhoneGap Events
 */
var EventCtrl = Controllers.controller('EventCtrl', ['$scope', '$log','$http','Rest', 'Data','Setting',
    function($scope, $log, $http, Rest, Data, Setting) {
        document.addEventListener("backbutton", onBackPressed, true);
        function onBackPressed(){
            var navi = $scope.ons.navigator;
            try{
                var res = navi.canPopPage();    
                $log.log("can pop page: " + res);
                if(res){
                    navi.popPage();       
                    return;
                }
            } catch(err){
                $log.log(err);
            }
            window.plugins.flashlight.switchOff(exitApp, exitApp);
            exitApp();
        };
        
        function exitApp(){
            if (navigator.app) {
                navigator.app.exitApp();
            }
            else if (navigator.device) {
                 navigator.device.exitApp();
             }
        };
    }
]);

var ImprintCtrl = Controllers.controller('ImprintCtrl',
        ['$scope', 'Setting', 'Data',
            function($scope, Setting, Data) {
                $scope.data = Data;
                $scope.lang = Data.lang.imprint;
                $scope.cinar = 
                        {
                            company:"Cinarsoft",
                            subtitle: "Software Solution",
                            ansprechpartner:"Emrah Eker",
                            adress:"Wenkerstr. 18", postal:"44141", 
                            city:"Dortmund", land:"Almanya",
                            webseite:"www.cinarsoft.net",epost:"info@cinarsoft.net",
                            telefon:"+49 176 845 26514" 
                        };
            }]);

