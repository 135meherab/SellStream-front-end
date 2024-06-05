import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../css/landpage.css';

const LineChartComponent = () => {
  // Sample data for the chart
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="chart-container">
        <div className="chart">
          <Line data={lineData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default LineChartComponent;
