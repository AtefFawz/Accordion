import React from "react";
import { AccordionItem } from "./AccordionItem";
import { ProductCard } from "./ProductCard";
import { Camera, Shield, Eye, Activity } from "lucide-react";

export const Accordion = ({ productsData }) => {
  const getProductsForStep = (stepNumber) => {
    return (
      productsData?.steps?.find((s) => s.id === stepNumber)?.products || []
    );
  };

  return (
    <div className="border border-gray-200 rounded-2xl bg-red-900  shadow-sm overflow-hidden">
      <AccordionItem
        stepId={1}
        title="Choose your cameras"
        category="Cameras"
        icon={Camera}
        nextStepTitle="Choose your plan"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4  items-stretch">
          {getProductsForStep(1).map((product) => (
            <div
              key={product.id}
              className="flex md:last:col-span-2 md:last:max-w-[calc(50%-8px)] md:last:mx-auto md:last:w-full"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem
        stepId={2}
        title="Choose your plan"
        category="Plan"
        icon={Shield}
        nextStepTitle="Choose your sensors"
      >
        <div className="space-y-4">
          {getProductsForStep(2).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </AccordionItem>

      <AccordionItem
        stepId={3}
        title="Choose your sensors"
        category="Sensors"
        icon={Activity}
        nextStepTitle="Add extra protection"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {getProductsForStep(3).map((product) => (
            <div
              key={product.id}
              className="flex md:last:col-span-2 md:last:max-w-[calc(50%-8px)] md:last:mx-auto md:last:w-full"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem
        stepId={4}
        title="Add extra protection"
        category="Accessories"
        icon={Eye}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {getProductsForStep(4).map((product) => (
            <div
              key={product.id}
              className="flex md:last:col-span-2 md:last:max-w-[calc(50%-8px)] md:last:mx-auto md:last:w-full"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </AccordionItem>
    </div>
  );
};
