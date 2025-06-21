import { useEffect, useState } from 'react';

export const useTimer = (
  seconds: number,
  onStop: () => void,
  isActive: boolean
) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout = null;

    if (isActive) {
      intervalId = setInterval(() => {
        setValue((prevValue) => prevValue + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isActive]);

  useEffect(() => {
    if (value === seconds) {
      onStop();
    }
  }, [onStop, seconds, value]);
};
