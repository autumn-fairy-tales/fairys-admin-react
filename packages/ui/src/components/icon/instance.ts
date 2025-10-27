export const FairysIconClassName = {
  /**Icon 图标属性图标**/
  'ant-design:appstore-outlined': 'fairys:icon-[ant-design--appstore-outlined]',
  'ant-design:bell-outlined': 'fairys:icon-[ant-design--bell-outlined]',
  'ant-design:caret-down-outlined': 'fairys:icon-[ant-design--caret-down-outlined]',
  'ant-design:clear-outlined': 'fairys:icon-[ant-design--clear-outlined]',
  'ant-design:close-outlined': 'fairys:icon-[ant-design--close-outlined]',
  'ant-design:credit-card-outlined': 'fairys:icon-[ant-design--credit-card-outlined]',
  'ant-design:expand-outlined': 'fairys:icon-[ant-design--expand-outlined]',
  'ant-design:fullscreen-exit-outlined': 'fairys:icon-[ant-design--fullscreen-exit-outlined]',
  'ant-design:fullscreen-outlined': 'fairys:icon-[ant-design--fullscreen-outlined]',
  'ant-design:home-outlined': 'fairys:icon-[ant-design--home-outlined]',
  'ant-design:logout-outlined': 'fairys:icon-[ant-design--logout-outlined]',
  'ant-design:menu-fold-outlined': 'fairys:icon-[ant-design--menu-fold-outlined]',
  'ant-design:menu-unfold-outlined': 'fairys:icon-[ant-design--menu-unfold-outlined]',
  'ant-design:moon-outlined': 'fairys:icon-[ant-design--moon-outlined]',
  'ant-design:right-outlined': 'fairys:icon-[ant-design--right-outlined]',
  'ant-design:search-outlined': 'fairys:icon-[ant-design--search-outlined]',
  'ant-design:setting-outlined': 'fairys:icon-[ant-design--setting-outlined]',
  'ant-design:star-outlined': 'fairys:icon-[ant-design--star-outlined]',
  'ant-design:sun-outlined': 'fairys:icon-[ant-design--sun-outlined]',
  'ant-design:sync-outlined': 'fairys:icon-[ant-design--sync-outlined]',
  'codicon:color-mode': 'fairys:icon-[codicon--color-mode]',
  'material-symbols:family-star': 'fairys:icon-[material-symbols--family-star]',
  'mdi:arrow-expand-left': 'fairys:icon-[mdi--arrow-expand-left]',
  'mdi:arrow-expand-right': 'fairys:icon-[mdi--arrow-expand-right]',
  'mdi:close': 'fairys:icon-[mdi--close]',
  'mdi-light:fullscreen-exit': 'fairys:icon-[mdi-light--fullscreen-exit]',
  'ri:close-line': 'fairys:icon-[ri--close-line]',
  'ri:moon-line': 'fairys:icon-[ri--moon-line]',
  'ri:refresh-line': 'fairys:icon-[ri--refresh-line]',
  'ri:sun-line': 'fairys:icon-[ri--sun-line]',
  /**className 属性图标*/
  'fairys:icon-[ant-design--appstore-outlined]': 'fairys:icon-[ant-design--appstore-outlined]',
  'fairys:icon-[ant-design--bell-outlined]': 'fairys:icon-[ant-design--bell-outlined]',
  'fairys:icon-[ant-design--caret-down-outlined]': 'fairys:icon-[ant-design--caret-down-outlined]',
  'fairys:icon-[ant-design--clear-outlined]': 'fairys:icon-[ant-design--clear-outlined]',
  'fairys:icon-[ant-design--close-outlined]': 'fairys:icon-[ant-design--close-outlined]',
  'fairys:icon-[ant-design--credit-card-outlined]': 'fairys:icon-[ant-design--credit-card-outlined]',
  'fairys:icon-[ant-design--expand-outlined]': 'fairys:icon-[ant-design--expand-outlined]',
  'fairys:icon-[ant-design--fullscreen-exit-outlined]': 'fairys:icon-[ant-design--fullscreen-exit-outlined]',
  'fairys:icon-[ant-design--fullscreen-outlined]': 'fairys:icon-[ant-design--fullscreen-outlined]',
  'fairys:icon-[ant-design--home-outlined]': 'fairys:icon-[ant-design--home-outlined]',
  'fairys:icon-[ant-design--logout-outlined]': 'fairys:icon-[ant-design--logout-outlined]',
  'fairys:icon-[ant-design--menu-fold-outlined]': 'fairys:icon-[ant-design--menu-fold-outlined]',
  'fairys:icon-[ant-design--menu-unfold-outlined]': 'fairys:icon-[ant-design--menu-unfold-outlined]',
  'fairys:icon-[ant-design--moon-outlined]': 'fairys:icon-[ant-design--moon-outlined]',
  'fairys:icon-[ant-design--right-outlined]': 'fairys:icon-[ant-design--right-outlined]',
  'fairys:icon-[ant-design--search-outlined]': 'fairys:icon-[ant-design--search-outlined]',
  'fairys:icon-[ant-design--setting-outlined]': 'fairys:icon-[ant-design--setting-outlined]',
  'fairys:icon-[ant-design--star-outlined]': 'fairys:icon-[ant-design--star-outlined]',
  'fairys:icon-[ant-design--sun-outlined]': 'fairys:icon-[ant-design--sun-outlined]',
  'fairys:icon-[ant-design--sync-outlined]': 'fairys:icon-[ant-design--sync-outlined]',
  'fairys:icon-[codicon--color-mode]': 'fairys:icon-[codicon--color-mode]',
  'fairys:icon-[material-symbols--family-star]': 'fairys:icon-[material-symbols--family-star]',
  'fairys:icon-[mdi--arrow-expand-left]': 'fairys:icon-[mdi--arrow-expand-left]',
  'fairys:icon-[mdi--arrow-expand-right]': 'fairys:icon-[mdi--arrow-expand-right]',
  'fairys:icon-[mdi--close]': 'fairys:icon-[mdi--close]',
  'fairys:icon-[mdi-light--fullscreen-exit]': 'fairys:icon-[mdi-light--fullscreen-exit]',
  'fairys:icon-[ri--close-line]': 'fairys:icon-[ri--close-line]',
  'fairys:icon-[ri--moon-line]': 'fairys:icon-[ri--moon-line]',
  'fairys:icon-[ri--refresh-line]': 'fairys:icon-[ri--refresh-line]',
  'fairys:icon-[ri--sun-line]': 'fairys:icon-[ri--sun-line]',
};

export class FairysIconDataInstance {
  /**图标*/
  state: Record<string, string> = { ...FairysIconClassName };
  /**扩展图标*/
  expands = (obj: Record<string, string>) => {
    this.state = { ...this.state, ...obj };
  };
  /**获取图标*/
  getIcon(icon: string) {
    return this.state[icon];
  }
}

export const fairysIconDataInstance = new FairysIconDataInstance();
