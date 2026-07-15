import React from "react";
import { useBundleStore } from "../store/useBundleStore";

export const ReviewPanel = () => {
  const cart = useBundleStore((state) => state.cart);
  const updateQuantity = useBundleStore((state) => state.updateQuantity);
  const getTotalsFn = useBundleStore((state) => state.getTotals);
  const getTotals = getTotalsFn();
  const saveSystemForLater = useBundleStore(
    (state) => state.saveSystemForLater,
  );

  const cartItems = Object.values(cart);

  const categories = ["Cameras", "Sensors", "Accessories", "Plan"];

  const handleQtyChange = (item, newQty) => {
    updateQuantity(item.productId, item.variantId, newQty, item);
  };

  return (
    <div className="bg-[#EDF4FF] rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between h-fit sticky top-6">
      <div>
        <h3 className="text-2xl font-black text-gray-900">
          Your security system
        </h3>
        <p className="text-xs text-gray-500 mt-1 mb-6">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>

        <div className="space-y-6">
          {categories.map((category) => {
            const itemsInCategory = cartItems.filter(
              (item) => item.category.toLowerCase() === category.toLowerCase(),
            );

            if (itemsInCategory.length === 0) return null;

            return (
              <div
                key={category}
                className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
              >
                <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                  {category}
                </span>

                <div className="space-y-3 mt-2">
                  {itemsInCategory.map((item) => {
                    const cartKey = `${item.productId}-${item.variantId}`;
                    return (
                      <div
                        key={cartKey}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-10 h-10 object-contain bg-white rounded-md p-1 border border-gray-100"
                          />
                          <div>
                            <h5 className="text-xs font-bold text-gray-800 line-clamp-1">
                              {item.title}
                            </h5>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border border-gray-300 rounded bg-white">
                            <button
                              onClick={() =>
                                handleQtyChange(item, item.quantity - 1)
                              }
                              className="px-1.5 py-0.5 text-xs text-gray-500 hover:bg-gray-100"
                            >
                              —
                            </button>
                            <span className="px-2 text-xs font-bold text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQtyChange(item, item.quantity + 1)
                              }
                              className="px-1.5 py-0.5 text-xs text-gray-500 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right min-w-[55px]">
                            {item.compareAtPrice && (
                              <span className="block text-[10px] text-red-500 line-through leading-none">
                                $
                                {(item.compareAtPrice * item.quantity).toFixed(
                                  2,
                                )}
                              </span>
                            )}
                            <span className="text-xs font-black text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-gray-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="p-1 bg-green-50 text-green-600 rounded">🚚</span>
            <span className="text-xs font-bold text-gray-800">
              Fast Shipping
            </span>
          </div>
          <div className="text-right text-xs font-bold">
            <span className="text-gray-400 line-through mr-1.5">$5.99</span>
            <span className="text-green-600 uppercase">FREE</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-gray-100">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-[10px] font-bold text-center leading-none px-0.5">
              100%
            </span>
            <span className="text-[10px] font-medium text-gray-500 leading-tight">
              Wyze satisfaction <br /> guarantee
            </span>
          </div>
          <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">
            as low as $19.19/mo
          </span>
        </div>

        <div className="flex items-end justify-between pt-2">
          <span className="text-xs font-black text-gray-400 uppercase tracking-wider">
            Total
          </span>
          <div className="text-right">
            <span className="text-sm text-gray-400 line-through font-semibold block leading-none">
              ${getTotals.compareTotal.toFixed(2)}
            </span>
            <span className="text-3xl font-black text-blue-600">
              ${getTotals.activeTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {getTotals.savings > 0 && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-center text-xs font-bold py-2 rounded-xl">
            Congrats! You're saving ${getTotals.savings.toFixed(2)} on your
            security bundle!
          </div>
        )}

        <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-black py-4 rounded-2xl transition-colors duration-200 shadow-sm shadow-violet-100">
          Checkout
        </button>

        <button
          onClick={saveSystemForLater}
          className="block w-full text-center text-xs font-bold text-gray-500 hover:text-gray-700 underline pt-1"
        >
          Save my system for later
        </button>
      </div>
    </div>
  );
};
