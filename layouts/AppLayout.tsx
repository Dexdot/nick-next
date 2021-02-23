import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.min.css';

import { Darkmode } from '@/components/Darkmode/Darkmode';
import { ScrollReset } from '@/components/ScrollReset';
import { Header } from '@/components/Header/Header';

const SMOOTH_SCROLL = true;

interface PropsI {
  children: JSX.Element;
}

export function AppLayout({ children }: PropsI): JSX.Element {
  const containerRef = useRef(null);
  const router = useRouter();

  return (
    <div>
      <Darkmode>
        <LocomotiveScrollProvider
          containerRef={containerRef}
          options={{ smooth: SMOOTH_SCROLL }}
          watch={[router.pathname]}
        >
          <Header />

          <ScrollReset>
            <main data-scroll-container ref={containerRef}>
              {children}
            </main>
          </ScrollReset>
        </LocomotiveScrollProvider>
      </Darkmode>
    </div>
  );
}

AppLayout.displayName = 'AppLayout';
