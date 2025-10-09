import React from "react";
import "../../styles/Customer.css";
import customer1 from '../../Assets/member.jpeg'
import customer2 from '../../Assets/member.jpeg'
import customer3 from '../../Assets/member.jpeg'

const  Customer = () => {
  const testimonials = [
    {
      name: "Emily Johnson",
      image: customer1,
      comment: "The team was fantastic — fast, reliable, and truly professional!",
    },
    {
      name: "David Brown",
      image: customer2,
      comment: "A wonderful experience from start to finish. Highly recommended!",
    },
    {
      name: "Sophia Martinez",
      image: customer3,
      comment: "They understood our needs perfectly and exceeded expectations.",
    },
  ];

  return (
    <div className="customer-page">
      <section className="customer-hero">
        <h1 className="customer-title">Our Happy Customers</h1>
        <p className="customer-subtitle">
          Real stories from real clients who trust and grow with us.
        </p>
      </section>

      <section className="customer-testimonials">
        {testimonials.map((item, index) => (
          <div key={index} className="customer-card">
            <img src={item.image} alt={item.name} className="customer-photo" />
            <h3>{item.name}</h3>
            <p>"{item.comment}"</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Customer;
