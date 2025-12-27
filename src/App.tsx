
// import { Routes, Route, Outlet } from 'react-router-dom'; 
// import Header from './components/Header';
// import HeroBanner from './components/HeroBanner';
// import PromoBanner from './components/PromoBanner';
// import FlashSale from './components/FlashSale';
// import Categories from './components/Categories';
// import JustForYou from './components/JustForYou';
// import Footer from './components/Footer';
// import InternationalBar from './components/InternationalBar';
// import DarazContentSection from './components/DarazContentSection';
// import ProductDetail from './components/ProductDetail'; 
// import AddressForm from './components/AddressForm';
// import PaymentGateway from './components/PaymentGateway';

// function Layout() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <HeroBanner />
//       <PromoBanner />
//       <FlashSale />
//       <Categories />
//       <JustForYou />
//       <Footer />
//       <DarazContentSection />
//       <InternationalBar />
//     </div>
//   );
// }

// function MainPage() {
//   return <Layout />;
// }

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<MainPage />} />
//       <Route path="/product-detail" element={<ProductDetail />} />
//       <Route path="/address" element={<AddressForm />} />
//         <Route path="/payment" element={<PaymentGateway />} />
//     </Routes>
//   );
// }

// export default App;










import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import PromoBanner from './components/PromoBanner';
import FlashSale from './components/FlashSale';
import Categories from './components/Categories';
import JustForYou from './components/JustForYou';
import Footer from './components/Footer';
import InternationalBar from './components/InternationalBar';
import DarazContentSection from './components/DarazContentSection';

import ProductDetail from './components/ProductDetail';
import AddressForm from './components/AddressForm';
import PaymentGateway from './components/PaymentGateway';

/* ---------------- HOME PAGE ---------------- */
function HomePage() {
  return (
    <>
      <Header />
      <HeroBanner />
      <PromoBanner />
      <FlashSale />
      <Categories />
      <JustForYou />
      <DarazContentSection />
      <Footer />
      <InternationalBar />
    </>
  );
}

/* -------- COMMON LAYOUT (NON-HOME) -------- */
function CommonPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <InternationalBar />
    </>
  );
}

/* ---------------- APP ---------------- */
export default function App() {
  return (
    <Routes>
      {/* HOME */}
      <Route path="/" element={<HomePage />} />

      {/* PRODUCT DETAIL */}
      <Route
        path="/product-detail"
        element={
          <CommonPage>
            <ProductDetail />
          </CommonPage>
        }
      />

      {/* ADDRESS */}
      <Route
        path="/address"
        element={
          <CommonPage>
            <AddressForm />
          </CommonPage>
        }
      />

      {/* PAYMENT */}
      <Route
        path="/payment"
        element={
          <CommonPage>
            <PaymentGateway />
          </CommonPage>
        }
      />
    </Routes>
  );
}
