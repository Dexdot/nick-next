import React, { useCallback, useRef, useEffect } from 'react';
import { Asset } from 'contentful';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import { getImageUrl } from '@/utils/utils';

interface PropsI {
  img: Asset;
  onLoad?: () => void;
  width?: string;
}

export function ContentfulImage({ img, onLoad, width }: PropsI): JSX.Element {
  const { scroll } = useLocomotiveScroll();
  const ref = useRef(null);

  const load = useCallback(async () => {
    const imgNode = ref.current;
    const src = getImageUrl(img, width);

    const onload = () => {
      if (scroll && scroll.update) scroll.update();
      if (onLoad) onLoad();
    };

    if (imgNode.decode) {
      imgNode.src = src;
      imgNode
        .decode()
        .then(onload)
        .catch((e) => console.error(e));
    } else {
      imgNode.onload = onload;
      imgNode.src = src;
    }
  }, []);

  useEffect(() => {
    if (ref && ref.current) {
      load();
    }
  }, [ref]);

  // eslint-disable-next-line
  return <img ref={ref} />;
}

ContentfulImage.displayName = 'ContentfulImage';

ContentfulImage.defaultProps = {
  onLoad: undefined,
  width: ''
};
