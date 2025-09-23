import { proxy, ref, useSnapshot } from 'valtio';
import { DEFAULT_GAP_X, DEFAULT_GAP_Y, FontGap, prepareCanvas, getRotatePos, toList } from './utls';
import { createContext, createRef, useContext, useRef } from 'react';

export interface FairysWatermarkState {
  /**
   * 水印的 base64 编码
   */
  dataURL: string;
  finalWidth: number;
  finalHeight: number;
  markStyle: React.CSSProperties;

  darkDataURL: string;
  darkFinalWidth: number;
  darkFinalHeight: number;

  __defaultValue?: string;
}

export interface FairysWatermarkProps
  extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'> {
  /**内容*/
  content?: string | string[];
  /**
   * 水印的宽度
   */
  width?: number;
  /**
   * 水印的高度
   */
  height?: number;
  /**
   * 水印的图片
   */
  image?: string;
  /**
   * 水印的旋转角度
   */
  rotate?: number;
  gap?: [number, number];
  offset?: [number, number];
  zIndex?: number;
  font?: {
    color?: CanvasFillStrokeStyles['fillStyle'];
    darkColor?: CanvasFillStrokeStyles['fillStyle'];
    fontSize?: number | string;
    fontWeight?: 'normal' | 'light' | 'weight' | number;
    fontStyle?: 'none' | 'normal' | 'italic' | 'oblique';
    fontFamily?: string;
    textAlign?: CanvasTextAlign;
  };
}
/**
 * 水印实例
 */
export class FairysWatermarkInstance {
  public dom = createRef<HTMLDivElement>();
  /**
   * 水印的上下文
   */
  public content?: string[] | string;
  /**
   * 水印的宽度
   */
  public width?: number;
  /**
   * 水印的高度
   */
  public height?: number;
  /**
   * 水印的图片
   */
  public image?: string;

  // public color?: CanvasFillStrokeStyles['fillStyle'];

  public rotate?: number = -22;
  public gap?: [number, number] = [DEFAULT_GAP_X, DEFAULT_GAP_Y];
  public offset?: [number, number];
  public zIndex?: number;
  public font?: FairysWatermarkProps['font'];
  public _ctx?: CanvasRenderingContext2D;

  state = proxy<FairysWatermarkState>({
    dataURL: '',
    finalWidth: 0,
    finalHeight: 0,
    darkDataURL: '',
    darkFinalWidth: 0,
    darkFinalHeight: 0,
    markStyle: {},
  });

