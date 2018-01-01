var SettingsCtrl = Controllers.controller('SettingsCtrl',
        ['$scope', '$log', '$http' ,'Rest', 'Data','Notification', 'Device','Setting',
            function($scope, $log, $http, Rest, Data, Notification, Device, Setting) {
                $scope.data = Data;
                $scope.lang = Data.lang.settings;
                if(Setting.options.sound){
                    $scope.sound = $scope.lang.soundOn;
                    $('#setAudio').removeClass('fa-volume-off').addClass('fa-volume-up');
                }
                else{
                    $scope.sound = $scope.lang.soundOff;
                    $('#setAudio').removeClass('fa-volume-up').addClass('fa-volume-off');
                }
                $scope.light = Setting.options.flash ? $scope.lang.lightOn : $scope.lang.lightOff;
                $scope.onVolumeClick = function(){
                    if($('#setAudio').is('.fa-volume-up')){
                        $scope.sound = $scope.lang.soundOff;
                        $('#setAudio').removeClass('fa-volume-up').addClass('fa-volume-off');
                        $('#audio')[0].pause();
                        Setting.options.sound = false;
                    }else{
                        $scope.sound = $scope.lang.soundOn;
                        $('#setAudio').removeClass('fa-volume-off').addClass('fa-volume-up');
                        $('#audio')[0].play();
                        Setting.options.sound = true;
                    }
                    Setting.save();
                };
                $scope.switchLight = function(){
                    Device.switch();
                    if(Device.flash){
                        $scope.light = $scope.lang.lightOn;
                        Setting.options.flash = false;
                    } else{
                        $scope.light = $scope.lang.lightOff;
                        Setting.options.flash = true;
                    }
                    Setting.save();
                };
            }]);
        
        