// Import dependencies
import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { drawRect } from "./utilities";
import styled from "styled-components";

require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
const cocoSsd = require('@tensorflow-models/coco-ssd');

const SelectButton = styled.button`
  padding: 7px 10px;
  border: 2px solid transparent;
  border-radius: 10px;
  background-color: #68a0cf;
  color: #0a0f22;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  margin-top: 2em;
  cursor: pointer;
  transition: all 260ms ease-in-out;

  &:hover {
    background-color: transparent;
    border: 2px solid #fff;
    border-radius: 10px;
    color: #fff;
  }
`;

function TFSsdInstant() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImg, setCapturedImg] = useState(null);

  // Main function
  const runCoco = async () => {
    const net = await cocoSsd.load();
    // console.log("Hand pose model loaded.");
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

  useEffect(() => {
    alert("Ask to access your webcam.");
    runCoco()
    return () => {
        navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(mediaStream => {
            const stream = mediaStream;
            const tracks = stream.getTracks();

            tracks.forEach(track => track.stop());
        })
    }
  },[]);

  const capture = useCallback(() => {
    const capturedImg = webcamRef.current.getScreenshot();
    setCapturedImg(capturedImg);
  }, [webcamRef]);

  return (
    <div style={{ textAlign: 'center' }}>
      {capturedImg === null?
      <div>
        <header
          style={{
              minHeight: '70vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
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
              left: 200,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: 640,
              height: 480
            }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 200,
              right: 0,
              textAlign: "center",
              zindex: 8,
              width: 640,
              height: 480
            }}
          />
        </header>
        <div style={{ margin: 6 }}>
          <SelectButton onClick={capture}>Capture photo</SelectButton>
        </div>
      </div>:
      <div>
        <header
          style={{
              minHeight: '70vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
          }}
        >
          {capturedImg && <img src={capturedImg} />}
        </header>
        <div style={{ margin: 6 }}>
          <SelectButton onClick={() => setCapturedImg(null)}>Retake photo</SelectButton>
        </div>
      </div>
      }
    </div>
  );
}

export default TFSsdInstant;