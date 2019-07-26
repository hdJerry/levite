
  window.onload = function () {
    //   //   console.log('here')
      
    //   var downloadButton = document.getElementById('download');
    //   var audioControl = document.getElementById('audio');
      
    //   audioControl.onerror = function () {
    //       console.log(audioControl.error);
    //     };

          downloadURL = (event,url, name, extension)=> {
            
            event.preventDefault();
            event.stopImmediatePropagation();
              
            //   downloadButton.addEventListener('click', function () {
                    // console.log(event);
            var audioFileUrl = url;
            

            // audioControl.src = null;
            
            fetch(audioFileUrl)
            .then(function (res) {
                  res.blob().then(function (blob) {
                      var size = blob.size;
                      var type = blob.type;
                      
                      var reader = new FileReader();
                      reader.addEventListener("loadend", function () {
                          
                          // console.log('reader.result:', reader.result);
                          
                          // 1: play the base64 encoded data directly works
                          // audioControl.src = reader.result;

                          // 2: Serialize the data to localStorage and read it back then play...
                          var base64FileData = reader.result.toString();
                          
                          var mediaFile = {
                              fileUrl: audioFileUrl,
                              size: blob.size,
                              type: blob.type,
                              src: base64FileData
                            };
                            
                            // save the file info to localStorage
                        //   localStorage.setItem('myTest', JSON.stringify(mediaFile));

                        // //   read out the file info from localStorage again
                        //   var reReadItem = JSON.parse(localStorage.getItem('myTest'));
                        
                        download(mediaFile.src, name, extension);

                        //   audioControl.src = mediaFile.src;

                        });

                      reader.readAsDataURL(blob);

                  });
              });
              
    //   });
      

    }
      
      
    }