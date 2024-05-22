// src/components/Pricing.jsx
import React from 'react';

const pricingOptions = [
  { plan: "Basic", price: "$10/month", features: ["Feature A", "Feature B", "Feature C"] },
  { plan: "Standard", price: "$20/month", features: ["Feature D", "Feature E", "Feature F"] },
  { plan: "Premium", price: "$30/month", features: ["Feature G", "Feature H", "Feature I"] }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingOptions.map((option, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">{option.plan}</h3>
              <p className="text-xl mb-4">{option.price}</p>
              <ul className="mb-4">
                {option.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button className="bg-blue-500 text-white py-2 px-4 rounded">Choose Plan</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
