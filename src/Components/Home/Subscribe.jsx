// src/components/Subscribe.jsx
import React from 'react';

const Subscribe = () => {
  return (
    <section id="subscribe" className="py-20 bg-blue-500 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Subscribe to our Newsletter</h2>
        <form className="flex flex-col md:flex-row justify-center items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-lg mb-4 md:mb-0 md:mr-4"
          />
          <button className="bg-white text-blue-500 py-2 px-4 rounded">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default Subscribe;
