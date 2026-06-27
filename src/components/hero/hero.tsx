'use client';

import { motion, MotionConfig } from 'motion/react';
import Image from 'next/image';

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
        className="relative flex min-h-[100dvh] flex-col justify-center px-8 py-16"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={item}
          className="text-sm font-medium tracking-[0.18em] text-muted-foreground"
        >
          INDEFINITELY
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-4 text-[clamp(2rem,10vw,3.6rem)] font-medium leading-[1.05] tracking-normal"
        >
          As long as we&apos;re together.
        </motion.h1>
        <div className="relative mt-12 aspect-[3/4] w-full overflow-hidden">
          <Image
            src="/portrait-sketch.png"
            alt={`${brideName}와 ${groomName}을 표현한 드로잉`}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 560px"
            className="object-contain"
          />
        </div>
        <motion.p
          variants={item}
          className="mt-8 text-lg font-medium tabular-nums tracking-[0.08em]"
        >
          {dateSpaced}
        </motion.p>
        <motion.p
          variants={item}
          className="mt-2 text-sm text-muted-foreground"
        >
          {weekday} {timeStr}
          <br />
          {placeName}
        </motion.p>
      </motion.section>
    </MotionConfig>
  );
}
