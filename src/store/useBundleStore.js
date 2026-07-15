import { create } from "zustand";
import { createUISlice } from "./slices/uiSlice";
import { createCartSlice } from "./slices/cartSlice";

export const useBundleStore = create((set, get, ...a) => ({
  ...createUISlice(set, get, ...a),
  ...createCartSlice(set, get, ...a),
}));
