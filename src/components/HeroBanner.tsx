
import { useEffect, useState } from 'react';

// 🔹 Carousel images (assets folder)
import slide1 from '../assets/carousel img 2.webp';
import slide2 from '../assets/carousel img.avif';
import slide3 from '../assets/carousel img 3.avif';
import slide4 from '../assets/carousel img 4.avif';
import slide5 from '../assets/carousel img 5.avif';
import slide6 from '../assets/carousel img 6.avif';
import slide7 from '../assets/carousel img 7.avif';
import slide8 from '../assets/carousel img 8.avif';
import slide9 from '../assets/carousel img 9.avif';
import slide10 from '../assets/carousel img 10.avif';
import slide11 from '../assets/carousel 11.avif';

import appStore from '../assets/combine app and play.png';
import qrCode from '../assets/daraz scanner.avif';
import darazLogo from '../assets/daraj logo.avif';


const carouselImages = [
  slide1,
  slide2,
  slide3,
  slide4,
  slide5,
  slide6,
  slide7,
  slide8,
  slide9,
  slide10,
  slide11,
];

export default function HomeBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔄 Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 3000); // 3 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* LEFT: CAROUSEL */}
        <div className="lg:col-span-9 relative overflow-hidden rounded-lg h-[360px]">
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {carouselImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`slide-${index}`}
                className="w-full h-full object-cover flex-shrink-0"
              />
            ))}
          </div>

          {/* DOTS */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {carouselImages.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${currentIndex === index
                    ? 'bg-white'
                    : 'bg-white/50'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: APP DOWNLOAD BANNER */}
        <div className="lg:col-span-3 h-[360px] bg-gradient-to-b from-orange-400 to-pink-500 rounded-xl px-4 py-3 text-white flex flex-col justify-between">

          {/* TOP */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src={darazLogo} alt="Daraz" className="w-8 h-8" />
              <span className="font-bold text-lg">TRY DARAZ APP</span>
            </div>

            <div className="inline-flex items-center bg-orange-500 px-3 py-1 rounded-full text-sm font-semibold mb-3">
              ⭐ 4.8 Rated
            </div>

            <div className="bg-white/20 rounded-xl p-2 space-y-2">
              <div className="flex items-center gap-3">
                <div className="bg-white text-orange-500 rounded-lg p-2">🚚</div>
                <span className="text-sm font-semibold">Free Shipping</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white text-pink-500 rounded-lg p-2">🎟️</div>
                <span className="text-sm font-semibold">Exclusive Vouchers</span>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div>
            <div className="flex items-center gap-3 bg-white rounded-xl p-2">
              <img src={qrCode} alt="QR" className="w-20 h-20" />
              <img src={appStore} alt="Store" className="max-w-[120px] h-20 object-contain" />
            </div>

            <p className="text-center text-xs font-semibold mt-1">
              Download the App Now!
            </p>
          </div>

        </div>


      </div>
    </div>
  );
}




