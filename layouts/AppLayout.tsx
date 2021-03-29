import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.min.css';

import { Darkmode } from '@/components/Darkmode/Darkmode';
import { Header } from '@/components/Header/Header';
import { Menu } from '@/components/Menu/Menu';
import { Stories } from '@/components/Stories/Stories';
import { Credits } from '@/components/Credits/Credits';
import { initCSSProps } from '@/utils/css-props';
import { initNprogress } from '@/utils/nprogress';

initNprogress();
const SMOOTH_SCROLL = true;

interface PropsI {
  children: JSX.Element;
}

export function AppLayout({ children }: PropsI): JSX.Element {
  const containerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    initCSSProps();
  }, []);

  return (
    <div>
      <Darkmode>
        <LocomotiveScrollProvider
          containerRef={containerRef}
          options={{ smooth: SMOOTH_SCROLL, tablet: { breakpoint: 768 } }}
          watch={[router.pathname]}
        >
          <Header />

          <main data-scroll-container ref={containerRef}>
            {children}
          </main>

          <Menu />
          <Stories />
          <Credits />
        </LocomotiveScrollProvider>
      </Darkmode>
    </div>
  );
}

AppLayout.displayName = 'AppLayout';
