//this is my payment code 

import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Minus, Plus, Share2, Heart, MapPin, Truck, Wallet, Shield } from 'lucide-react';

interface Product {
  image: string;
  title: string;
  price: number;
  discount: number;
  rating: number;
  reviews: number;
}

export default function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state as { product: Product };
  const [quantity, setQuantity] = useState(1);

  const originalPrice = Math.round(product.price / (1 - product.discount / 100));

  const handleBuyNow = () => {
    navigate('/address', {
      state: {
        product,
        quantity,
        totalAmount: product.price * quantity
      }
    });
  };

  const handleAddToCart = () => {
    alert('Product added to cart!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="hover:text-[#F85606] cursor-pointer">Home</span>
            <span>/</span>
            <span className="hover:text-[#F85606] cursor-pointer">Health & Beauty</span>
            <span>/</span>
            <span className="hover:text-[#F85606] cursor-pointer">Bath & Body</span>
            <span>/</span>
            <span className="text-gray-900 truncate">{product.title.substring(0, 50)}...</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-5 bg-white rounded-lg p-6">
            <div className="relative mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[400px] object-contain"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
                <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {[1, 2, 3, 4].map((_, idx) => (
                <img
                  key={idx}
                  src={product.image}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-20 h-20 object-cover border-2 border-gray-200 rounded cursor-pointer hover:border-[#F85606]"
                />
              ))}
            </div>
          </div>

          <div className="col-span-4 bg-white rounded-lg p-6">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg mb-4 inline-block text-sm font-semibold">
              12.12 PRICE LIVE NOW!
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 mb-4 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">
                    {i < Math.floor(product.rating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                Ratings {product.reviews}
              </span>
            </div>

            <div className="border-t border-b border-gray-200 py-4 mb-4">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-[#F85606]">
                  Rs. {product.price}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  Rs. {originalPrice}
                </span>
                <span className="text-sm text-gray-600">
                  -{product.discount}%
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 font-medium">Scent</span>
                <span className="text-gray-600">Not Specified</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-700 font-medium">Quantity</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-2 border-x border-gray-300 min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-[#2ABBE8] text-white py-4 rounded font-medium hover:bg-[#1a9bc9] transition-colors text-lg"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#F85606] text-white py-4 rounded font-medium hover:bg-[#d94805] transition-colors text-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>

          <div className="col-span-3">
            <div className="bg-white rounded-lg p-6 mb-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-600" />
                Delivery Options
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Standard Delivery</div>
                    <div className="text-sm text-gray-600">Get by 22-24 Dec</div>
                    <div className="text-sm font-medium text-gray-900 mt-1">Rs. 165</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Standard Collection Point</div>
                    <div className="text-sm text-gray-600">Get by 22-24 Dec</div>
                    <div className="text-sm font-medium text-gray-900 mt-1">Rs. 50</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Wallet className="w-5 h-5 text-gray-600 mt-1" />
                  <div className="font-medium text-gray-900">Cash on Delivery Available</div>
                </div>
              </div>
            </div>
            
             {/* RETURN & WARRANTY */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex gap-2">
                <Shield /> Return & Warranty
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">✓ 14 days easy return</div>
                <div className="flex gap-2">✕ Warranty not available</div>
              </div>
            </div>


             {/* QR + APP */}
            <div className="bg-white rounded-lg p-4">
              <div className="flex gap-4 items-center">
                <div className="border p-2 rounded">
                  <img
                    src="./dist/assets/daraz scanner.avif"
                    className="w-24 h-24"
                  />
                  <p className="text-xs text-center mt-1">Scan with mobile</p>
                </div>

                <div className="flex-1 bg-white border rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm">
                  {/* ORANGE LOGO BOX */}
                  <div className="w-10 h-10 rounded-lg bg-[#F85606] flex items-center justify-center">
                    <img
                      src="https://img.drz.lazcdn.com/g/tps/imgextra/i1/O1CN01XrNYQP1paGCVispyM_!!6000000005376-2-tps-82-82.png"
                      alt="App Logo"
                      className="w-5 h-5"
                    />
                  </div>



                  {/* TEXT */}
                  <p className="text-sm text-gray-600 leading-snug">
                    Download app to enjoy
                    <br />
                    <span className="font-medium text-gray-700">
                      exclusive discounts!
                    </span>
                  </p>
                </div>



                </div>
            </div>

            {/* SOLD BY */}
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-500">Sold by</p>
                  <p className="font-semibold">ATTASHI MART</p>
                </div>
                <button className="text-blue-600 text-sm">💬 Chat Now</button>
              </div>




            <div className="grid grid-cols-3 text-center border-t pt-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Positive Ratings</p>
                  <b>89%</b>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Ship on Time</p>
                  <b>86%</b>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Chat Response</p>
                  <span className="text-xs text-gray-400">
                    Not enough data
                  </span>
                </div>
              </div>
                <button className="w-full mt-4 border border-blue-500 text-blue-600 py-2 rounded">
                GO TO STORE
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}




