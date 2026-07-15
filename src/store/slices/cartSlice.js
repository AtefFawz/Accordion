import { SEED_CART } from "../../data/seedCart";

const getInitialCart = () => {
  try {
    const saved = localStorage.getItem("ecom_bundle_saved_cart");
    return saved ? JSON.parse(saved) : SEED_CART;
  } catch (e) {
    return SEED_CART;
  }
};

export const createCartSlice = (set, get) => ({
  cart: getInitialCart(),

  updateQuantity: (productId, variantId, quantity, productData = {}) =>
    set((state) => {
      const cartKey = `${productId}-${variantId}`;
      const newCart = { ...state.cart };

      if (quantity <= 0) {
        delete newCart[cartKey];
      } else {
        newCart[cartKey] = {
          productId,
          variantId,
          quantity,
          title: productData.title || state.cart[cartKey]?.title || "Product",
          price: productData.price || state.cart[cartKey]?.price || 0,
          compareAtPrice:
            productData.compareAtPrice ||
            state.cart[cartKey]?.compareAtPrice ||
            null,
          category:
            productData.category || state.cart[cartKey]?.category || "Other",
          image: productData.image || state.cart[cartKey]?.image || "",
        };
      }
      return { cart: newCart };
    }),

  getDistinctCountForCategory: (categoryName) => {
    const cart = get().cart;
    if (!categoryName) return 0;
    const distinctProducts = new Set();
    Object.values(cart).forEach((item) => {
      if (
        item?.category &&
        item.category.toLowerCase() === categoryName.toLowerCase()
      ) {
        distinctProducts.add(item.productId);
      }
    });
    return distinctProducts.size;
  },

  getTotals: () => {
    const cart = get().cart;
    let activeTotal = 0;
    let compareTotal = 0;

    Object.values(cart).forEach((item) => {
      activeTotal += item.price * item.quantity;
      compareTotal += (item.compareAtPrice || item.price) * item.quantity;
    });

    const savings = compareTotal - activeTotal;

    return {
      activeTotal: parseFloat(activeTotal.toFixed(2)),
      compareTotal: parseFloat(compareTotal.toFixed(2)),
      savings: parseFloat(savings.toFixed(2)),
    };
  },

  saveSystemForLater: () => {
    const currentCart = get().cart;
    localStorage.setItem("ecom_bundle_saved_cart", JSON.stringify(currentCart));
    alert("Excellent choice! Your custom security setup has been saved.");
  },

  resetSystem: () => {
    localStorage.removeItem("ecom_bundle_saved_cart");
    set({
      cart: SEED_CART,

      activeVariants: {
        "wyze-cam-v4": "white",
        "wyze-cam-pan-v3": "white",
        "wyze-cam-floodlight-v3": "white",
      },
      openStepId: 1,
    });
  },
});
