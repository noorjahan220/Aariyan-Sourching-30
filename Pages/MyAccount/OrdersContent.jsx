import React from 'react';

const StarIcon = () => (
  <svg className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ordersData = [
  {
    id: 1,
    name: 'Women floral dress',
    size: 'S',
    price: 99.00,
    status: 'Delivered',
    date: 'Sun, Jan 31',
    image: 'https://picsum.photos/seed/order1/100/100',
  },
  {
    id: 2,
    name: 'Women floral dress',
    size: 'S',
    price: 99.00,
    status: 'Delivered',
    date: 'Sun, Jan 31',
    image: 'https://picsum.photos/seed/order2/100/100',
  },
  {
    id: 3,
    name: 'Women floral dress',
    size: 'S',
    price: 99.00,
    status: 'Delivered',
    date: 'Sun, Jan 31',
    image: 'https://picsum.photos/seed/order3/100/100',
  },
  {
    id: 4,
    name: 'Women floral dress',
    size: 'S',
    price: 99.00,
    status: 'Canceled',
    date: 'Aug 8 2020',
    image: 'https://picsum.photos/seed/order4/100/100',
  },
];

const OrderItem = ({ order }) => {
  const isDelivered = order.status === 'Delivered';

  return (
    <div className="border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center sm:h-[154px] justify-between gap-6">
      
      <div className="flex items-center gap-6 flex-1">
        <div className="w-20 h-24 bg-gray-200 flex-shrink-0">
          <img src={order.image} alt={order.name} className="w-full h-full object-cover" />
        </div>
        <div className='lg:mb-5'>
          <p className="font-semibold text-gray-800">{order.name}</p>
          <p className="text-sm text-gray-500">Size: {order.size}</p>
        </div>
      </div>

      <div className="w-full sm:w-24 text-gray-800 font-semibold lg:mb-10 text-left">
        ${order.price.toFixed(2)}
      </div>

      <div className="w-full sm:w-64">
        <div className="flex items-center mb-1">
          <span className={`w-2.5 h-2.5 rounded-full mr-2 ${isDelivered ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <p className="text-sm text-gray-800">
            {order.status} on {order.date}
          </p>
        </div>
        <p className="text-xs text-gray-500 mb-2 lg:pl-0 pl-[18px]">
          Your item has been delivered
        </p>
        {isDelivered && (
          <button className="flex items-center text-sm text-yellow-600 font-semibold lg:pl-0 pl-[18px]">
            <StarIcon />
            Rate & Review Product
          </button>
        )}
      </div>

    </div>
  );
};

export default function OrdersContent() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        My orders
      </h1>
      <div className="space-y-4">
        {ordersData.map(order => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}