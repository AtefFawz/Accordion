import React from "react";
import { useBundleStore } from "../store/useBundleStore";

export const ProductCard = ({ product }) => {
  const {
    id,
    title,
    description,
    basePrice,
    compareAtPrice,
    discountBadge,
    image,
    variants,
    category,
  } = product;

  const cart = useBundleStore((state) => state.cart);
  const activeVariants = useBundleStore((state) => state.activeVariants);
  const setVariant = useBundleStore((state) => state.setVariant);
  const updateQuantity = useBundleStore((state) => state.updateQuantity);

  const currentVariantId = activeVariants[id] || "default";
  const cartKey = `${id}-${currentVariantId}`;

  const currentQuantity = cart[cartKey]?.quantity || 0;
  const isSelected = currentQuantity > 0;

  const handleIncrement = () => {
    updateQuantity(id, currentVariantId, currentQuantity + 1, {
      title:
        variants.length > 0
          ? `${title} (${variants.find((v) => v.id === currentVariantId)?.label})`
          : title,
      price: basePrice,
      compareAtPrice,
      category,
      image: image,
    });
  };

  const handleDecrement = () => {
    updateQuantity(id, currentVariantId, Math.max(0, currentQuantity - 1), {
      title,
      price: basePrice,
      compareAtPrice,
      category,
      image,
    });
  };

  return (
    <div
      className={`relative flex flex-row p-4 bg-white border-2 rounded-3xl transition-all duration-300 w-full h-full gap-4 ${
        isSelected
          ? "border-[#3F3DC1] shadow-md ring-1 ring-[#3F3DC1]"
          : "border-gray-100 hover:border-gray-200 shadow-sm"
      }`}
    >
      <div className="w-[100px] sm:w-[120px] flex items-center justify-center bg-transparent shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-auto max-h-[110px] object-contain"
          onError={(e) => {
            e.target.src = "https://placehold.co/120x110?text=Wyze+Product";
          }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-[14px] sm:text-[15px] font-black text-gray-900 leading-snug">
            {title}
          </h4>

          <p className="text-[11px] text-gray-500 mt-1 leading-relaxed line-clamp-2 min-h-[32px]">
            {description}
          </p>
          <a
            href="#learn-more"
            className="text-[11px] text-blue-600 font-bold underline mt-1 inline-block"
          >
            Learn More
          </a>
        </div>

        {variants && variants.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariant(id, v.id)}
                className={`flex items-center space-x-1 px-2.5 py-0.5 border rounded-md text-[10px] font-bold transition-all ${
                  currentVariantId === v.id
                    ? "border-gray-900 bg-gray-50 text-gray-900"
                    : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full border border-gray-300"
                  style={{ backgroundColor: v.colorCode }}
                />
                <span>{v.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="h-6.5 mt-2" />
        )}

        <div className="flex items-center justify-between flex-wrap gap-2 mt-3 pt-2 border-t border-gray-50">
          <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm shrink-0">
            <button
              onClick={handleDecrement}
              disabled={currentQuantity === 0}
              className={`px-2 py-1 text-xs font-black transition-colors ${
                currentQuantity === 0
                  ? "text-gray-300 bg-gray-50 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              —
            </button>
            <span className="px-2 text-xs font-black text-gray-900 min-w-[16px] text-center">
              {currentQuantity}
            </span>
            <button
              onClick={handleIncrement}
              className="px-2 py-1 text-xs font-black text-gray-600 hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>

          <div className="text-right leading-none shrink-0">
            {compareAtPrice && (
              <span className="block text-[11px] text-red-500 line-through font-bold mb-0.5">
                ${compareAtPrice.toFixed(2)}
              </span>
            )}
            <span className="text-[15px] sm:text-[16px] font-black text-gray-900">
              ${basePrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
