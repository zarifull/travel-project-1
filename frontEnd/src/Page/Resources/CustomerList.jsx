import React, { useEffect, useState } from "react";
import { getAllCustomerDetails } from '../../api/resourceDetailApi';
import '../../styles/CustomerList.css';
import CustomersCard from "../../Components/CustomersCard.jsx";


const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getAllCustomerDetails();
        setCustomers(data);
      } catch (error) {
        console.error("Failed to load customer details:", error);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div className="customer-list">
      <h1 className="customer-title">Our Happy Customers</h1>

      <div className="customer-grid">
      {customers.map((customer) => (
          <CustomersCard key={customer._id} customer={customer} />
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
