import Image from "next/image";
import { IoClose } from "react-icons/io5";


const SizeChartModal = ({sizeChartImg,setIsSizeGuideOpen}) => {
    return (
       <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
         <div className="bg-white w-full max-w-[800px] max-h-[90vh] rounded-lg overflow-hidden flex flex-col">
           {/* Header */}
           <div className="flex justify-between items-center p-3 border-b border-gray-200">
             <h2 className="text-lg font-semibold text-gray-900">Size Chart</h2>
             <button
               onClick={() => setIsSizeGuideOpen(false)}
               className="text-gray-400 hover:text-gray-600"
             >
               <IoClose size={22} />
             </button>
           </div>
     
           {/* Image Section */}
           <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
             <Image
               src={sizeChartImg}
               alt="Size Chart Image"
               width={800}
               height={400}
               className="object-contain max-w-full max-h-[75vh]"
             />
           </div>
         </div>
       </div>
    );
};

export default SizeChartModal;