// Import dependencies
import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { drawRect } from "./utilities";

require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
const cocoSsd = require('@tensorflow-models/coco-ssd');

function Tensorflow() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImg, setCapturedImg] = useState(null);

  // Main function
  const runCoco = async () => {
    const net = await cocoSsd.load();
    console.log("Hand pose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);
      // console.log('obj: ', obj)

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };

  useEffect(async() => {
    try{
      alert("Ask to access your webcam.");
      runCoco()
    } catch(e) {
      console.error(e);
    }
  },[]);

  const capture = useCallback(() => {
    const capturedImg = webcamRef.current.getScreenshot();
    setCapturedImg(capturedImg);
  }, [webcamRef]);

  return (
    <div style={{ textAlign: 'center' }}>
      <header
        style={{
            backgroundColor: '#282c34',
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'calc(10px + 2vmin)',
            color: 'white'
        }}
      >
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>

      <div style={{ marginTop: 6 }}>
        <button onClick={capture}>Capture photo</button>
        <button style={{ marginLeft: 6 }} onClick={() => setCapturedImg(null)}>Clear</button>
      </div>

      {capturedImg && <img src={capturedImg} width="50%" />}

    </div>
  );
}

export default Tensorflow;