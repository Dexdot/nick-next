import { Asset } from 'contentful';

export const isImage = (asset: Asset): boolean =>
  asset.fields.file.contentType.split('/')[0] === 'image';

export const isJPG = (asset: Asset): boolean =>
  isImage(asset) && asset.fields.file.contentType.split('/')[1] === 'jpeg';

export const isVideo = (asset: Asset): boolean =>
  asset.fields.file.contentType.split('/')[0] === 'video';

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
