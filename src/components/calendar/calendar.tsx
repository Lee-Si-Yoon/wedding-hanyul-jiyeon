'use client';

import { useEffect, useState } from 'react';
import { ko } from 'date-fns/locale';
import { Calendar, CalendarDayButton } from '@/components/ui/calendar';

const DAY_MS = 86_400_000;
const HOUR_MS = 3_600_000;
const MIN_MS = 60_000;

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

function DdayCountdown({ target }: { target: Date }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = target.getTime() - now.getTime();
  if (diff <= 0) {
    return <div className="text-center text-lg font-medium">D-day</div>;
  }

  const days = Math.floor(diff / DAY_MS);
  const hours = Math.floor((diff % DAY_MS) / HOUR_MS);
  const minutes = Math.floor((diff % HOUR_MS) / MIN_MS);
  const seconds = Math.floor((diff % MIN_MS) / 1000);
  const label = days === 0 ? 'D-day' : `D-${days}`;

  return (
    <div className="text-center text-lg font-medium tabular-nums">
      {label} {pad(hours)}:{pad(minutes)}:{pad(seconds)}
    </div>
  );
}

export default function WeddingCalendar({
  targetDate,
}: {
  targetDate: string;
}) {
  const target = new Date(targetDate);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={target}
          onSelect={() => {}}
          defaultMonth={target}
          hideNavigation
          captionLayout="label"
          locale={ko}
          className="pointer-events-none"
          components={{
            DayButton: (props) => (
              <CalendarDayButton {...props} tabIndex={-1} locale={ko} />
            ),
          }}
        />
      </div>
      <DdayCountdown target={target} />
    </div>
  );
}
