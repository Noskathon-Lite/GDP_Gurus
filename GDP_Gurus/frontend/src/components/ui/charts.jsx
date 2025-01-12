import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '2018', gdp: 2.3 },
  { name: '2019', gdp: 2.5 },
  { name: '2020', gdp: -3.4 },
  { name: '2021', gdp: 5.7 },
  { name: '2022', gdp: 2.6 },
];

const GDPBarChart = () => (
  <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800">
    <ResponsiveContainer width="80%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="gdp" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default GDPBarChart;
