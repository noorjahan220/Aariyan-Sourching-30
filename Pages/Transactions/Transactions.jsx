
'use client'

import React, { useState, useMemo, useEffect } from 'react';
import {
  FiSearch,
  FiDownload,
  FiChevronLeft,
  FiChevronRight,
  FiCreditCard,
} from 'react-icons/fi';
import { FaPaypal, FaStripe, FaCcVisa, FaCcMastercard } from 'react-icons/fa';

const transactionHistoryData = [
  { id: 'txn_1', date: '2023-11-05', orderId: 'AYR-9550', customer: { name: 'Chloe Dubois', email: 'chloe.d@example.com' }, amount: 112.0, currency: 'CAD', method: 'Stripe', status: 'Success' },
  { id: 'txn_2', date: '2023-11-04', orderId: 'AYR-9549', customer: { name: 'Ben Carter', email: 'ben.c@example.com' }, amount: 75.5, currency: 'USD', method: 'PayPal', status: 'Success' },
  { id: 'txn_3', date: '2023-11-02', orderId: 'AYR-9548', customer: { name: 'Aisha Khan', email: 'aisha.k@example.com' }, amount: 210.0, currency: 'EUR', method: 'Visa', status: 'Pending' },
  { id: 'txn_4', date: '2023-10-30', orderId: 'AYR-9547', customer: { name: 'Kenji Tanaka', email: 'kenji.t@example.com' }, amount: 95.2, currency: 'JPY', method: 'Mastercard', status: 'Success' },
  { id: 'txn_5', date: '2023-10-28', orderId: 'AYR-9546', customer: { name: 'Sophie Dubois', email: 'sophie.d@example.com' }, amount: 320.75, currency: 'CAD', method: 'Stripe', status: 'Failed' },
  { id: 'txn_6', date: '2023-10-25', orderId: 'AYR-9545', customer: { name: 'Mateo Garcia', email: 'mateo.g@example.com' }, amount: 55.0, currency: 'USD', method: 'PayPal', status: 'Refunded' },
  { id: 'txn_7', date: '2023-10-24', orderId: 'AYR-9544', customer: { name: 'Isabella Rossi', email: 'isabella.r@example.com' }, amount: 199.99, currency: 'EUR', method: 'Visa', status: 'Success' },
  { id: 'txn_8', date: '2023-10-22', orderId: 'AYR-9543', customer: { name: 'Liam Chen', email: 'liam.c@example.com' }, amount: 89.99, currency: 'GBP', method: 'PayPal', status: 'Success' },
  { id: 'txn_9', date: '2023-10-20', orderId: 'AYR-9542', customer: { name: 'Elena Rodriguez', email: 'elena.r@example.com' }, amount: 145.5, currency: 'USD', method: 'Stripe', status: 'Success' },
];

const StatusBadge = ({ status }) => {
  const styles = {
    Success: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Failed: 'bg-red-100 text-red-800',
    Refunded: 'bg-blue-100 text-blue-800',
  };
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
};

const PaymentMethodIcon = ({ method }) => {
  const icons = {
    Stripe: <FaStripe className="text-indigo-600 text-2xl" />,
    PayPal: <FaPaypal className="text-blue-600 text-2xl" />,
    Visa: <FaCcVisa className="text-blue-800 text-2xl" />,
    Mastercard: <FaCcMastercard className="text-red-600 text-2xl" />,
  };
  return icons[method] || <FiCreditCard className="text-gray-500 text-2xl" />;
};

const Transaction = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredTransactions = useMemo(() => {
    return transactionHistoryData
      .filter((tx) => {
        const q = searchTerm.toLowerCase();
        return (
          tx.orderId.toLowerCase().includes(q) ||
          tx.customer.name.toLowerCase().includes(q) ||
          tx.customer.email.toLowerCase().includes(q)
        );
      })
      .filter((tx) => statusFilter === 'all' || tx.status === statusFilter);
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredTransactions]);

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(start, start + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="max-w-6xl my-7">
      <div>
        
          
          <p className="mt-1  font-semibold text-xl text-gray-700">Review a complete log of all past transactions.</p>
        

        <main className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="py-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="relative  md:flex-1">
              <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Order ID, name, email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="all">All Statuses</option>
                <option value="Success">Success</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
                <FiDownload />
                <span>Export</span>
              </button>
            </div>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600">Order ID</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Date</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Customer</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Amount</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Method</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 text-sm text-gray-600 font-mono">{tx.orderId}</td>
                    <td className="p-4 text-sm text-gray-700">{tx.date}</td>
                    <td className="p-4 text-sm text-gray-700">
                      <div className="font-medium">{tx.customer.name}</div>
                      <div className="text-xs text-gray-500">{tx.customer.email}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-800 font-semibold">
                      {tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {tx.currency}
                    </td>
                    <td className="p-4"><PaymentMethodIcon method={tx.method} /></td>
                    <td className="p-4"><StatusBadge status={tx.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden">
            {paginatedTransactions.map((tx) => (
              <div key={tx.id} className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{tx.customer.name}</p>
                    <p className="text-sm text-gray-500 font-mono">{tx.orderId}</p>
                  </div>
                  <StatusBadge status={tx.status} />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <PaymentMethodIcon method={tx.method} />
                    <span className="text-gray-600">{tx.date}</span>
                  </div>
                  <p className="font-semibold text-sm text-gray-900">
                    {tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {tx.currency}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 text-center sm:text-left">
              Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredTransactions.length)}</span> of{' '}
              <span className="font-semibold">{filteredTransactions.length}</span> results
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border rounded-md disabled:opacity-50 hover:bg-gray-100"
              >
                <FiChevronLeft />
              </button>
              <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border rounded-md disabled:opacity-50 hover:bg-gray-100"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Transaction;
