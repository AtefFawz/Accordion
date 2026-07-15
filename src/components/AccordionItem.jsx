import React from "react";
import { useBundleStore } from "../store/useBundleStore";

export const AccordionItem = ({
  stepId,
  title,
  category,
  icon: Icon,
  children,
  nextStepTitle,
}) => {
  const openStepId = useBundleStore((state) => state.openStepId);
  const setOpenStep = useBundleStore((state) => state.setOpenStep);
  const nextStep = useBundleStore((state) => state.nextStep);
  const getDistinctCountForCategory = useBundleStore(
    (state) => state.getDistinctCountForCategory,
  );

  const isOpen = openStepId === stepId;
  const selectedCount = getDistinctCountForCategory(category);

  return (
    <div
      className={`border-b border-gray-200 overflow-hidden transition-all duration-300 ${isOpen ? "bg-[#EDF4FF]" : "bg-gray-50"}`}
    >
      <button
        onClick={() => setOpenStep(isOpen ? null : stepId)}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
      >
        <div className="flex items-center space-x-4">
          <div
            className={`p-2 rounded-lg ${isOpen ? "bg-blue-50 text-blue-600" : "text-gray-400"}`}
          >
            {Icon && <Icon className="w-6 h-6" />}
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
              Step {stepId} of 4
            </span>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-nowrap">
          {selectedCount > 0 && (
            <span className="md:text-sm text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              {selectedCount} selected
            </span>
          )}
          <svg
            className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen
            ? "max-h-[3000px] opacity-100 border-t border-gray-100 p-5 overflow-visible"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        {isOpen && (
          <div className="flex flex-col">
            <div className="mb-6">{children}</div>

            {stepId < 4 && nextStepTitle && (
              <div className="flex justify-end border-t border-gray-100 pt-4 w-full">
                <button
                  onClick={nextStep}
                  className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition-colors duration-200 w-full md:w-auto shrink-0"
                >
                  <span>Next: {nextStepTitle}</span>
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
