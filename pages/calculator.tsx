import React from 'react';
import Calculator from '../app/Calculator/Calculator'; 

export default function CalculatorPage() {
  return (
    <div className="calculator-container"> {/* Add a wrapping div for consistency */}
      <Calculator />
    </div>
  );
}