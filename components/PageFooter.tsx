import React, { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { InView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';

import { useRefState } from '@/hooks/useRefState';
import type { RootState } from '@/store/root-reducer';

interface PropsI {
  children: React.ReactNode;
  href: string;
  intersectionRatio?: number;
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
  onLeave,
  intersectionRatio
}: PropsI): JSX.Element {
  const router = useRouter();
  const timer = useRef(null);
  const isRouteAnimating = useSelector((s: RootState) => s.routeAnimating);
  const modal = useSelector((s: RootState) => s.modal);
  const [, setAnimating, isAnimatingRef] = useRefState<boolean>(false);

  const goToRoute = useCallback(() => {
    setAnimating(false);
    router.push(href);
  }, [href]);

  const onClick = useCallback(() => {
    if (!isAnimatingRef.current && !isRouteAnimating && !modal.open) {
      goToRoute();
    }
  }, [isRouteAnimating, isAnimatingRef, modal]);

  const startCount = useCallback(() => {
    setAnimating(true);
    timer.current = setTimeout(goToRoute, duration);
  }, [goToRoute, duration]);

  const handleVisible = useCallback(
    (inView: boolean, entry: IntersectionObserverEntry) => {
      if (inView && entry.intersectionRatio >= intersectionRatio) {
        if (onEnter) onEnter();

        if (!isAnimatingRef.current && !isRouteAnimating && !modal.open) {
          startCount();
        }
      } else {
        if (onLeave) onLeave();

        clearTimeout(timer?.current);
        setAnimating(false);
      }
    },
    [
      isRouteAnimating,
      onEnter,
      onLeave,
      isAnimatingRef,
      startCount,
      timer,
      intersectionRatio,
      modal
    ]
  );

  useEffect(() => {
    return () => {
      clearTimeout(timer?.current);
      setAnimating(false);
    };
  }, [timer]);

  useEffect(() => {
    if (modal.open) {
      clearTimeout(timer?.current);
      setAnimating(false);
    }
  }, [modal.open]);

  return (
    <InView
      as="div"
      onChange={handleVisible}
      threshold={threshold}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      {children}
    </InView>
  );
}

PageFooter.defaultProps = {
  duration: 5000,
  intersectionRatio: 0.3,
  onEnter: undefined,
  onLeave: undefined
};
