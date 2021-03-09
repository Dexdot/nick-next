// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export interface IAboutFields {
  /** text */
  text?: Document | undefined;

  /** email */
  email?: string | undefined;

  /** postAddress */
  postAddress?: string | undefined;

  /** media-list */
  mediaList?: Asset[] | undefined;

  /** media-big */
  mediaBig?: Asset | undefined;
}

/** about page */

export interface IAbout extends Entry<IAboutFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'about';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IBoxFields {
  /** name */
  name: string;

  /** images */
  images: Asset[];

  /** color */
  color: string;

  /** reset-bottom */
  resetBottom?: boolean | undefined;

  /** fullscreen */
  fullscreen?: boolean | undefined;

  /** disable slider */
  disableSlider?: boolean | undefined;
}

/** Обертка для фото с цветом и тенью */

export interface IBox extends Entry<IBoxFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'box';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface ICaseFields {
  /** make title right */
  makeTitleRight?: boolean | undefined;

  /** title */
  title: string;

  /** slug */
  slug: string;

  /** soon */
  soon?: boolean | undefined;

  /** subtitle */
  subtitle: string;

  /** short subtitle */
  shortSubtitle?: string | undefined;

  /** stories */
  stories?: Asset[] | undefined;

  /** cover */
  cover: Asset;

  /** covers */
  covers: Asset[];

  /** client label */
  clientLabel: string;

  /** client */
  client: string;

  /** role */
  role: string;

  /** roles */
  roles?: string[] | undefined;

  /** date */
  date: string;

  /** awards */
  awards?: string | undefined;

  /** content */
  content: Document;

  /** team */
  team?: Document | undefined;

  /** contentAuthors */
  contentAuthors?: string[] | undefined;

  /** url text */
  urlText?: string | undefined;

  /** url */
  url?: string | undefined;

  /** etalon */
  etalon?: string | undefined;
}

/** Кейс */

export interface ICase extends Entry<ICaseFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'case';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface ICaseBlockFields {
  /** name */
  name: string;

  /** image */
  image?: Asset | undefined;

  /** image width */
  imageWidth?: number | undefined;

  /** image offset */
  imageOffset?: number | undefined;

  /** text 1 */
  text1?: Document | undefined;

  /** text 1 width */
  text1Width?: number | undefined;

  /** text 1 offset */
  text1Offset?: number | undefined;

  /** text 2 */
  text2?: Document | undefined;

  /** text 2 width */
  text2Width?: number | undefined;

  /** text 2 offset */
  text2Offset?: number | undefined;
}

export interface ICaseBlock extends Entry<ICaseBlockFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'caseBlock';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface ICaseQuoteFields {
  /** text */
  text: string;

  /** author */
  author?: string | undefined;

  /** description */
  description?: string | undefined;
}

export interface ICaseQuote extends Entry<ICaseQuoteFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'caseQuote';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface ICaseRowFields {
  /** name */
  name: string;

  /** images */
  images: Asset[];
}

export interface ICaseRow extends Entry<ICaseRowFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'caseRow';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface ICasesFields {
  /** name */
  name: string;

  /** list */
  list: Entry<{ [fieldId: string]: any }>[];
}

/** Список кейсов */

export interface ICases extends Entry<ICasesFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'cases';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface ICategoryFields {
  /** text */
  text: string;

  /** slug */
  slug: string;
}

export interface ICategory extends Entry<ICategoryFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'category';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IInspireBlockFields {
  /** name */
  name: string;

  /** url */
  url: string;

  /** image */
  image: Asset;

  /** types */
  types: Entry<{ [fieldId: string]: unknown }>[];

  /** categories */
  categories: Entry<{ [fieldId: string]: unknown }>[];
}

export interface IInspireBlock extends Entry<IInspireBlockFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'inspireBlock';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IMobileBoxFields {
  /** name */
  name: string;

  /** images */
  images: Asset[];

  /** color */
  color?: string | undefined;
}

export interface IMobileBox extends Entry<IMobileBoxFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'mobileBox';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IRowFields {
  /** name */
  name: string;

  /** images */
  images: Asset[];

  /** box */
  box: boolean;

  /** color */
  color?: string | undefined;
}

/** "Ряд" из изображений.
Опционально: обертка box */

export interface IRow extends Entry<IRowFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'row';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface ITypeFields {
  /** text */
  text: string;

  /** slug */
  slug: string;
}

export interface IType extends Entry<ITypeFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'type';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IVisionFields {
  /** text */
  text: Document;
}

export interface IVision extends Entry<IVisionFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'vision';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IWidesliderFields {
  /** name */
  name: string;

  /** color */
  color?: string | undefined;

  /** images */
  images: Asset[];
}

export interface IWideslider extends Entry<IWidesliderFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'wideslider';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export type CONTENT_TYPE =
  | 'about'
  | 'box'
  | 'case'
  | 'caseBlock'
  | 'caseQuote'
  | 'caseRow'
  | 'cases'
  | 'category'
  | 'inspireBlock'
  | 'mobileBox'
  | 'row'
  | 'type'
  | 'vision'
  | 'wideslider';

export type LOCALE_CODE = 'en-US';

export type CONTENTFUL_DEFAULT_LOCALE_CODE = 'en-US';
