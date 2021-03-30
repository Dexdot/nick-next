import { useState, useEffect, useCallback, useRef } from 'react';
import { LocomotiveScrollContextValue } from 'react-locomotive-scroll/module/LocomotiveScroll.context';

type ScrollDir = 'top' | 'bottom';

export function useScroll({
  scroll,
  isReady
}: LocomotiveScrollContextValue): { dir: ScrollDir; y: number } {
  const lastScroll = useRef<number>(0);
  const [direction, setDirection] = useState<ScrollDir>('bottom');

  const onScroll = useCallback(() => {
    const y = scroll.scroll.instance.scroll.y as number;
    const last = lastScroll?.current;

    setDirection(y > last ? 'bottom' : 'top');
    lastScroll.current = y;
  }, [scroll, lastScroll]);

  useEffect(() => {
    if (!isReady) return null;

    scroll.on('scroll', onScroll);
    return () => {
      scroll.off('scroll', onScroll);
    };
  }, [isReady]);

  return { y: lastScroll.current, dir: direction };
}
