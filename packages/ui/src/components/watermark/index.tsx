import { forwardRef, useEffect, useMemo, Ref } from 'react';
import { useFairysWatermark, FairysWatermarkContext, FairysWatermarkProps, useFairysWatermarkContext } from './context';
import { useMergeRefs } from '@floating-ui/react';
import { DEFAULT_GAP_X, DEFAULT_GAP_Y } from './utls';
import { useSetting } from 'context';
import clsx from 'clsx';

export const FairysWatermarkRender = () => {
  const [state] = useFairysWatermarkContext();
  const dataUrl = state.dataURL;
  const darkDataUrl = state.darkDataURL;
  const markWidth = state.finalWidth;
  const darkMarkWidth = state.darkFinalWidth;
  const markStyle = state.markStyle;
  const [darkModeState] = useSetting();
  const darkMode = darkModeState.theme === 'dark';

  const style = useMemo(() => {
    if (!dataUrl && !darkDataUrl) {
      return {};
    }
    if (darkMode) {
      return {
        ...markStyle,
        visibility: 'visible !important',
        backgroundImage: `url('${darkDataUrl}')`,
        backgroundSize: `${Math.floor(darkMarkWidth)}px`,
      } as unknown as React.CSSProperties;
    }
    return {
      ...markStyle,
      visibility: 'visible !important',
      backgroundImage: `url('${dataUrl}')`,
      backgroundSize: `${Math.floor(markWidth)}px`,
    } as unknown as React.CSSProperties;
  }, [markStyle, dataUrl, darkDataUrl, markWidth, darkMarkWidth, darkMode]);

  return <div className="fairys_admin_watermark_render" style={style} />;
};

export const FairysWatermarkBase = forwardRef((props: FairysWatermarkProps, ref: Ref<HTMLDivElement>) => {
  const {
    content,
    width,
    height,
    image,
    rotate = -22,
    gap = [DEFAULT_GAP_X, DEFAULT_GAP_Y],
    offset,
    zIndex,
    font = {},
    className,
    children,
    ...rest
  } = props;
  const instance = useFairysWatermark();
  instance.content = content;
  instance.width = width;
  instance.height = height;
  instance.image = image;
  instance.rotate = rotate;
  instance.gap = gap;
  instance.offset = offset;
  instance.zIndex = zIndex;
  instance.font = font;
  const {
    color = 'rgba(0, 0, 0, 0.15)',
    darkColor = 'rgba(255, 255, 255, 0.15)',
    fontSize = 20,
    fontWeight = 'normal',
    fontStyle = 'normal',
    fontFamily = 'sans-serif',
    textAlign = 'center',
  } = font;
  const [gapX = DEFAULT_GAP_X, gapY = DEFAULT_GAP_Y] = gap;
  const gapXCenter = gapX / 2;
  const gapYCenter = gapY / 2;
  const offsetLeft = offset?.[0] ?? gapXCenter;
  const offsetTop = offset?.[1] ?? gapYCenter;

  useMemo(() => {
    return instance.createMarkStyle();
  }, [zIndex, offsetLeft, gapXCenter, offsetTop, gapYCenter]);

  useEffect(() => {
    instance.createWatermark();
  }, [
    rotate,
    zIndex,
    width,
    height,
    image,
    content,
    color,
    darkColor,
    fontSize,
    fontWeight,
    fontStyle,
    fontFamily,
    textAlign,
    gapX,
    gapY,
    offsetLeft,
    offsetTop,
  ]);
  const cls = useMemo(() => {
    return clsx('fairys_admin_watermark fairys:relative fairys:overflow-hidden', className);
  }, [className]);
  const refs = useMergeRefs([ref, instance.dom]);
  return (
    <FairysWatermarkContext.Provider value={instance}>
      <div {...rest} ref={refs} className={cls}>
        {children}
        <FairysWatermarkRender />
      </div>
    </FairysWatermarkContext.Provider>
  );
});
