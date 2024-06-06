import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const PieChartComponent = () => {
  const doughnutData = {
    labels: ['Sales', 'Product', 'Customer'],
    datasets: [
      {
        label: 'Number',
        data: [45, 35, 20],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
      },
    ],
  };

  
  return (
    <div className="chart">
      <Doughnut data={doughnutData} options={{ responsive: true }} />
    </div>
  );
};

export default PieChartComponent;


