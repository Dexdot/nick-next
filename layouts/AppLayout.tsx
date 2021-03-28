import React, { useRef, useEffect } from 'react';
// import { gsap } from 'gsap';
import { useRouter } from 'next/router';
// import { SwitchTransition, Transition } from 'react-transition-group';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.min.css';

import { Darkmode } from '@/components/Darkmode/Darkmode';
import { ScrollReset } from '@/components/ScrollReset';
import { Header } from '@/components/Header/Header';
import { Menu } from '@/components/Menu/Menu';
import { Stories } from '@/components/Stories/Stories';
import { Credits } from '@/components/Credits/Credits';
import { initCSSProps } from '@/utils/css-props';
import { initNprogress } from '@/utils/nprogress';

initNprogress();
const SMOOTH_SCROLL = true;

// const duration = 1;

// function enter(node) {
//   gsap.from(node, {
//     duration,
//     opacity: 1
//   });
// }

// function exit(node) {
//   gsap.to(node, {
//     duration,
//     opacity: 0
//   });
// }

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
              {/* <SwitchTransition mode="out-in">
                <Transition
                  key={router.asPath}
                  timeout={duration * 1000}
                  onEnter={enter}
                  // @ts-ignore
                  onExit={exit}
                  mountOnEnter
                  unmountOnExit
                  in
                >
                  {children}
                </Transition>
              </SwitchTransition> */}
            </main>
          </ScrollReset>

          <Menu />
          <Stories />
          <Credits />
        </LocomotiveScrollProvider>
      </Darkmode>
    </div>
  );
}

AppLayout.displayName = 'AppLayout';
