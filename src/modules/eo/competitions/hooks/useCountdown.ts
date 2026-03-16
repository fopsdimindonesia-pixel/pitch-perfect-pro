import { useState, useEffect } from 'react';

export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  expired: boolean;
}

export function useCountdown(targetDate: string | undefined): CountdownResult | null {
  const [remaining, setRemaining] = useState<CountdownResult | null>(null);

  useEffect(() => {
    if (!targetDate) { setRemaining(null); return; }

    const calc = (): CountdownResult => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, expired: true };
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        expired: false,
      };
    };

    setRemaining(calc());
    const interval = setInterval(() => setRemaining(calc()), 60000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return remaining;
}
