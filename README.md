# Wyze Custom Security Bundle Builder

A highly optimized, responsive, and pixel-perfect React prototype reconstructing the custom security bundle builder experience with a live review panel. 

## 🚀 Live Demo
[👉 Click here to experience the Live Demo](https://accordion-nu-eight.vercel.app/)

---

## 🛠️ Tech Stack & Architecture Decisions

*   **React & Vite:** Chosen for blazing-fast development server start times and optimal production builds.
*   **Tailwind CSS:** Employed to precisely mirror the Figma design (spacing, rounded corners, active/inactive borders) and build a highly fluid responsive layout.
*   **Zustand (Slices Pattern):** State is modularly divided into `cartSlice.js` (business logic, calculations, persistence) and `uiSlice.js` (accordion active states, variant tracking). This keeps the code clean, scalable, and extremely easy to test.

---

## ✨ Implemented Features & Edge Cases Handled

*   **Variant-Specific Quantity Tracking:** Solved the complex variant state challenge. Quantities of different colors of the same product (e.g., White and Black) are tracked independently using composite keys (`${productId}-${variantId}`) in the global store.
*   **Symmetrical Grid & Equal Heights:** Cards in the same grid row dynamically stretch to maintain the exact same height (`items-stretch`). Additionally, if there is an odd number of products (like the 5 cameras in Step 1), the final card is beautifully centered on desktop viewports.
*   **Dual-Directional Syncing:** Quantity steppers are fully synchronized in real-time across the product cards on the left and the category groups in the review panel on the right.
*   **Smart Defensive Coding:** Handled standard rendering pitfalls like missing images or unassigned categories gracefully using optional chaining and default prop values.
*   **State Persistence ("Save my system for later"):** Custom configurations are saved locally via `localStorage` and fully restored upon page reloads or return visits.

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── Accordion.jsx        # Standardizes the steps grid
│   ├── AccordionItem.jsx    # Handles individual step animations & step progression
│   ├── ProductCard.jsx      # Implements horizontal card UX & active variant stepper
│   └── ReviewPanel.jsx      # Summarizes selections, pricing, and savings
├── data/
│   ├── products.json        # Data-driven product catalog
│   └── seedCart.js          # Pre-populated initial basket to match Figma
├── store/
│   ├── slices/
│   │   ├── cartSlice.js     # Cart operations, totals logic, and persistence
│   │   └── uiSlice.js       # Accordion steps navigation & color selections
│   └── useBundleStore.js    # Consolidated global store (Orchestrator)
