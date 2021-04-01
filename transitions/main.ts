import { gsap } from 'gsap';

function enter(node: any): Promise<void> {
  return new Promise<void>((onComplete) => {
    const items = node.querySelectorAll('[data-transition="main-list-item"]');
    gsap.set(node, { opacity: 1 });
    gsap.set(items, { opacity: 0, willChange: 'transform, opacity' });

    gsap.fromTo(
      items,
      {
        opacity: 0,
        y: '60%'
      },
      {
        opacity: 1,
        y: '0%',
        duration: 1.2,
        ease: 'power4.inOut',
        onComplete: () => {
          gsap.set(items, { willChange: '' });
          onComplete();
        }
      }
    );
  });
}

function leave(node: any): Promise<void> {
  return new Promise<void>((onComplete) => {
    const elements = node.querySelectorAll('[data-transition="main-element"]');
    gsap.to(elements, { opacity: 0, duration: 1, ease: 'power1.inOut' });

    const cover = node.querySelector('[data-transition="main-cover"]');
    gsap.to(cover, {
      backdropFilter: 'blur(16px)',
      duration: 1,
      ease: 'power1.inOut'
    });
    setTimeout(onComplete, 900);
  });
}

export default { enter, leave };
