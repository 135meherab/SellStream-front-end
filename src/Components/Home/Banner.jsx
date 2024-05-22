// src/components/Banner.jsx
import React from 'react';

const Banner = () => {
  return (
    <section id="banner" className="bg-blue-500 text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our SaaS Product</h1>
        <p className="text-xl mb-6">The best solution for your business needs</p>
        <button className="bg-white text-blue-500 py-2 px-4 rounded">Get Started</button>
      </div>
    </section>
  );
};

export default Banner;
