import cloneDeep from 'lodash.clonedeep';
import type { Asset, RichTextContent } from 'contentful';
import { INLINES, TopLevelBlock } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const renderOptions = {
  renderNode: {
    [INLINES.HYPERLINK]: ({ data, content }, next) => {
      const targetBlank = data.uri.startsWith('http') ? 'target="_blank"' : '';
      return `<a ${targetBlank} href="${data.uri}">${next(content)}</a>`;
    }
  }
};

export const renderText = (item): string =>
  documentToHtmlString(item, renderOptions);

export const isText = (item: TopLevelBlock): boolean =>
  item.nodeType === 'paragraph';

export const isBlock = (item: TopLevelBlock): boolean =>
  item.nodeType === 'embedded-entry-block' &&
  item.data.target.sys.contentType.sys.id === 'caseBlock';

export const isRow = (item: TopLevelBlock): boolean =>
  item.nodeType === 'embedded-entry-block' &&
  item.data.target.sys.contentType.sys.id === 'caseRow';

export const isQuote = (item: TopLevelBlock): boolean =>
  item.nodeType === 'embedded-entry-block' &&
  item.data.target.sys.contentType.sys.id === 'caseQuote';

export const isNotText = (item: TopLevelBlock): boolean =>
  isBlock(item) || isRow(item) || isQuote(item);

export const isImage = (asset: Asset): boolean =>
  asset.fields.file.contentType.split('/')[0] === 'image';

export const isJPG = (asset: Asset): boolean =>
  isImage(asset) && asset.fields.file.contentType.split('/')[1] === 'jpeg';

export const isVideo = (asset: Asset): boolean =>
  asset.fields.file.contentType.split('/')[0] === 'video';

export const isImageBlock = (item: TopLevelBlock): boolean =>
  item.nodeType === 'embedded-asset-block' && isImage(item?.data?.target);

export const isJPGBlock = (item: TopLevelBlock): boolean =>
  item.nodeType === 'embedded-asset-block' && isJPG(item?.data?.target);

export const isVideoBlock = (item: TopLevelBlock): boolean =>
  item.nodeType === 'embedded-asset-block' && isVideo(item?.data?.target);

function getSupports(): { isMob: boolean; webp: boolean } {
  // FF
  const ffMatch = navigator.userAgent.match(/Firefox\/(.*)$/);
  let ffv = 0;

  if (ffMatch && ffMatch.length > 1) {
    ffv = Number.parseInt(ffMatch[1], 10);
  }

  // WEBP
  const isFFSupports = ffMatch && ffv >= 65;
  const webp =
    isFFSupports ||
    document
      .createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0;

  return {
    isMob: window.innerWidth <= 500,
    webp
  };
}

function encodeParams(data: {
  [key: string]: string | number | boolean;
}): string {
  const keys = Object.keys(data);
  const params = keys.map(
    (k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`
  );

  return params.join('&');
}

export function getImageUrl(img: Asset, width?: string): string {
  const { url } = img.fields.file;
  const supports = getSupports();

  const fmfl = isJPG(img)
    ? {
        fm: supports.webp ? 'webp' : 'jpg',
        fl: supports.webp ? '' : 'progressive'
      }
    : {};

  const params = {
    ...fmfl,
    w: width || '',
    fit: supports.isMob ? 'fill' : ''
  };

  return `${url}?${encodeParams(params)}`;
}

function hasUnderlineMark(el: RichTextContent): boolean {
  const isTextType = el.nodeType === 'text';
  const mark = el.marks[0];

  if (!isTextType || !mark) return false;

  return mark.type === 'underline';
}

export function createMobileAboutText(
  content: TopLevelBlock[]
): TopLevelBlock[] {
  let textIndex: number;
  let contentItemIndex: number;
  let underlinedItem;

  const textContent = cloneDeep([...content]);

  textContent.forEach((text, i) => {
    text.content.forEach((item, j) => {
      // @ts-ignore
      if (hasUnderlineMark(item)) {
        underlinedItem = { ...item };
        textIndex = i;
        contentItemIndex = j;
      }
    });
  });

  if (underlinedItem) {
    const textArray = [...textContent];

    textArray[textIndex].content.splice(contentItemIndex, 1);
    textArray.unshift({
      data: {},
      content: [underlinedItem],
      // @ts-ignore
      nodeType: 'paragraph'
    });

    return textArray;
  }

  return [...textContent];
}

export function splitBlocksByHr(content: TopLevelBlock[]): TopLevelBlock[][] {
  let counter = 0;
  const slides: TopLevelBlock[][] = [];

  content.forEach((block) => {
    if (block.nodeType !== 'hr') {
      const slide = slides[counter];

      if (Array.isArray(slide)) {
        slide.push(block);
      } else {
        slides[counter] = [];
        slides[counter].push(block);
      }
    } else {
      counter += 1;
    }
  });

  return slides;
}
