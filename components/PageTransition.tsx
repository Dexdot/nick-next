import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import { gsap } from 'gsap';

// Set isRouteAnimating to store
// Close menu
// Animations for every page

interface PropsI {
  pathname: string;
  children: React.ReactElement;
}

function leave(node): Promise<void> {
  console.log('leave');

  return new Promise<void>((resolve) => {
    gsap.to(node, {
      opacity: 0,
      duration: 0.4,
      onComplete: resolve
    });
  });
}

function enter(node): Promise<void> {
  console.log('enter');

  return new Promise<void>((resolve) => {
    gsap.to(node, {
      opacity: 1,
      duration: 0.4,
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
  const containerRef = useRef(null);
  const { scroll: locoScroll } = useLocomotiveScroll();

  const [initial, setInitial] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<React.ReactElement>(children);
  const [currentPath, setCurrentPath] = useState<string>(pathname);

  const onChange = useCallback(
    async (newChildren: React.ReactElement, newPath: string) => {
      // Initial flag
      const isInitial = initial;
      if (isInitial) setInitial(false);

      // Leave
      if (!isInitial) await map[currentPath].leave(containerRef.current);

      // Reset scroll
      if (locoScroll) {
        locoScroll.setScroll(0, 0);
        locoScroll.update();
      }

      // Enter
      setCurrentPage(newChildren);
      setTimeout(async () => {
        if (!isInitial) await map[newPath].enter(containerRef.current);
        setCurrentPath(newPath);
      }, 0);
    },
    [containerRef, currentPath, initial, locoScroll]
  );

  useEffect(() => {
    onChange(children, pathname);
  }, [children, pathname]);

  return <div ref={containerRef}>{currentPage}</div>;
}
