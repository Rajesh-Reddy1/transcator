"use client";
import Context from "./Context"; // Import your Calculator component

export default function CalculatorPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Context />
    </main>
  );
}
