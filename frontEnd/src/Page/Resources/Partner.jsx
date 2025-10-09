import React from "react";
import "../../styles/Partner.css";
import partner1 from "../../Assets/logotip.png";
import partner2 from "../../Assets/logotip.png";
import partner3 from "../../Assets/logotip.png";

const  Partner = () => {
  return (
    <div className="partner-page">
      <section className="partner-hero">
        <h1 className="partner-title">Our Trusted Partners</h1>
        <p className="partner-subtitle">
          We are proud to collaborate with industry-leading companies across the world.
        </p>
      </section>

      <section className="partner-logos">
        {[partner1, partner2, partner3].map((logo, i) => (
          <div key={i} className="partner-card">
            <img src={logo} alt={`Partner ${i + 1}`} className="partner-image" />
          </div>
        ))}
      </section>

      <section className="partner-info">
        <h2>Why Our Partners Choose Us</h2>
        <p>
          Our partners trust us for our dedication, innovation, and commitment to excellence. 
          Together, we create opportunities for growth and deliver exceptional value to our clients.
        </p>
      </section>
    </div>
  );
}

export default Partner;
