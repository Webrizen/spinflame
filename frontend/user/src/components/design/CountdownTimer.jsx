"use client";
import React, { useEffect, useState } from 'react';
import { formatDistanceToNowStrict, formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

const CountdownTimer = ({ timestamp }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const targetTime = new Date(timestamp);
      const distance = targetTime - currentTime;

      if (distance <= 0) {
        setTimeLeft('Event Already Started!');
        clearInterval(intervalId);
      } else if (distance < 86400000) {
        setTimeLeft(formatDistanceToNowStrict(targetTime, { addSuffix: true }));
      } else {
        setTimeLeft(formatDistanceToNow(targetTime, { addSuffix: true }));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timestamp]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {timeLeft}
    </motion.span>
  );
};

export default CountdownTimer;