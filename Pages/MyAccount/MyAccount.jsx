'use client';

import React, { useState } from 'react';
import OrdersContent from './OrdersContent';
import DownloadsContent from './DownloadsContent';
import AddressContent from './AddressContent';

import PaymentForm from './PaymentForm';
import Account from './Account';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import useAuth from '../../Hooks/useAuth';
import CommonBanner from '../../components/CommonBanner';


// --- Icon Components (No changes here) ---
const DashboardIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);
const OrderIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);
// const DownloadIcon = ({ className }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//     <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
//     <polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>
//   </svg>
// );
const AddressIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);
const PaymentMethodIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);
const AccountDetailsIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);
const LogoutIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const BigOrdersIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M2 3h12l3 6H4l-2-6zM4 9h12.5a.5.5 0 01.5.5v1.2a.3.3 0 01-.3.3H4.3a.3.3 0 01-.3-.3V9.5a.5.5 0 01.5-.5z" />
      <path d="M2.5 11h15v8a1 1 0 01-1 1h-13a1 1 0 01-1-1v-8z" />
      <path d="M12 2v2M7 2v2M17 2v2" />
    </svg>
);
// const BigDownloadsIcon = ({ className }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
//     <path d="M19.5 13.5v3a1 1 0 01-1 1h-13a1 1 0 01-1-1v-3" />
//     <path d="M12 14.5l-3-3h2.5V3h1v8.5H15l-3 3z" />
//   </svg>
// );
const BigAddressesIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M12 2a8 8 0 018 8c0 5-8 12-8 12S4 15 4 10a8 8 0 018-8zm0 5a3 3 0 100 6 3 3 0 000-6z" />
  </svg>
);
const BigPaymentMethodIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20M6 14h2" />
  </svg>
);
const BigAccountDetailsIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M12.5 12.5a3.5 3.5 0 10-5 0 5 5 0 00-4 4v1h17v-1a5 5 0 00-4-4" />
    <path d="M17 3l4 4M14 6l4-4" />
  </svg>
);
const BigLogoutIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8M9 15h6" />
  </svg>
);

const dashboardItems = [
  { name: 'Dashboard', icon: DashboardIcon },
  { name: 'Orders', icon: OrderIcon },
  // { name: 'Downloads', icon: DownloadIcon },
  { name: 'Address', icon: AddressIcon },
  { name: 'Payment Method', icon: PaymentMethodIcon },
  { name: 'Account Details', icon: AccountDetailsIcon },
];

const dashboardGridItems = [
  { name: 'Orders', icon: BigOrdersIcon },
  // { name: 'Downloads', icon: BigDownloadsIcon },
  { name: 'Addresses', icon: BigAddressesIcon },
  { name: 'Payment Method', icon: BigPaymentMethodIcon },
  { name: 'Account Details', icon: BigAccountDetailsIcon },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  
  const router = useRouter();

  const auth = useAuth();
      if (!auth) return null;
      const {  user } = auth;

// / Logout confirmation
  // const handleLogout = () => {
  //   toast(
  //     (t) => (
  //       <div className="flex flex-col space-y-2">
  //         <p>Are you sure you want to logout?</p>
  //         <div className="flex justify-end space-x-2">
  //           <button
  //             onClick={() => toast.dismiss(t.id)}
  //             className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
  //           >
  //             No
  //           </button>
  //           <button
  //             onClick={() => {
  //               logOut();
  //               toast.dismiss(t.id);
  //               toast.success('You are logged out');
  //               router.push('/');
  //             }}
  //             className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
  //           >
  //             Yes
  //           </button>
  //         </div>
  //       </div>
  //     ),
  //     { duration: Infinity }
  //   );
  // };




  const renderContent = () => {
    // --- 2. UPDATE THIS FUNCTION ---
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div>
            <div className="bg-gray-100 p-6 mb-10">
              <p className="text-gray-700">
                Hello <span className="font-semibold">{user?.displayName}</span>
              </p>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7">
            {dashboardGridItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className="bg-gray-100 p-8 flex flex-col items-center justify-center space-y-4 hover:bg-gray-200 transition-colors"
              >
                <item.icon className="w-12 h-12 text-gray-700" />
                <span className="text-gray-800">{item.name}</span>
              </button>
            ))}
          </div>
          </div>
         
        );
      case 'Orders':
        return <OrdersContent />;
      // case 'Downloads':
      //   return <DownloadsContent />;
      case 'Address':
        return <AddressContent></AddressContent>;
      case 'Account Details':
        return <Account></Account>;
      case 'Payment Method':
        return <PaymentForm></PaymentForm>;
      default:
        return (
          <div className="bg-gray-100 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{activeTab}</h2>
            <p>Content for {activeTab} goes here...</p>
          </div>
        );
    }
  };

  return (

    <>
 <CommonBanner title={"My Account"} breadcrumb={"my account"} ></CommonBanner>
     <div className="bg-white p-8 lg:p-12">
      <div className="container mx-auto">
        <div className="flex flex-col max-w-6xl mx-auto lg:flex-row gap-8">
          
          <aside className="lg:w-1-4 w-64 h-[490px]">
            <div className="border border-gray-200">
              <h2 className="bg-yellow-400 text-gray-800 font-semibold p-4">My Account</h2>
              <ul>
                {dashboardItems.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => setActiveTab(item.name)}
                      className={`w-full text-left p-4 flex items-center gap-4 border-b border-gray-200 transition-colors
                        ${activeTab === item.name 
                          ? 'bg-gray-100 font-semibold' 
                          : 'hover:bg-gray-50'
                        }`}
                    >
                      <item.icon className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          
          <main className="flex-1">
            
            {renderContent()}
          </main>

        </div>
      </div>
    </div>
    </>
   
  );
}