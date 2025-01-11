/* eslint-disable react-hooks/exhaustive-deps */
import { min } from "lodash";
import { useEffect, useState } from "react";

interface UseTimerProps {
  duration?: number;
  onReset?: () => void;
  onComplete?: () => void;
  startTimer?: boolean;
}
export const useTimer = ({
  duration = 180,
  onReset,
  onComplete,
  startTimer = true,
}: UseTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(startTimer);

  const reset = () => {
    setTimeLeft(duration);
    setIsActive(true); // Start the timer when reset is called
    onReset && onReset();
  };

  useEffect(() => {
    if (isActive) {
      const intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            clearInterval(intervalId);
            setIsActive(false); // Stop the timer
            onComplete && onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isActive, onComplete]);

  useEffect(() => {
    if (startTimer) {
      setIsActive(true); // Start the timer if startTimer is true
    }
  }, [startTimer]);

  return {
    reset,
    time: timeLeft,
    seconds: timeLeft % 60,
    minutes: min([Math.floor(timeLeft / 60), 60]),
  };
};
