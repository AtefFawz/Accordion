const INITIAL_ACTIVE_VARIANTS = {
  "wyze-cam-v4": "white",
  "wyze-cam-pan-v3": "white",
  "wyze-cam-floodlight-v3": "white",
};

export const createUISlice = (set) => ({
  activeVariants: INITIAL_ACTIVE_VARIANTS,
  openStepId: 1,

  setVariant: (productId, variantId) =>
    set((state) => ({
      activeVariants: {
        ...state.activeVariants,
        [productId]: variantId,
      },
    })),

  setOpenStep: (stepId) => set({ openStepId: stepId }),

  nextStep: () =>
    set((state) => ({
      openStepId: Math.min(state.openStepId + 1, 4),
    })),
});
