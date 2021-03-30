import Router from 'next/router';
import { useCallback, useEffect, useRef } from 'react';

type Cleanup = () => void;

// https://github.com/vercel/next.js/issues/17464#issuecomment-751267740
export const useTransitionFix = (): Cleanup => {
  const cleanupRef = useRef<Cleanup>(null);

  useEffect(() => {
    const onChange = () => {
      const nodes = Array.from(
        document.querySelectorAll('link[rel=stylesheet], style:not([media=x])')
      );
      const copies = [...nodes].map((el) => el.cloneNode(true) as HTMLElement);

      copies.forEach((copy) => {
        // Remove Next.js' data attributes so the copies are not removed from the DOM in the route
        // change process.
        copy.removeAttribute('data-n-p');
        copy.removeAttribute('data-n-href');

        // Add duplicated nodes to the DOM.
        document.head.appendChild(copy);
      });

      cleanupRef.current = () => {
        copies.forEach((copy) => {
          document.head.removeChild(copy);
        });
      };
    };

    Router.events.on('routeChangeStart', onChange);

    return () => {
      Router.events.off('routeChangeStart', onChange);
      if (cleanupRef && cleanupRef.current) cleanupRef.current();
    };
  }, []);

  return useCallback(() => {
    if (cleanupRef && cleanupRef.current) cleanupRef.current();
  }, []);
};
