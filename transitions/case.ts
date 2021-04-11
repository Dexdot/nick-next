import { gsap } from 'gsap';

// function enter(node: any): Promise<void> {
//   return new Promise<void>((resolve) => {
//     const duration = 0.9;
//     const ease = 'power2.inOut';

//     const title = node.querySelector('[data-transition="case-title"]');
//     const titleSpan = title.querySelector('span');

//     gsap.set(node, { opacity: 1 });

//     gsap.fromTo(
//       titleSpan,
//       {
//         translateY: '100%',
//         opacity: 0
//       },
//       {
//         translateY: '0%',
//         opacity: 1,
//         duration,
//         ease,
//         onStart: () => {
//           gsap.set(title, { overflow: 'hidden' });
//         },
//         onComplete: () => {
//           gsap.set(title, { overflow: 'unset' });
//         }
//       }
//     );

//     const cover = node.querySelector('[data-transition="case-cover"]');
//     const subtitle = node.querySelector('[data-transition="case-subtitle"]');

//     gsap.fromTo(
//       [cover, subtitle],
//       {
//         opacity: 0
//       },
//       {
//         opacity: 1,
//         duration,
//         ease,
//         onComplete: resolve
//       }
//     );
//   });
// }

function enter(node: any): Promise<void> {
  return new Promise<void>((onComplete) => {
    gsap.fromTo(
      node,
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 0.4,
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
