import React, { useEffect, useState } from "react";
import "../../styles/Partner.css";
import { getResourceDetails } from "../../api/resourceDetailApi";

const Partner = () => {
  const [logos, setLogos] = useState([]);
  const [partnerName, setPartnerName] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const resourceId = "68df34eb32660943bbb4e7be"; 

useEffect(() => {
  const fetchPartners = async () => {
    try {
      const data = await getResourceDetails(resourceId);

      if (data.logo && data.logo.url) {
        setLogos(Array.isArray(data.logo.url) ? data.logo.url : [data.logo.url]);
      }

      if (data.name) {
        setPartnerName(data.name);
      }
    } catch (error) {
      console.error("Failed to fetch partners data", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchPartners();
}, []);


  return (
    <div className="partner-page">
      <section className="partner-hero">
        <h1 className="partner-title">
          {/* {partnerName.en || "Our Trusted Partners"} */}
          Our Trusted Partners
        </h1>
      </section>

      {isLoading ? (
        <p style={{ textAlign: "center" }}>Loading partners...</p>
      ) : (
        <>
          <p className="partner-subtitle">
            We are proud to collaborate with industry-leading companies across
            the world.
          </p>

          <section className="partner-logos">
            {logos.map((logo, i) => (
              <div key={i} className="partner-card">
                <img
                  src={logo}
                  alt={`Partner ${i + 1}`}
                  className="partner-image"
                />
              </div>
            ))}
          </section>

          <section className="partner-info">
            <h2>Why Our Partners Choose Us</h2>
            <p>
              Our partners trust us for our dedication, innovation, and
              commitment to excellence. Together, we create opportunities for
              growth and deliver exceptional value to our clients.
            </p>
          </section>
        </>
      )}
    </div>
  );
};

export default Partner;
