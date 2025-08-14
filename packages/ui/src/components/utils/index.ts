import { AnimationDefinition } from 'framer-motion';
import { useState, useMemo } from 'react';

/**
 * 执行动画完成后，更新状态
 */
export const useAnimationStatus = (open = false) => {
  const [status, setStatus] = useState(open);

  const show = useMemo(() => {
    //如果是开，则说明是展开的数据
    if (status) {
      return true;
    }
    // 其他情况直接执行 open 参数
    return open;
  }, [status, open]);

  const onAnimationComplete = (status: AnimationDefinition) => {
    setStatus(status === 'open');
  };

  return { show, onAnimationComplete, setStatus };
};
