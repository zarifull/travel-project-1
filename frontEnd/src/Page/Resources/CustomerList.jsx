import React, { useEffect, useState } from "react";
import CustomersCard from "../../Components/CustomersCard.jsx";
import '../../styles/CustomerList.css';
import { getAllCustomers } from "../../api/customersDetailApi.js";
import { useTranslation } from "react-i18next";

const CustomerList = ({ resourceDetailId = "68ea452fc31cd4050611a3ea", currentLang = "en" }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getAllCustomers(resourceDetailId);
        setCustomers(data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [resourceDetailId]);

  if (loading) return <p style={{ textAlign: "center" }}>{t("common.loading")}</p>;
  if (!customers.length) return <p style={{ textAlign: "center" }}>No customers found</p>;

  return (
    <div className="customer-page">
      <h1 className="customer-title">{t("customers.title")}</h1>

      <div className="customer-grid">
        {customers.map((customer) => (
          <CustomersCard
            key={customer._id}
            customer={customer}
            currentLang={currentLang}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
