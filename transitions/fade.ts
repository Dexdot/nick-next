import { gsap } from 'gsap';

function enter(node: any): Promise<void> {
  return new Promise<void>((onComplete) => {
    gsap.fromTo(
      node,
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete
      }
    );
  });
}

function leave(node: any): Promise<void> {
  return new Promise<void>((onComplete) => {
    gsap.fromTo(
      node,
      {
        opacity: 1
      },
      {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete
      }
    );
  });
}

export default { enter, leave };
