import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.min.css';

import { Header } from '@/components/Header/Header';
import { ScrollReset } from '@/components/ScrollReset';

const SMOOTH_SCROLL = false;

interface PropsI {
  children: JSX.Element;
}

export function PrimaryLayout({ children }: PropsI): JSX.Element {
  const containerRef = useRef(null);
  const router = useRouter();

  return (
    <div>
      <Header />

      <LocomotiveScrollProvider
        containerRef={containerRef}
        options={{ smooth: SMOOTH_SCROLL }}
        watch={[router.pathname]}
      >
        <ScrollReset>
          <main data-scroll-container ref={containerRef}>
            {children}
          </main>
        </ScrollReset>
      </LocomotiveScrollProvider>
    </div>
  );
}

PrimaryLayout.displayName = 'PrimaryLayout';
