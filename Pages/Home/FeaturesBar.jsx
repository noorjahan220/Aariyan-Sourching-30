

const ShippingIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-gray-800" aria-hidden="true">
    <path d="M2 3h6a4 4 0 0 1 4 4v2" />
    <path d="M12 9H4" />
    <path d="M16 9h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
    <path d="M18 17.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
    <path d="M6 17.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
    <path d="M11 9l1.5 3 2.5-3" />
  </svg>
);

const ReturnsIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-gray-800" aria-hidden="true">
    <path d="M12 2.5a9.5 9.5 0 1 1-9.5 9.5" />
    <path d="M12 15V8l-4 4" />
    <path d="M8.5 10.5h7" />
    <path d="M15.5 13.5h-7" />
  </svg>
);

const SupportIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-gray-800" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 18a6 6 0 0 0-6-6h0a6 6 0 0 0 6-6" />
    <path d="M12 18a6 6 0 0 1 6-6h0a6 6 0 0 1-6-6" />
    <path d="M12 6V3" />
    <path d="M12 21v-3" />
    <path d="M19 12h2" />
    <path d="M3 12h2" />
  </svg>
);

const DiscountIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-gray-800" aria-hidden="true">
    <path d="M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0" />
    <path d="M15 9l-6 6" />
    <path d="M9.5 9.5m-.5 0a.5.5 0 1 0 1 0a.5.5 0 1 0-1 0" />
    <path d="M14.5 14.5m-.5 0a.5.5 0 1 0 1 0a.5.5 0 1 0-1 0" />
  </svg>
);

const featuresData = [
  {
    icon: <ShippingIcon />,
    title: 'Free Shipping',
    subtitle: 'Free for $50+ orders',
  },
  {
    icon: <ReturnsIcon />,
    title: 'Easy Returns',
    subtitle: '14 Days easy return',
  },
  {
    icon: <SupportIcon />,
    title: 'Fast Support',
    subtitle: '24/7 Customer support',
  },
  {
    icon: <DiscountIcon />,
    title: 'Member Discount',
    subtitle: 'Discount for elite members',
  },
];


const FeaturesBar = () => {
  return (
    <section className="bg-[#f9f9f9] py-6 lg:flex lg:h-[126px] lg:items-center">
      <div className="max-w-6xl mx-auto w-full px-4">
        <div className="grid grid-cols-1 divide-y divide-gray-300 border-gray-300 sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
          
          {featuresData.map((feature) => (
            <div 
              key={feature.title}
              className="flex items-center justify-start p-4 sm:justify-center"
            >
              <div className="flex items-center gap-4">
                {feature.icon}
                <div>
                  <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.subtitle}</p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default FeaturesBar;