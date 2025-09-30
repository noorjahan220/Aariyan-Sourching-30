'use client';

import React, { useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';
import { FaUsers, FaBoxOpen, FaShoppingCart, FaDollarSign } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

// Register Chart.js components
ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement
);

// --- Reusable Components ---
const StatCard = ({ icon, title, value }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center">
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full mr-4">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    </div>
);

const StatCardSkeleton = () => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 animate-pulse">
        <div className="flex items-center">
            <div className="bg-gray-200 p-3 rounded-full mr-4 w-12 h-12"></div>
            <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-16"></div>
            </div>
        </div>
    </div>
);

// --- Mock API for Chart Data (can be replaced with real API later) ---
const mockApi = {
    fetchChartData: async (timeRange) => {
        await new Promise(res => setTimeout(res, 500)); // Simulate delay
        const generateData = (numPoints, base, variance) => Array.from({ length: numPoints }, () => base + Math.floor(Math.random() * variance) - (variance / 2));
        const generateLabels = (numPoints) => Array.from({ length: numPoints }, (_, i) => `Day ${i + 1}`);
        let numPoints = 30; // Default to 30d
        return {
            userChart: { labels: generateLabels(numPoints), data: generateData(numPoints, 1000, 400) },
            trafficSources: { labels: ['Direct', 'Organic Search', 'Referral', 'Social'], data: [35, 45, 10, 10] },
            deviceUsage: { labels: ['Desktop', 'Mobile', 'Tablet'], data: [60, 35, 5] },
            topPages: [
                { path: '/', views: '15,432' }, { path: '/products', views: '11,120' },
                { path: '/blog/new-features', views: '9,876' }, { path: '/pricing', views: '7,543' },
            ],
        };
    },
};

// --- Main Analytics Dashboard Component ---
const Analytics = () => {
    const [timeRange, setTimeRange] = useState('30d');
    const axiosSecure = useAxiosSecure();

    // --- Data Fetching with React Query ---
    // This hook fetches both real stats and mock chart data in parallel.
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['analyticsDashboard', timeRange],
        queryFn: async () => {
            const [statsResponse, chartData] = await Promise.all([
                axiosSecure.get('/api/stats'), // Fetches real counts
                mockApi.fetchChartData(timeRange) // Fetches mock chart data
            ]);
            return {
                stats: statsResponse.data,
                charts: chartData
            };
        },
        // keepPreviousData: true, // You can enable this for a smoother feel on time range change
    });

    const chartOptions = {
        responsive: true, plugins: { legend: { display: false } },
        scales: { x: { grid: { display: false } }, y: { grid: { color: '#e5e7eb' } } }
    };
    const doughnutOptions = {
        responsive: true, plugins: { legend: { position: 'right' } }
    };

    // Prepare chart data only when data is available
    const userChartData = {
        labels: data?.charts?.userChart?.labels || [],
        datasets: [{
            label: 'Users', data: data?.charts?.userChart?.data || [], borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)', tension: 0.3, fill: true,
        }],
    };

    const sourceChartData = {
        labels: data?.charts?.trafficSources?.labels || [],
        datasets: [{ data: data?.charts?.trafficSources?.data || [], backgroundColor: ['#3b82f6', '#10b981', '#ef4444', '#6366f1'] }],
    };

    const deviceChartData = {
        labels: data?.charts?.deviceUsage?.labels || [],
        datasets: [{ data: data?.charts?.deviceUsage?.data || [], backgroundColor: ['#3b82f6', '#10b981', '#ef4444'] }],
    };


    return (
        <div className="w-full my-7 mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 lg:mb-5">Analytics Dashboard</h1>
            </div>

            {/* Stat Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {isLoading ? (
                    <>
                        <StatCardSkeleton />
                        <StatCardSkeleton />
                        <StatCardSkeleton />
                        <StatCardSkeleton />
                    </>
                ) : isError ? (
                    <p className='col-span-4 text-red-500'>Could not load stats.</p>
                ) : (
                    <>
                        <StatCard icon={<FaUsers size={20} />} title="Total Users" value={data.stats.totalUsers.toLocaleString()} />
                        <StatCard icon={<FaBoxOpen size={20} />} title="Total Products" value={data.stats.totalProducts.toLocaleString()} />
                        <StatCard icon={<FaShoppingCart size={20} />} title="Total Orders" value={data.stats.totalOrders.toLocaleString()} />
                        <StatCard icon={<FaDollarSign size={20} />} title="Revenue (Mock)" value={"$12,450"} />
                    </>
                )}
            </div>

            {/* Main Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Users Over Time</h2>
                <div className="h-80">
                    {isLoading ? <div className='h-full w-full bg-gray-100 animate-pulse rounded'></div> : <Line data={userChartData} options={chartOptions} />}
                </div>
            </div>

            {/* Breakdowns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Top Pages (Mock)</h2>
                    <table className="w-full text-left">
                        <thead className="border-b border-gray-300 text-sm text-gray-500">
                            <tr><th className="py-2">Page Path</th><th className="py-2">Views</th></tr>
                        </thead>
                        <tbody>
                            {data?.charts?.topPages.map(page => (
                                <tr key={page.path} className="border-b border-gray-200 last:border-0 text-gray-700">
                                    <td className="py-3">{page.path}</td><td>{page.views}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Traffic Sources</h2>
                        <div className="h-48 flex items-center justify-center">
                            {isLoading ? <div className='h-40 w-40 bg-gray-100 animate-pulse rounded-full'></div> : <Doughnut data={sourceChartData} options={doughnutOptions} />}
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Device Usage</h2>
                        <div className="h-48 flex items-center justify-center">
                            {isLoading ? <div className='h-40 w-40 bg-gray-100 animate-pulse rounded-full'></div> : <Doughnut data={deviceChartData} options={doughnutOptions} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;