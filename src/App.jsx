import React, { useEffect, useState } from 'react';
import "./App.css"
import pic from "./assets/speedometer_53128.png"

const NetSpeedDetector = () => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [imageSize, setImageSize] = useState('');
  const [totalBitSpeed, setTotalBitSpeed] = useState(0);
  const [totalKbsSpeed, setTotalKbsSpeed] = useState(0);
  const [totalMbsSpeed, setTotalMbsSpeed] = useState(0);
  const [testCompleted, setTestCompleted] = useState(0);
  const numTests = 1;

  const imageApi = 'https://source.unsplash.com/random?topic=nature';

  useEffect(() => {
    for (let i = 0; i < numTests; i++) {
      init();
    }
  }, []);

  const calculateSpeed = async () => {
    const timeDuration = (endTime - startTime) / 1000;
    const loadedBits = imageSize * 8;
    const speedInBits = loadedBits / timeDuration;
    const speedInKbs = speedInBits / 1024;
    const speedInMbs = speedInKbs / 1024;

    setTotalBitSpeed(totalBitSpeed + speedInBits);
    setTotalKbsSpeed(totalKbsSpeed + speedInKbs);
    setTotalMbsSpeed(totalMbsSpeed + speedInMbs);

    setTestCompleted(testCompleted + 1);

    if (testCompleted === numTests) {
      const averageSpeedInBits = (totalBitSpeed / numTests).toFixed(2);
      const averageSpeedInKbps = (totalKbsSpeed / numTests).toFixed(2);
      const averageSpeedInMbps = (totalMbsSpeed / numTests).toFixed(2);

      document.getElementById('bits').innerHTML += `${averageSpeedInBits}`;
      document.getElementById('kbs').innerHTML += `${averageSpeedInKbps}`;
      document.getElementById('mbs').innerHTML += `${averageSpeedInMbps}`;
      document.getElementById('info').innerHTML = 'Test Completed!';
    } else {
      setStartTime(new Date().getTime());
      const response = await fetch(imageApi);
      setImageSize(response.headers.get('content-length'));
      setEndTime(new Date().getTime());
    }
  };

  const init = async () => {
    document.getElementById('info').innerHTML = 'Testing...';
    setStartTime(new Date().getTime());
    const response = await fetch(imageApi);
    setImageSize(response.headers.get('content-length'));
    setEndTime(new Date().getTime());
  };

  return (
    <div className="container">
      <img src={pic} alt="Speedometer" />
      <p id="info">
        <span>...</span>
      </p>
      <p id="mbs">
        <span>Speed In Mbs:</span>
      </p>
      <p id="kbs">
        <span>Speed in Kbs:</span>
      </p>
      <p id="bits">
        <span>Speed in Bits:</span>
      </p>
    </div>
  );
};

export default NetSpeedDetector;
