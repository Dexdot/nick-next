import React, { useRef } from 'react';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.min.css';

import { Header } from '@/components/Header/Header';
import { ScrollReset } from '@/components/ScrollReset';

interface PropsI {
  children: JSX.Element;
}

export function PrimaryLayout({ children }: PropsI): JSX.Element {
  const containerRef = useRef(null);

  return (
    <div>
      <Header />

      <LocomotiveScrollProvider
        containerRef={containerRef}
        options={{ smooth: true }}
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
