// src/components/Review.jsx
import React from 'react';

const reviews = [
  { name: "John Doe", review: "This product is amazing!" },
  { name: "Jane Smith", review: "I love using this product." },
  { name: "Sam Wilson", review: "Highly recommend to everyone." }
];

const Review = () => {
  return (
    <section id="review" className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <p className="mb-4">"{review.review}"</p>
              <h4 className="text-xl font-bold">{review.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Review;
