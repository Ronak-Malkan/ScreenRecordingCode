document.addEventListener("keydown", handleKeyDown);
let recorder;
let framerate;
let start = 0;

async function handleKeyDown(e){
  if(e.key == 's' || e.key == 'S'){
    start = 1;
  }
  if(start == 1){
    if(e.key == 'l' || e.key == 'L') {
      framerate = 10;
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
  if(start == 2){
   let stream = await navigator.mediaDevices.getDisplayMedia({
      video: {frameRate: framerate},
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