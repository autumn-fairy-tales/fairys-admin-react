import type { Variant, Transition } from 'framer-motion';
export type PopoverEnumVariantValueType = 'open' | 'collapsed';
export const variantsBase: Record<PopoverEnumVariantValueType, Variant> = {
  open: { scale: 1, rotate: 0, opacity: 1, height: 'auto' },
  collapsed: { scale: 0.5, rotate: 45, opacity: 0, height: 0 },
};

export const transitionBase: Transition = {
  duration: 0.5,
};
