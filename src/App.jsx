import React from "react";
import { Accordion } from "./components/Accordion";
import { ReviewPanel } from "./components/ReviewPanel";
import productsData from "./data/products.json";

function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-2 xl:px-8">
      <div className="container  mx-auto">
        <header className="mb-8 hidden sm:block">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight text-center">
            Let's get started!
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-8 gap-x-4 items-start">
          <div className="lg:col-span-2 space-y-6">
            <Accordion productsData={productsData} />
          </div>

          <div className="lg:col-span-1">
            <ReviewPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
