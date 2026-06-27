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
  // ponytail: null until mount so server and first client render match;
  // the countdown is live time, never part of the hydration diff.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    function tick() {
      setNow(new Date());
      id = setTimeout(tick, 1000);
    }
    id = setTimeout(tick, 0);
    return () => clearTimeout(id);
  }, []);

  if (!now) return null;

  const diff = target.getTime() - now.getTime();
  if (diff <= 0) {
    return <div className="text-center text-3xl font-semibold">D-day</div>;
  }

  const days = Math.floor(diff / DAY_MS);
  const hours = Math.floor((diff % DAY_MS) / HOUR_MS);
  const minutes = Math.floor((diff % HOUR_MS) / MIN_MS);
  const seconds = Math.floor((diff % MIN_MS) / 1000);
  const label = days === 0 ? 'D-day' : `D-${days}`;

  return (
    <div className="text-center text-3xl font-semibold tabular-nums sm:text-4xl">
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
    <div className="space-y-7">
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={target}
          onSelect={() => {}}
          defaultMonth={target}
          hideNavigation
          captionLayout="label"
          locale={ko}
          className="pointer-events-none p-0 text-base [--cell-size:2.9rem] sm:[--cell-size:3.35rem] [&_.rdp-caption_label]:text-xl [&_.rdp-caption_label]:font-semibold [&_.rdp-weekday]:text-sm [&_.rdp-weekday]:font-medium"
          components={{
            DayButton: (props) => (
              <CalendarDayButton
                {...props}
                tabIndex={-1}
                locale={ko}
                className="text-base sm:text-lg"
              />
            ),
          }}
        />
      </div>
      <DdayCountdown target={target} />
    </div>
  );
}
