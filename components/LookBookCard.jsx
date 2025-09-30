import { HeartIcon } from "@heroicons/react/24/solid";


export default function LookBookCard({product}) {
  return (
     <div className="w-full">
    <div className="relative bg-gray-200 aspect-square">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      <button className="absolute top-3 right-3 p-1">
        <HeartIcon />
      </button>
    </div>
    <div className="pt-3">
      <p className="text-sm text-gray-800">{product.name}</p>
      <p className="text-sm text-gray-500 mt-1">${product.price}</p>
    </div>
  </div>
  )
}
