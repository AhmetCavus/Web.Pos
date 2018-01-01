var Device = function(){
  
    this.flash = false;
    this.flashOn = function(){
      
        window.plugins.flashlight.available(function(isAvailable) {
            if (isAvailable) {

              // switch on
              window.plugins.flashlight.switchOn(); // success/error callbacks may be passed

              this.flash = true;
              
              // switch off after 30 seconds
              setTimeout(function() {
                flashOff(); // success/error callbacks may be passed
              }, 30000);

            } else {
              alert("Flashlight not available on this device");
            }
          });
        
    };
    
    this.flashOff = function(){
        window.plugins.flashlight.available(function(isAvailable) {
            if (isAvailable) {

              // switch on
              window.plugins.flashlight.switchOff(); // success/error callbacks may be passed

              this.flash = false;
            } else {
              alert("Flashlight not available on this device");
            }
          });
    };
    
    this.switch = function(){
        window.plugins.flashlight.available(function(isAvailable) {
            if (isAvailable) {

              window.plugins.flashlight.toggle();

            } else {
              alert("Flashlight not available on this device");
            }
          });
       
    };
    
    this.toggle = function(){
        window.plugins.flashlight.available(function(isAvailable) {
            if (isAvailable) {

                if(this.flash) flashOn();
                else flashOff();
                
            } else {
              alert("Flashlight not available on this device");
            }
          });
    };
    
};
