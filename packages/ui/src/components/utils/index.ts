import { useEffect, useRef, useState } from 'react';

/**
 * 执行动画完成后，更新状态
 * 同时兼容 variants 字符串和 initial/animate 对象两种动画写法
 */
export const useAnimationStatus = (open = false) => {
  const [status, setStatus] = useState(open);
  const openRef = useRef(open);

  useEffect(() => {
    openRef.current = open;
    if (open) {
      setStatus(true);
    }
  }, [open]);

  const show = status || open;

  const onAnimationComplete = () => {
    setStatus(openRef.current);
  };

  return { show, onAnimationComplete, setStatus };
};
