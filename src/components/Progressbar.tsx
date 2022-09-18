import React, { useEffect, useRef } from "react";
import { Line } from "rc-progress";

type TProgressbar = {
  percent: number;
  updatePercent?: any;
  changeTrigger: any;
  setPercent: any;
  delay?: number;
  updateProgress?: boolean;
};

export const useInterval = (callback: any, delay: any) => {
  const savedCallback: any = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback?.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

export const ProgressBar: React.FC<TProgressbar> = ({
  percent,
  updatePercent,
  delay = 5, //secs
  updateProgress = true,
}) => {
  const delayInMs = (delay * 1000) / 100; //ms

  useInterval(() => {
    updatePercent(percent + 1);
    // updateProgress && updatePercent(percent + 1);
  }, delayInMs);

  return (
    <>
      <Line percent={percent} strokeWidth={1} strokeColor="green" />
    </>
  );
};
