import { useCallback, useEffect, useState } from 'react';

// The backend sends at most one code a minute
export const RESEND_SECONDS = 60;

// Seconds left until a new code can be requested, `start` restarts it
export const useResendCountdown = (
  startRunning: boolean
): { remaining: number; start: () => void } => {
  const [endsAt, setEndsAt] = useState<number>(() =>
    startRunning ? Date.now() + RESEND_SECONDS * 1000 : 0
  );
  const [now, setNow] = useState<number>(Date.now());

  const remaining = Math.max(0, Math.ceil((endsAt - now) / 1000));

  useEffect(() => {
    if (!remaining) {
      return undefined;
    }

    const intervalId = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(intervalId);
  }, [remaining]);

  const start = useCallback(() => {
    const time = Date.now();
    setNow(time);
    setEndsAt(time + RESEND_SECONDS * 1000);
  }, []);

  return { remaining, start };
};
