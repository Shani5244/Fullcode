import React from 'react';
import './Style.css';

const EarningsReport = ({ data }) => {
  const totalEarnings = data.reduce((sum, item) => sum + item.amount, 0);
  const completedJobs = data.length;

  return (
    <div className="earnings-report-container">
      <h2>Earnings Report</h2>

      <div className="summary-boxes">
        <div className="summary-box total">
          <h4>Total Earnings</h4>
          <p>₹ {totalEarnings.toLocaleString()}</p>
        </div>
        <div className="summary-box jobs">
          <h4>Completed Jobs</h4>
          <p>{completedJobs}</p>
        </div>
      </div>

      <div className="earnings-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Service</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={entry.id}>
                <td>{index + 1}</td>
                <td>{entry.service}</td>
                <td>{entry.customer}</td>
                <td>{entry.date}</td>
                <td>{entry.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EarningsReport;
