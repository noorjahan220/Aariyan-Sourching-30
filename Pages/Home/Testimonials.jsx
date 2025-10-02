'use client'
import { useState } from 'react';
import { IoDiamondOutline, IoStar } from 'react-icons/io5';
import { FaQuoteLeft } from 'react-icons/fa';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';


const img_1 = 'https://i.pravatar.cc/150?u=rachel';
const img_2 = 'https://i.pravatar.cc/150?u=david';
const img_3 = 'https://i.pravatar.cc/150?u=sarah';

const testimonialsData = [
  {
    id: 1,
    image: img_1,
    title: 'They delivered best quality',
    rating: 5,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    name: 'Rachel',
    role: 'Customer'
  },
  {
    id: 2,
    image: img_2,
    title: 'Amazing customer support',
    rating: 5,
    text: "The support team was incredibly responsive and helpful. They resolved my issue within minutes, and their friendly attitude made the experience pleasant. Highly recommended for their excellent service!",
    name: 'David',
    role: 'Client'
  },
  {
    id: 3,
    image: img_3,
    title: 'A truly seamless experience',
    rating: 4,
    text: "From browsing the products to the final checkout, everything was smooth and intuitive. The product arrived on time and exceeded my expectations. I will definitely be a returning customer.",
    name: 'Sarah',
    role: 'Shopper'
  }
];


const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % testimonialsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <section className="bg-white py-10 mb-5">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-5">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800">Your Trust, Our Excellence</h2>
          <div className="flex justify-center items-center my-4 space-x-4">
            <div className="w-16 h-px bg-gray-300"></div>
            <IoDiamondOutline className="w-5 h-5 text-gray-700" />
            <div className="w-16 h-px bg-gray-300"></div>
          </div>
          <p className="text-gray-500">Pride in Every Word You Share</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="hidden lg:flex items-center">
            <button 
              onClick={prevSlide}
              className="w-12 h-[236px] bg-yellow-400 flex items-center justify-center text-gray-800 hover:bg-yellow-500 transition-colors border-r-2 border-yellow-500 flex-shrink-0"
              aria-label="Previous testimonial"
            >
              <FiArrowLeft className="w-6 h-6" />
            </button>
            
            <div className="bg-white w-full overflow-hidden h-[236px]">
              <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonialsData.map((testimonial) => (
                  <div key={testimonial.id} className="w-full bg-[#f9f9f9] h-full p-8 relative flex gap-8 items-center flex-shrink-0">
                    <div className="flex-shrink-0 w-50 h-60 bg-gray-200">
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="relative w-full">
                      <FaQuoteLeft className="absolute -top-8 left-0 text-gray-300 transform -translate-x-3 -translate-y-3 w-10 h-10 md:w-16 md:h-16 md:-translate-x-4 md:-translate-y-4" />
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-800 text-lg">{testimonial.title}</h3>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => <IoStar key={i} className="w-4 h-4 text-yellow-400" />)}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {testimonial.text}
                      </p>
                      <p className="font-semibold text-gray-800">
                        {testimonial.name} <span className="font-normal text-gray-500">- {testimonial.role}</span>
                      </p>
                    </div>
                    <div className='w-2 h-60 bg-amber-400'></div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={nextSlide}
              className="w-12 h-[236px] bg-yellow-400 flex items-center justify-center text-gray-800 hover:bg-yellow-500 transition-colors border-l-2 border-yellow-500 flex-shrink-0"
              aria-label="Next testimonial"
            >
              <FiArrowRight className="w-6 h-6" />
            </button>
          </div>

          <div className="lg:hidden">
            <div className="bg-white w-full overflow-hidden">
                <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                {testimonialsData.map((testimonial) => (
                    <div key={testimonial.id} className="w-full bg-[#f9f9f9] p-6 text-center md:p-8 md:text-left flex-shrink-0">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="flex-shrink-0 w-28 h-28 md:w-32 md:h-32 bg-gray-200 mx-auto">
                                <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="relative w-full">
                                <FaQuoteLeft className="absolute -top-8 left-0 text-gray-300 transform -translate-x-3 -translate-y-3 w-10 h-10 md:w-16 md:h-16 md:-translate-x-4 md:-translate-y-4" />
                                <div className="flex flex-col md:flex-row items-center gap-2 mb-2">
                                  <h3 className="font-bold text-gray-800 text-lg">{testimonial.title}</h3>
                                  <div className="flex">
                                    {[...Array(testimonial.rating)].map((_, i) => <IoStar key={i} className="w-4 h-4 text-yellow-400" />)}
                                  </div>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                  {testimonial.text}
                                </p>
                                <p className="font-semibold text-gray-800">
                                  {testimonial.name} <span className="font-normal text-gray-500">- {testimonial.role}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
            <div className="flex justify-center items-center mt-6 space-x-3">
              <button onClick={prevSlide} className="p-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors" aria-label="Previous testimonial">
                <FiArrowLeft className="w-6 h-6" />
              </button>
              <button onClick={nextSlide} className="p-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors" aria-label="Next testimonial">
                <FiArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;