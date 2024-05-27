// src/components/Services.jsx
import React from 'react';

const services = [
  { title: "Service One", description: "Description of service one." },
  { title: "Service Two", description: "Description of service two." },
  { title: "Service Three", description: "Description of service three." }
];

const Services = () => {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
