import fade from '@/transitions/fade';
import main from '@/transitions/main';

export const transitionsMap = {
  '/': main,
  '/black': fade,
  '/case/[slug]': fade,
  '/about': fade,
  '/vision': fade
};
