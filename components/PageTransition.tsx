import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import { useDispatch, useSelector } from 'react-redux';
import { gsap } from 'gsap';

import { setRouteAnimating } from '@/store/route-animating';
import type { RootState } from '@/store/root-reducer';
import { closeModal } from '@/store/modal';
import { pause } from '@/utils/utils';

interface PropsI {
  pathname: string;
  children: React.ReactElement;
}

function leave(node): Promise<void> {
  console.log('leave');

  return new Promise<void>((resolve) => {
    gsap.to(node, {
      opacity: 0,
      duration: 6,
      onComplete: resolve
    });
  });
}

function enter(node): Promise<void> {
  console.log('enter');

  return new Promise<void>((resolve) => {
    gsap.to(node, {
      opacity: 1,
      duration: 6,
      onComplete: resolve
    });
  });
}

const map = {
  '/': {
    enter,
    leave
  },
  '/black': {
    enter,
    leave
  },
  '/case/[slug]': {
    enter,
    leave
  },
  '/about': {
    enter,
    leave
  },
  '/vision': {
    enter,
    leave
  }
};

export function PageTransition({ children, pathname }: PropsI): JSX.Element {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const modal = useSelector((s: RootState) => s.modal);
  const { scroll: locoScroll } = useLocomotiveScroll();

  const [initial, setInitial] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<React.ReactElement>(children);
  const [currentPath, setCurrentPath] = useState<string>(pathname);

  const onChange = useCallback(
    async (newChildren: React.ReactElement, newPath: string) => {
      // Fix native scroll reset issue
      const isMobile =
        locoScroll?.scroll.isMobile || locoScroll?.scroll.isTablet;
      const startY = locoScroll?.scroll.instance.scroll.y;

      if (
        isMobile &&
        startY > 0 &&
        startY !== document.scrollingElement.scrollTop
      ) {
        window.scrollTo(0, startY);
      }

      // Animating flag
      dispatch(setRouteAnimating(true));

      // Initial flag
      const isInitial = initial;
      if (isInitial) setInitial(false);

      // Close modal
      const isModalOpen = modal.open;
      const modalDelay = isModalOpen ? 400 : 0;

      if (isModalOpen) {
        dispatch(closeModal());
      }

      await pause(modalDelay);

      // Leave
      if (!isInitial) await map[currentPath].leave(containerRef.current);

      // Reset scroll
      if (locoScroll) {
        locoScroll.setScroll(0, 0);
        window.scrollTo(0, 0);
        locoScroll.update();
      }

      // Enter
      setCurrentPage(newChildren);
      setTimeout(async () => {
        if (!isInitial) await map[newPath].enter(containerRef.current);
        setCurrentPath(newPath);
        dispatch(setRouteAnimating(false));
      }, 0);
    },
    [containerRef, currentPath, initial, locoScroll, modal.open]
  );

  useEffect(() => {
    onChange(children, pathname);
  }, [children, pathname]);

  return <div ref={containerRef}>{currentPage}</div>;
}
