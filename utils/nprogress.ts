import Router from 'next/router';
import NProgress from 'nprogress';

export const initNprogress = (): void => {
  NProgress.configure({
    easing: 'ease',
    minimum: 0.3,
    speed: 800,
    showSpinner: false
  });

  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());
};
