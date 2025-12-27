export default function FlashSale() {
  const products = [
    {
      image: 'https://img.drz.lazcdn.com/g/kf/S617bc4d0a76c48759db935a14617f2bfV.jpg_400x400q80.jpg',
      title: 'Imported Electric Kettle 2Liter stainless steel with automatic switch and rapid boiling and safety quick boiler kettle  tea maker....',
      price: 999,
      originalPrice: 2000,
      discount: 44,
      badge: 'PACK OF 6'
    },
    {
      image: 'https://img.drz.lazcdn.com/static/pk/p/7a33150c9dc7a00c27eaa40435f1f462.png_400x400q80.png',
      title: 'Samsung A55 5G...',
      price: 13000,
      originalPrice: 200000,
      discount: 38
      
    },
    {
      image: 'https://img.drz.lazcdn.com/g/kf/Sea0b0e79b807490aa964ba6c7ca0062aZ.jpg_400x400q80.jpg_.avif',
      title: 'NAVY BLUE BTS PRINTED WINTER WARM FLEECE HOODIE FOR MEN - PREMIUM QUALITY WINTERS HOODIES FOR MEN - NEW ARRIVALS - HOODIES FOR BOYS- HOODIES FOR GIRLS - MEN HOODIES - WINTER CLOTHES FOR GIRLS - DRESS FOR GIRLS - WINTER CLOTHES FOR MEN - MEN HOODIES...',
      price: 250,
      originalPrice: 999,
      discount: 57
    },
    {
      image: 'https://img.drz.lazcdn.com/static/pk/p/921a00da2b21df53a924dd4724487073.jpg_400x400q80.jpg',
      title: 'Beast Fitness Rubber Coated  Exercise Dumbbell ( Single Dumbbell Add to Cart Quantity 2 For Pair)...',
      price: 283,
      originalPrice: 999,
      discount: 26,
      livePrice: true
    },
    {
      image: 'https://img.drz.lazcdn.com/static/pk/p/614d1368b39f256ad7c7f174c9b3e6e0.jpg_400x400q80.jpg',
      title: 'Samsung Chromebook 500C - Celeron processor - 2gb Ram - 16GB SSD - 11.6" screen - Playstore supported',
      price: 6551,
      originalPrice: 12000,
      discount: 48,
      livePrice: true
    },
    {
      image: 'https://img.drz.lazcdn.com/g/kf/S944eecfc475c46dbb64e7a8d74095054q.jpg_400x400q80.jpg',
      title: 'Soft Padded Liftup Fabric Bra for Women & Girls - Imported Blouse Undergarment, Free Size',
      price: 249,
      originalPrice: 520,
      discount: 39,
      livePrice: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Flash Sale</h2>
          <button className="text-[#F85606] font-semibold text-lg border-2 border-[#F85606] px-6 py-2 rounded hover:bg-[#F85606] hover:text-white transition-colors">
            SHOP ALL PRODUCTS
          </button>
        </div>

        <div className="mb-6">
          <div className="inline-block bg-[#F85606] text-white px-4 py-2 rounded-t-lg font-bold">
            On Sale Now
          </div>
        </div>

        <div className="grid grid-cols-6 gap-4">
          {products.map((product, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative">
                {product.livePrice && (
                  <div className="absolute top-2 left-0 bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-r-full">
                    12.12 PRICE<br/>LIVE NOW!
                  </div>
                )}
                {product.badge && (
                  <div className="absolute top-2 left-2 bg-white border-2 border-red-600 text-red-600 text-xs font-bold px-2 py-1 rounded">
                    {product.badge}
                  </div>
                )}
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm text-gray-700 mb-2 h-12 overflow-hidden">
                  {product.title}
                </h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[#F85606] font-bold text-lg">Rs.{product.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 line-through text-sm">Rs.{product.originalPrice}</span>
                  <span className="text-xs text-gray-500">-{product.discount}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
