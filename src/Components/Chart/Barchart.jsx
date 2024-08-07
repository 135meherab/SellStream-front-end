import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const Barchart = () => {
  return (
    <div style={{ textAlign: 'center', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: 'none' }}>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="name" stroke="#333" />
            <YAxis stroke="#333" />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#008080" />
            <Bar dataKey="uv" fill="#FF6347" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
  );
};

export default Barchart;
