import tinycolor from 'tinycolor2';

/**
 * 获取16进制颜色
 */
export const getHexadecimalColor = (color: string) => {
  const newColor = tinycolor(color);
  const isValid = newColor.isValid();
  if (!isValid) return color;
  return newColor.toHexString();
};
