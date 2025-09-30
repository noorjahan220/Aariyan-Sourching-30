
const Newsletter = () => {
  // Image URL variable
  const img_1 = "/newsletter.jpg";

  return (
    <section 
      className="bg-gray-300 py-20"  
      style={{
        backgroundImage: `url(${img_1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
      }} 
    >
      <div className="container mx-auto px-4 text-center mb-10">
        
        <h2 className="text-4xl font-bold text-white mb-4">
          Join Our Newsletter
        </h2>
        
        <p className="text-white max-w-xl mx-auto mb-10">
          Sign up to receive the latest promotional information and get a 20% discount on the first online payment
        </p>

        <div 
          className="max-w-md mx-auto" 
        >
          <div className="flex items-center bg-gray-700 rounded-full p-1">
            <input 
              type="email" 
              placeholder="Your email address"
              className="w-full bg-transparent text-white placeholder-gray-300 px-5 py-2 focus:outline-none"
            />
            <button 
              className="bg-yellow-500 text-white font-semibold text-sm px-8 py-2 rounded-full hover:bg-yellow-600 transition-colors"
            >
              SUBMIT
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Newsletter;
