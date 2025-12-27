import { Search, ShoppingCart } from 'lucide-react';
import logo from '../assets/d logo.png'; // 👈 apna correct path rakhein

export default function Header() {
  return (
    <header className="bg-[#F85606] text-white">
      <div className="bg-[#F85606] px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-end gap-6 text-xs font-medium">
          <a href="#" className="hover:underline">SAVE MORE ON APP</a>
          <a href="#" className="hover:underline">SELL ON DARAZ</a>
          <a href="#" className="hover:underline">HELP & SUPPORT</a>
          <a href="#" className="hover:underline">LOGIN</a>
          <a href="#" className="hover:underline">SIGN UP</a>
          <a href="#" className="hover:underline">اردو میں دیکھیں</a>
        </div>
      </div>

      <div className="px-4 py-4 border-t border-[#F97316]">
        <div className="max-w-7xl mx-auto flex items-center gap-8">
          
          {/* LOGO SECTION */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Daraz Logo"
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* SEARCH BAR */}
          <div className="flex-1 max-w-3xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search in Daraz"
                className="w-full px-4 py-2.5 rounded text-gray-700 outline-none placeholder-gray-400"
              />
              <button className="absolute right-0 top-0 h-full px-6 bg-[#FFF5F0] hover:bg-gray-100 rounded-r transition-colors">
                <Search className="w-5 h-5 text-[#F85606]" />
              </button>
            </div>
          </div>

          {/* CART ICON */}
          <button className="hover:opacity-90 transition-opacity">
            <ShoppingCart className="w-7 h-7" />
          </button>
        </div>
      </div>
    </header>
  );
}

