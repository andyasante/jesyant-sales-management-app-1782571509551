import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalesData } from '../store/actions/saleActions';
import { RootState } from '../store/store';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const salesData = useSelector((state: RootState) => state.sales.data);
  const [totalSales, setTotalSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    dispatch(fetchSalesData());
  }, [dispatch]);

  useEffect(() => {
    if (salesData) {
      const total = salesData.length;
      const revenue = salesData.reduce((acc, sale) => acc + sale.amount, 0);
      setTotalSales(total);
      setTotalRevenue(revenue);
    }
  }, [salesData]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sales Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Sales</h2>
          <p className="text-2xl">{totalSales}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Revenue</h2>
          <p className="text-2xl">GHS {totalRevenue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;