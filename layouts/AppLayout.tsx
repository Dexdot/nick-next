import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.min.css';

import { Darkmode } from '@/components/Darkmode/Darkmode';
import { ScrollReset } from '@/components/ScrollReset';
import { Header } from '@/components/Header/Header';
import { Menu } from '@/components/Menu/Menu';
import { Stories } from '@/components/Stories/Stories';
import { initCSSProps } from '@/utils/css-props';
import { initNprogress } from '@/utils/nprogress';

initNprogress();
const SMOOTH_SCROLL = false;

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

          <ScrollReset>
            <main data-scroll-container ref={containerRef}>
              {children}
            </main>
          </ScrollReset>

          <Menu />
          <Stories />
        </LocomotiveScrollProvider>
      </Darkmode>
    </div>
  );
}

AppLayout.displayName = 'AppLayout';
