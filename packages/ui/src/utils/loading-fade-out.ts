/**
 * 移除页面加载动画
 * @description 移除页面加载动画，包括动画元素、样式元素和脚本元素
 */
export const loadingFadeOut = () => {
  const loadingEl = document.getElementById('loading-container');
  const loadingStyleEl = document.getElementById('loading-container-style');
  const remove = () => {
    try {
      loadingEl.remove?.();
      loadingStyleEl.remove?.();
    } catch (error) {
      console.error('loadingFadeOut error', error);
    }
  };
  if (loadingEl) {
    // loadingEl.style['pointer-events'] = 'none'
    // loadingEl.style.visibility = 'hidden'
    loadingEl.style.opacity = '0';
    loadingEl.style.transition = 'all 0.5s ease-out';
    loadingEl.addEventListener('transitionend', remove, { once: true });
  }
};
