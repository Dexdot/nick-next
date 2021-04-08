import { gsap } from 'gsap';

const duration = 1;
const ease = 'power4.inOut';

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

function getRect(el: HTMLElement): Rect {
  const { top, left, width, height } = el.getBoundingClientRect();
  return { x: left, y: top, width, height };
}

function createPlaceholder(src: string, to: Rect, resolve) {
  const div = document.createElement('div');
  div.classList.add('case-cover-placeholder');
  div.style.width = `${to.width}px`;
  div.style.height = `${to.height}px`;
  div.style.left = `${to.x}px`;
  div.style.top = `${to.y}px`;

  const img = document.createElement('img');
  img.onload = resolve;
  img.src = src;

  div.appendChild(img);
  document.body.appendChild(div);
}

function hideCase(node: any) {
  return new Promise((onComplete) => {
    const caseContent = node.querySelector('[data-transition="case-wrapper"]');
    gsap.to(caseContent, {
      opacity: 0,
      duration: 0.3,
      ease,
      onComplete
    });
  });
}

function resetCaseStyleProps(node: any) {
  const caseContent = node.querySelector('[data-transition="case-wrapper"]');
  gsap.set([caseContent], { opacity: 1 });
}

export function resetNextCaseStyleProps(): void {
  const cover = document.querySelector('.case-cover-placeholder');
  if (cover) {
    setTimeout(() => {
      const fromImg = document.querySelector('.next-image-from');
      const fromTitle = document.querySelector(
        '[data-transition="next-title-from"]'
      );
      gsap.set([fromImg, fromTitle], { opacity: 1 });
    }, 10);

    cover.remove();
    document.body.classList.remove('no-scroll');
  }
}

function animateTitle(node: any) {
  return new Promise((onComplete) => {
    const movableTitle = node.querySelector(
      '[data-transition="movable-title"]'
    );
    const fromTitle = node.querySelector('[data-transition="next-title-from"]');
    const toTitle = node.querySelector('[data-transition="next-title-to"]');

    const toSpan = toTitle.querySelector('span');
    const from = getRect(fromTitle);
    const to = getRect(toSpan);

    gsap.set(movableTitle, { translateX: from.x, translateY: from.y });
    gsap.set(movableTitle, { opacity: 1 });
    gsap.set(fromTitle, { opacity: 0 });

    gsap.to(movableTitle, {
      translateX: to.x,
      translateY: getRect(toTitle).y,
      onComplete,
      duration,
      ease
    });
  });
}

function animateImage(node: any) {
  return new Promise((resolve) => {
    const movableImg = node.querySelector('[data-transition="movable-image"]');
    const fromImg = node.querySelector('.next-image-from');
    const toImg = node.querySelector('[data-transition="next-image-to"]');

    const { src } = movableImg.querySelector('img');

    const from = getRect(fromImg);
    const to = getRect(toImg);

    gsap.set(movableImg, {
      translateX: from.x,
      translateY: from.y,
      width: from.width,
      height: from.height
    });
    gsap.set(movableImg, { opacity: 1 });
    gsap.set(fromImg, { opacity: 0 });

    gsap.to(movableImg, {
      width: to.width,
      height: to.height,
      translateX: to.x,
      translateY: to.y,
      onComplete: () => {
        resetCaseStyleProps(node);
        createPlaceholder(src, to, resolve);
      },
      duration,
      ease
    });
  });
}

function animate(node: any) {
  return new Promise((resolve) => {
    hideCase(node);
    const title = animateTitle(node);
    const img = animateImage(node);
    Promise.all([title, img]).then(resolve);
  });
}

function enter(): Promise<void> {
  return new Promise<void>((onComplete) => {
    onComplete();
  });
}

function leave(node: any): Promise<void> {
  return new Promise<void>((onComplete) => {
    document.querySelector('body').classList.add('no-scroll');
    animate(node).then(onComplete);
  });
}

export default { enter, leave };
