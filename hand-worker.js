var exports = {}; importScripts('./vendor/vision_bundle.js'); const {FilesetResolver,HandLandmarker}=exports;
let detector;
onmessage=async({data})=>{
 try{
  if(data.type==='init'){
   const vision=await FilesetResolver.forVisionTasks(new URL('./vendor/wasm/',location.href).href);
   detector=await HandLandmarker.createFromOptions(vision,{baseOptions:{modelAssetPath:new URL('./vendor/hand_landmarker.task',location.href).href,delegate:'CPU'},runningMode:'VIDEO',numHands:1,minHandDetectionConfidence:.6,minHandPresenceConfidence:.6,minTrackingConfidence:.6});
   postMessage({type:'ready'});
  }else if(data.type==='frame'){
   let result;try{result=detector.detectForVideo(data.bitmap,data.time)}finally{data.bitmap.close()}
   postMessage({type:'result',points:result.landmarks[0]||null,time:data.time});
  }
 }catch(error){postMessage({type:'error',message:error.message})}
};

