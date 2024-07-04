import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleAnswer = (id) => {
    setActiveQuestion(id === activeQuestion ? null : id);
  };

  return (
    <section className="asked">
      <div className="faq-container">
        <p>Have Any Question?</p>
        <h1>Here Some Questions Answer</h1>
        {faqData.map((item, index) => (
          <div className="question-box" key={index}>
            <h5
              className={`question ${activeQuestion === item.id ? 'active' : ''}`}
              onClick={() => toggleAnswer(item.id)}
            >
              {item.question}
              <FontAwesomeIcon
                icon={activeQuestion === item.id ? faChevronUp : faChevronDown}
                className="icon"
              />
            </h5>
            
            <div className={`answer ${activeQuestion === item.id ? 'active fade-in' : 'fade-out'}`}>
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const faqData = [
  {
    id: 'q1',
    question: 'How Does a POS System Benefit My Business?',
    answer: 'A POS system can streamline operations, improve customer satisfaction, track sales data, manage inventory, and more. It provides comprehensive analytics to help you make informed business decisions.',
  },
  {
    id: 'q2',
    question: 'Can I Integrate the POS System with My Online Store?',
    answer: 'Yes, most modern POS systems can be integrated with your online store to synchronize sales, inventory, and customer data, providing a seamless shopping experience both online and offline.',
  },
  {
    id: 'q3',
    question: 'Do I Need Special Training to Use a POS System?',
    answer: 'While some systems are very intuitive, others may require training. It\'s essential to choose a system with good support and training resources to ensure smooth operation.',
  },
  {
    id: 'q4',
    question: 'What Kind of Sales Analytics Does a POS System Provide?',
    answer: 'A POS system provides analytics such as sales trends, inventory levels, customer preferences, and employee performance, helping you optimize your business strategy.',
  },
  {
    id: 'q5',
    question: 'How Can I Choose the Right POS System for My Business?',
    answer: 'Consider your business type, size, budget, required features, and future growth potential. Research various options, read reviews, and choose a system that aligns with your needs.',
  },
];

export default FAQ;
