const onResize = (): void => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

export const initCSSProps = (): void => {
  // Resized
  onResize();
  window.addEventListener('resize', onResize);
};