  /**
   * 创建水印的样式
   * */
  createMarkStyle = () => {
    const [gapX = DEFAULT_GAP_X, gapY = DEFAULT_GAP_Y] = this.gap;
    const gapXCenter = gapX / 2;
    const gapYCenter = gapY / 2;
    const offsetLeft = this.offset?.[0] ?? gapXCenter;
    const offsetTop = this.offset?.[1] ?? gapYCenter;
    const mergedMarkStyle: React.CSSProperties = {
      zIndex: this.zIndex,
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      backgroundRepeat: 'repeat',
    };
    let positionLeft = offsetLeft - gapXCenter;
    let positionTop = offsetTop - gapYCenter;
    if (positionLeft > 0) {
      mergedMarkStyle.left = `${positionLeft}px`;
      mergedMarkStyle.width = `calc(100% - ${positionLeft}px)`;
      positionLeft = 0;
    }
    if (positionTop > 0) {
      mergedMarkStyle.top = `${positionTop}px`;
      mergedMarkStyle.height = `calc(100% - ${positionTop}px)`;
      positionTop = 0;
    }
    mergedMarkStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`;
    this.state.markStyle = mergedMarkStyle;
    return mergedMarkStyle;
  };

  /**
   * 获取水印的大小
   */
  getMarkSize = (ctx: CanvasRenderingContext2D) => {
    let defaultWidth = 120;
    let defaultHeight = 64;
    if (!this.image && ctx.measureText) {
      ctx.font = `${Number(this.font?.fontSize ?? 20)}px ${this.font?.fontFamily ?? 'sans-serif'}`;
      const contents = toList(this.content);
      const sizes = contents.map((item) => {
        const metrics = ctx.measureText(item!);
        return [metrics.width, metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent];
      });
      defaultWidth = Math.ceil(Math.max(...sizes.map((size) => size[0])));
      defaultHeight =
        Math.ceil(Math.max(...sizes.map((size) => size[1]))) * contents.length + (contents.length - 1) * FontGap;
    }
    return [this.width ?? defaultWidth, this.height ?? defaultHeight] as const;
  };

  /**
   * 获取水印的剪辑区域
   */
  getClips = (
    content: string[] | string | HTMLImageElement,
    rotate: number,
    ratio: number,
    width: number,
    height: number,
    font: FairysWatermarkProps['font'],
    gapX: number,
    gapY: number,
  ) => {
    // ================= Text / Image =================
    const [ctx, canvas, contentWidth, contentHeight] = prepareCanvas(width, height, ratio);

    if (content instanceof HTMLImageElement) {
      // Image
      ctx.drawImage(content, 0, 0, contentWidth, contentHeight);
    } else {
      // Text
      const { color, fontSize, fontStyle, fontWeight, fontFamily, textAlign } = font;
      const mergedFontSize = Number(fontSize) * ratio;
      ctx.font = `${fontStyle} normal ${fontWeight} ${mergedFontSize}px/${height}px ${fontFamily}`;
      ctx.fillStyle = color;
      ctx.textAlign = textAlign;
      ctx.textBaseline = 'top';
      const contents = toList(content);
      contents?.forEach((item, index) => {
        ctx.fillText(item ?? '', contentWidth / 2, index * (mergedFontSize + FontGap * ratio));
      });
    }
    // ==================== Rotate ====================
    const angle = (Math.PI / 180) * Number(rotate);
    const maxSize = Math.max(width, height);
    const [rCtx, rCanvas, realMaxSize] = prepareCanvas(maxSize, maxSize, ratio);
    // Copy from `ctx` and rotate
    rCtx.translate(realMaxSize / 2, realMaxSize / 2);
    rCtx.rotate(angle);
    if (contentWidth > 0 && contentHeight > 0) {
      rCtx.drawImage(canvas, -contentWidth / 2, -contentHeight / 2);
    }
    let left = 0;
    let right = 0;
    let top = 0;
    let bottom = 0;
    const halfWidth = contentWidth / 2;
    const halfHeight = contentHeight / 2;
    const points = [
      [0 - halfWidth, 0 - halfHeight],
      [0 + halfWidth, 0 - halfHeight],
      [0 + halfWidth, 0 + halfHeight],
      [0 - halfWidth, 0 + halfHeight],
    ];
    points.forEach(([x, y]) => {
      const [targetX, targetY] = getRotatePos(x, y, angle);
      left = Math.min(left, targetX);
      right = Math.max(right, targetX);
      top = Math.min(top, targetY);
      bottom = Math.max(bottom, targetY);
    });

    const cutLeft = left + realMaxSize / 2;
    const cutTop = top + realMaxSize / 2;
    const cutWidth = right - left;
    const cutHeight = bottom - top;

    // ================ Fill Alternate ================
    const realGapX = gapX * ratio;
    const realGapY = gapY * ratio;
    const filledWidth = (cutWidth + realGapX) * 2;
    const filledHeight = cutHeight + realGapY;

    const [fCtx, fCanvas] = prepareCanvas(filledWidth, filledHeight);

    const drawImg = (targetX = 0, targetY = 0) => {
      fCtx.drawImage(rCanvas, cutLeft, cutTop, cutWidth, cutHeight, targetX, targetY, cutWidth, cutHeight);
    };
    drawImg();
    drawImg(cutWidth + realGapX, -cutHeight / 2 - realGapY / 2);
    drawImg(cutWidth + realGapX, +cutHeight / 2 + realGapY / 2);
    return [fCanvas.toDataURL(), filledWidth / ratio, filledHeight / ratio] as [
      dataURL: string,
      finalWidth: number,
      finalHeight: number,
    ];
  };
  /**
   * 绘制水印
   */
  onDrawCanvas = (ctx: CanvasRenderingContext2D, drawContent?: string[] | string | HTMLImageElement) => {
    if (!drawContent) {
      return;
    }
    const ratio = window.devicePixelRatio || 1;
    const [markWidth, markHeight] = this.getMarkSize(ctx);
    const [gapX = DEFAULT_GAP_X, gapY = DEFAULT_GAP_Y] = this.gap;

    const createClips = (color: CanvasFillStrokeStyles['fillStyle']) => {
      return this.getClips(
        drawContent,
        this.rotate ?? -22,
        ratio,
        markWidth,
        markHeight,
        {
          color: color,
          fontSize: this.font?.fontSize ?? 20,
          fontStyle: this.font?.fontStyle ?? 'normal',
          fontWeight: this.font?.fontWeight ?? 'normal',
          fontFamily: this.font?.fontFamily ?? 'sans-serif',
          textAlign: this.font?.textAlign ?? 'center',
        },
        gapX,
        gapY,
      );
    };

    const [nextClips, clipWidth, clipHeight] = createClips(this.font?.color ?? 'rgba(0, 0, 0, 0.15)');
    this.state.dataURL = nextClips;
    this.state.finalWidth = clipWidth;
    this.state.finalHeight = clipHeight;

    const [_nextClips, _clipWidth, _clipHeight] = createClips(this.font?.darkColor ?? 'rgba(255, 255, 255, 0.15)');
    this.state.darkDataURL = _nextClips;
    this.state.darkFinalWidth = _clipWidth;
    this.state.darkFinalHeight = _clipHeight;
  };

  /**创建水印*/
  createWatermark = () => {
    const canvas = document.createElement('canvas');
    this._ctx = canvas.getContext('2d');
    if (this._ctx) {
      if (this.image) {
        const img = new Image();
        img.onload = () => {
          this.onDrawCanvas(this._ctx!, img);
        };
        img.onerror = () => {
          this.onDrawCanvas(this._ctx!, this.content);
        };
        img.crossOrigin = 'anonymous';
        img.referrerPolicy = 'no-referrer';
        img.src = this.image;
      } else {
        this.onDrawCanvas(this._ctx!, this.content);
      }
    }
  };
}

export const FairysWatermarkContext = createContext<FairysWatermarkInstance>(new FairysWatermarkInstance());
export const useFairysWatermark = () => useRef<FairysWatermarkInstance>(new FairysWatermarkInstance()).current;
export const useFairysWatermarkContext = () => {
  const instance = useContext(FairysWatermarkContext);
  const state = useSnapshot(instance.state);
  return [state, instance, state.__defaultValue] as [FairysWatermarkState, FairysWatermarkInstance, string];
};
