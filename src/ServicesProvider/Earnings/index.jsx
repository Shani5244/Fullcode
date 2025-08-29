import React, { useEffect, useState } from "react";
import { getReportByProvider } from "../../API/EarningsApi";

const Earnings = () => {
  const provider = JSON.parse(localStorage.getItem("loggedInProvider"));
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    const fetchEarnings = async () => {
      if (provider?._id) {   // usually MongoDB id hota hai "_id"
        const response = await getReportByProvider(provider._id);
        if (response?.success) {
          const total = response.reports[0]?.totalEarnings || 0;
          setEarnings(total);
        }
      }
    };
    fetchEarnings();
  }, [provider?._id]);

  return (
    <div>
      <h2>Total Earnings</h2>
      <p>💰 ₹{earnings}</p>
    </div>
  );
};

export default Earnings;
