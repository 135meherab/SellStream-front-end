// src/components/Pricing.jsx
import React from 'react';

const pricingOptions = [
  { plan: "Basic", price: "$10/month", features: ["Feature A", "Feature B", "Feature C"] },
  { plan: "Standard", price: "$20/month", features: ["Feature D", "Feature E", "Feature F"] },
  { plan: "Premium", price: "$30/month", features: ["Feature G", "Feature H", "Feature I"] }
];

const Pricing = () => {
  return (
    <section className="pricing-section">
        <p>Pricing</p>
        <h1>Discover Our Transparent Pricing Plans Find </h1>
        <h1>the Perfect Fit for Your Needs</h1>
        <div className="pricing-container">
            <div className="pricing-card">
                <div className="card-header">
                    Basic Plan
                </div>
                <div className="card-body">
                    <div className="price">$19/month</div>
                    <ul className="features">
                        <li>Create Shop</li>
                        <li>Create Multiple Branch</li>
                        <li>Sales Dashboard</li>
                    </ul>
                </div>
                <div className="card-footer">
                    <a href="#" className="btn">Choose Plan</a>
                </div>
            </div>
            <div className="pricing-card">
                <div className="card-header">
                    Standard Plan
                </div>
                <div className="card-body">
                    <div className="price">$99/year</div>
                    <ul className="features">
                        <li>Create Shop</li>
                        <li>Create Multiple Branch</li>
                        <li>Sales Dashboard</li>
                    </ul>
                </div>
                <div className="card-footer">
                    <a href="#" className="btn">Choose Plan</a>
                </div>
            </div>
            <div className="pricing-card">
                <div className="card-header">
                    Premium Plan
                </div>
                <div className="card-body">
                    <div className="price">$199/lifetime</div>
                    <ul className="features">
                        <li>Create Shop</li>
                        <li>Create Multiple Branch</li>
                        <li>Sales Dashboard</li>
                    </ul>
                </div>
                <div className="card-footer">
                    <a href="#" className="btn">Choose Plan</a>
                </div>
            </div>
        </div>
    </section>
);
};

export default Pricing;
