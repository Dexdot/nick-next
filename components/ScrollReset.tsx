import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLocomotiveScroll } from 'react-locomotive-scroll';

interface PropsI {
  children: JSX.Element;
}

export function ScrollReset({ children }: PropsI): JSX.Element {
  const { scroll: locoScroll } = useLocomotiveScroll();
  const router = useRouter();

  useEffect(() => {
    if (locoScroll) {
      locoScroll.update();
      locoScroll.setScroll(0, 0);
      locoScroll.update();
    }
  }, [router.asPath]);

  return <div>{children}</div>;
}

ScrollReset.displayName = 'ScrollReset';
