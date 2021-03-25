import React, { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { InView } from 'react-intersection-observer';

import { useRefState } from '@/hooks/useRefState';

interface PropsI {
  children: React.ReactNode;
  href: string;
  duration?: number;
  onEnter?: () => void;
  onLeave?: () => void;
}

const threshold = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

export function PageFooter({
  href,
  duration,
  children,
  onEnter,
  onLeave
}: PropsI): JSX.Element {
  const router = useRouter();
  const timer = useRef(null);
  const [, setAnimating, isAnimatingRef] = useRefState<boolean>(false);

  const startCount = useCallback(() => {
    setAnimating(true);

    timer.current = setTimeout(() => {
      setAnimating(false);
      // TODO: router.push(href);
    }, duration);
  }, [href, duration]);

  const handleVisible = useCallback(
    (inView: boolean, entry: IntersectionObserverEntry) => {
      // TODO: if (isRouteAnimating) return false;

      if (inView && entry.intersectionRatio >= 0.3) {
        if (onEnter) onEnter();

        if (!isAnimatingRef.current) {
          startCount();
        }
      } else {
        if (onLeave) onLeave();

        clearTimeout(timer?.current);
        setAnimating(false);
      }
    },
    [onEnter, onLeave, isAnimatingRef, startCount, timer]
  );

  useEffect(() => {
    startCount();

    return () => {
      clearTimeout(timer?.current);
      setAnimating(false);
    };
  }, [timer]);

  return (
    <InView as="div" onChange={handleVisible} threshold={threshold}>
      {children}
    </InView>
  );
}

PageFooter.defaultProps = {
  duration: 5000,
  onEnter: undefined,
  onLeave: undefined
};
