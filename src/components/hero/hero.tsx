'use client';

import { motion, MotionConfig } from 'motion/react';

const EASE_QUART = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_QUART },
  },
};

export function Hero({
  groomName,
  brideName,
  dateSpaced,
  weekday,
  timeStr,
  placeName,
}: {
  groomName: string;
  brideName: string;
  dateSpaced: string;
  weekday: string;
  timeStr: string;
  placeName: string;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.section
        aria-label="결혼식 초대"
        className="relative flex min-h-[88vh] flex-col items-center justify-center px-6 text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={item}
          className="text-sm font-medium tracking-[0.08em] text-muted-foreground"
        >
          결혼식에 초대합니다
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-7 text-[clamp(2.25rem,11vw,3.5rem)] font-semibold leading-[1.15] tracking-[-0.01em]"
        >
          {groomName} · {brideName}
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-5 text-xl font-medium tabular-nums tracking-[0.15em] text-brand sm:text-2xl"
        >
          {dateSpaced}
        </motion.p>
        <motion.p
          variants={item}
          className="mt-2 text-sm text-muted-foreground"
        >
          {weekday} {timeStr} · {placeName}
        </motion.p>
        <motion.div
          variants={item}
          aria-hidden="true"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground/60"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.section>
    </MotionConfig>
  );
}
