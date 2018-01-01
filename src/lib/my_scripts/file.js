lastCapture = null;
lastImage = null;
    
var MediaHandler = function(){
    
    
    this.captureImage = function(idImage){
        navigator.device.capture.captureImage(
            function(mediaFiles){
                lastCapture = mediaFiles[0];
                var img = document.getElementById(idImage);
                img.src = lastCapture.fullPath;
            }, 
            function(){
                throw new  Exception("Error capturing media");
            }, { limit: 1 });
    };

    this.getPicture = function(idImage){
        // Launch device camera application,
        // allowing user to capture only one image by {limit: 1}
        // Retrieve image file location from specified source
        navigator.camera.getPicture(
        function(imageData){
            lastImage = imageData;
            var img = document.getElementById(idImage);
            img.src = "data:image/jpeg;base64," +imageData;
        },
        function(){

        }, { quality: 10, destinationType: navigator.camera.DestinationType.DATA_URL });
    };
    
    this.uploadMedia = function(url, param, response){
      
        if(lastCapture === undefined || lastCapture === null){
            response({success: false, error: "No image captured"});
            return;
        }
      
        var path = lastCapture.fullPath;
        var name = lastCapture.name;

        var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=name;
        options.mimeType="image/jpeg";
        options.params = param;
        options.trustEveryone = true;
        options.chunkedMode = false;
        options.headers = {
          'Connection': 'close',
          'Content-Type': undefined
        };
        
//        alert(path + " # " + name);
        console.log(path + " # " + name);

        var ft = new FileTransfer();
        ft.upload( path, url,
            function(data) {
                response(data);
            },
            function(data) {
                response(data);
            },
            options,
            true
            );
    };

    this.hasCapture = function(){
      return lastCapture !== null;  
    };
    
    this.reset = function(){
      lastCapture = null;
      lastImage = null;
    };
    
    
};