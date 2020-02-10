// Animations
export const DEFAULT_TRANSITION = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

export const LIST_VARIANTS = {
  enter: { transition: { staggerChildren: 0.1 } },
  exit: { transition: { staggerChildren: 0.1 } }
};

export const FAST_LIST_VARIANTS = {
  enter: { transition: { staggerChildren: 0.03 } },
  exit: { transition: { staggerChildren: 0.03 } }
};

export const LIST_ITEM_VARIANTS = {
  initial: { y: 15, opacity: 0 },
  enter: { y: 0, opacity: 1, transition: DEFAULT_TRANSITION },
  exit: {
    y: 15,
    opacity: 0,
    transition: { duration: 1.5, ...DEFAULT_TRANSITION }
  }
};
