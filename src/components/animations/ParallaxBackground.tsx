import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  offset?: number;
}

export const ParallaxBackground = ({
  className = '',
  children,
  offset = 50
}: ParallaxBackgroundProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`${className} will-change-transform`}
    >
      {children}
    </motion.div>
  );
};
