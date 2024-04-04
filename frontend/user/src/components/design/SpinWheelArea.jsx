"use client";
import { SpinWheel, ISpinWheelProps } from 'spin-wheel-game';

const segments = [
    { segmentText: 'Option 1', segColor: 'red' },
    { segmentText: 'Option 2', segColor: 'blue' },
    { segmentText: 'Option 3', segColor: 'green' },
  ];

const SpinWheelArea = () => {
  
    const handleSpinFinish = (result) => {
        console.log(`Spun to: ${result}`);
        alert(`${result}`);
      };

      const spinWheelProps = {
        segments,
        onFinished: handleSpinFinish,
        primaryColor: 'black',
        contrastColor: 'white',
        buttonText: 'Spin',
        isOnlyOnce: false,
        size: 300,
        upDuration: 100,
        downDuration: 600,
        fontFamily: 'Arial',
        arrowLocation: 'top',
        showTextOnSpin: true,
        isSpinSound: true,
      };
  return (
   <>
    <SpinWheel {...spinWheelProps} />
   </>
  );
};

export default SpinWheelArea;