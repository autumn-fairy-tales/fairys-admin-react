export const DEFAULT_GAP_X = 100;
export const DEFAULT_GAP_Y = 100;

export const FontGap = 3;

export const prepareCanvas = (
  width: number,
  height: number,
  ratio = 1,
): [ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, realWidth: number, realHeight: number] => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const realWidth = width * ratio;
  const realHeight = height * ratio;
  canvas.setAttribute('width', `${realWidth}px`);
  canvas.setAttribute('height', `${realHeight}px`);
  ctx.save();
  return [ctx, canvas, realWidth, realHeight];
};

export const getRotatePos = (x: number, y: number, angle: number) => {
  const targetX = x * Math.cos(angle) - y * Math.sin(angle);
  const targetY = x * Math.sin(angle) + y * Math.cos(angle);
  return [targetX, targetY] as const;
};

export const toList = <T>(candidate: T | T[], skipEmpty = false): T[] => {
  if (skipEmpty && (candidate === undefined || candidate === null)) {
    return [];
  }
  return Array.isArray(candidate) ? candidate : [candidate];
};
