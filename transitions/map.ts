import fade from '@/transitions/fade';
import main from '@/transitions/main';
import caseDetail from '@/transitions/case';
import cases from '@/transitions/cases';

export const transitionsMap = {
  '/': main,
  '/black': fade,
  'from/to_case': cases,
  '/case/[slug]': caseDetail,
  '/about': fade,
  '/vision': fade
};
