import { useState, useEffect, useCallback, useRef } from 'react';
import { LocomotiveScrollContextValue } from 'react-locomotive-scroll/module/LocomotiveScroll.context';

export function useIsScrolling({
  scroll,
  isReady
}: LocomotiveScrollContextValue): boolean {
  const [isScrolling, setScrolling] = useState<boolean>(false);
  const timer = useRef(null);

  const onScroll = useCallback(() => {
    clearTimeout(timer.current);
    setScrolling(true);

    timer.current = setTimeout(() => {
      setScrolling(false);
    }, 50);
  }, []);

  useEffect(() => {
    if (!isReady) return null;

    scroll.on('scroll', onScroll);
    return () => {
      clearTimeout(timer.current);
      scroll.off('scroll', onScroll);
    };
  }, [isReady]);

  return isScrolling;
}
