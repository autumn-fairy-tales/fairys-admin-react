import { forwardRef, useEffect, useMemo, Ref } from 'react';
import { useFairysWatermark, FairysWatermarkContext, FairysWatermarkProps, useFairysWatermarkContext } from './context';
import { useMergeRefs } from '@floating-ui/react';
import { DEFAULT_GAP_X, DEFAULT_GAP_Y } from './utls';
import clsx from 'clsx';
import { useSetting } from 'context/setting';

export const FairysWatermarkRender = () => {
  const [state] = useFairysWatermarkContext();
  const dataUrl = state.dataURL;
  const markWidth = state.finalWidth;
  const markStyle = state.markStyle;
  const style = useMemo(() => {
    return {
      ...markStyle,
      visibility: 'visible !important',
      backgroundImage: `url('${dataUrl}')`,
      backgroundSize: `${Math.floor(markWidth)}px`,
    } as unknown as React.CSSProperties;
  }, [markStyle, dataUrl, markWidth]);
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

  const [settingState] = useSetting();
  const theme = settingState.theme;
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

  instance.color = theme === 'dark' ? darkColor : color;

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
    instance.color,
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
