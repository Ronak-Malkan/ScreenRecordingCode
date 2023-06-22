document.addEventListener("keydown", handleKeyDown);
let recorder;
let framerate;
let start = 0;
let widthR;
let heightR;

async function handleKeyDown(e){
   if(e.key == 's' || e.key == 'S'){
      start = 1;
   }
   if(start == 1){
      if(e.key == 'd' || e.key == 'D'){
         framerate = 30;
         widthR = 1280;
         heightR = 720;
         start = 3;
      }
      else if(e.key == 'v' || e.key == 'V') {
         framerate = 10;
         start = 2;
      }
      else if(e.key == 'l' || e.key == 'L'){
         framerate = 20;
         start = 2;
      } 
      else if(e.key == 'm' || e.key == 'M'){
         framerate = 30;
         start = 2;
      } 
      else if(e.key == 'h' || e.key == 'H'){
         framerate = 40;
         start = 2;
      }
   }
   else if(start == 2){
      if(e.key == 'v' || e.key == 'V') {
         widthR = 640;
         heightR = 360;
         start = 3;
      }
      else if(e.key == 'l' || e.key == 'L'){
         widthR = 853;
         heightR = 480;
         start = 3;
      }
      else if(e.key == 'm' || e.key == 'M'){
         widthR = 1280;
         heightR = 720;
         start = 3;
      } 
      else if(e.key == 'h' || e.key == 'H'){
         widthR = 1920;
         heightR = 1080;
         start = 3;
      }
      else if(e.key == 'b' || e.key == 'B'){
         widthR = 3840;
         heightR = 2160;
         start = 3;
      }
   }
   if(start == 3){
      let stream = await navigator.mediaDevices.getDisplayMedia({
         video: {frameRate: framerate, width: widthR, height: heightR},
         audio: true,
      });

      recorder = new MediaRecorder(stream);
      recorder.start();

      recorder.ondataavailable = e => {
         var aElem = window.document.createElement('a');
         aElem.href = window.URL.createObjectURL(e.data);
         aElem.download = 'screen';        
         document.body.appendChild(aElem);
         aElem.click();        
         document.body.removeChild(aElem);
         start = 0;
         framerate = 30;
      }
   }
}