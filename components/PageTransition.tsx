import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PropsI {
  pathname: string;
  children: React.ReactElement;
}

function leave(node): Promise<void> {
  return new Promise<void>((resolve) => {
    gsap.to(node, {
      opacity: 0,
      duration: 0.4,
      onComplete: resolve
    });
  });
}

function enter(node): Promise<void> {
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
  const [currentPage, setCurrentPage] = useState<React.ReactElement>(children);
  const [currentPath, setCurrentPath] = useState<string>(pathname);

  const onChange = useCallback(
    async (newChildren: React.ReactElement, newPath: string) => {
      // leave
      await map[currentPath].leave(containerRef.current);

      // enter
      setCurrentPage(newChildren);
      setTimeout(async () => {
        await map[newPath].enter(containerRef.current);
        setCurrentPath(newPath);
      }, 0);
    },
    [containerRef, currentPath]
  );

  useEffect(() => {
    onChange(children, pathname);
  }, [children, pathname]);

  return <div ref={containerRef}>{currentPage}</div>;
}
