
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useState } from 'react'; // Loading और QR के लिए
// import { ChevronRight, Wallet, CreditCard, Banknote } from 'lucide-react';
// // import QRCode from 'qrcode.react'; // QR fallback के लिए (npm i qrcode.react)

// interface Product {
//   image: string;
//   title: string;
//   price: number;
//   discount: number;
//   rating: number;
//   reviews: number;
// }

// interface Address {
//   recipientName: string;
//   phoneNumber: string;
//   region: string;
//   address: string;
//   landmark: string;
//   addressCategory: string;
// }

// interface LocationState {
//   product: Product;
//   quantity: number;
//   totalAmount: number;
//   addressId: string;
//   address: Address;
// }

// export default function PaymentGateway() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { product, quantity, totalAmount } = location.state as LocationState;

//   // Env से लोड करें (gitignore में .env रखें)
//   const UPI_ID = process.env.REACT_APP_UPI_ID || 'yourrealvpa@paytm'; // Fallback
//   const MERCHANT_NAME = process.env.REACT_APP_MERCHANT_NAME || 'Your Shop Name';
//   const MERCHANT_CODE = process.env.REACT_APP_MERCHANT_CODE || 'YOUR_MC_123';
//   const CALLBACK_URL = process.env.REACT_APP_CALLBACK_URL || 'https://yourwebsite.com/success';

//   const [isLoading, setIsLoading] = useState(false);
//   const [showQR, setShowQR] = useState(false); // QR fallback के लिए
//   const [deepLinkForQR, setDeepLinkForQR] = useState(''); // QR में लिंक पास करने के लिए

//   const handlePayment = async (method: string) => {
//     if (method === 'phonepe' || method === 'gpay') {
//       setIsLoading(true);
//       const payeeAddress = UPI_ID;
//       const payeeName = MERCHANT_NAME;
//       const transactionNote = `${product.title} - Order Payment`;
//       const amount = totalAmount.toFixed(2);
//       const currency = 'INR';
//       const transactionRef = `ORDER_${Date.now()}`; // यूनिक रेफ

//       // Signature (बैकएंड API से - Razorpay/NPCI से कॉल करें)
//       let sign = '';
//       try {
//         const payload = `${payeeAddress}|${payeeName}|${amount}|${currency}|${transactionNote}`;
//         const response = await fetch('/api/generate-upi-signature', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ payload, orderId: transactionRef })
//         });
//         const { signature } = await response.json();
//         sign = signature;
//       } catch (error) {
//         console.error('Signature error:', error);
//         // Fallback: बिना signature के ट्राई (टेस्ट के लिए)
//       }

//       let deepLink = `upi://pay?pa=${encodeURIComponent(payeeAddress)}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=${currency}&tn=${encodeURIComponent(transactionNote)}&tr=${encodeURIComponent(transactionRef)}&mc=${encodeURIComponent(MERCHANT_CODE)}&url=${encodeURIComponent(CALLBACK_URL)}`;
//       if (sign) deepLink += `&sign=${encodeURIComponent(sign)}`;


//         console.log('Generated deepLink:', deepLink);  

//       setDeepLinkForQR(deepLink); // QR के लिए सेव

//       // Device चेक
//       if (/Android|iPhone/i.test(navigator.userAgent)) {
//         const supported = window.open(deepLink, '_blank');
//         if (!supported) {
//           alert('UPI ऐप इंस्टॉल नहीं है। PhonePe/GPay डाउनलोड करें और बैंक लिंक करें।');
//           setShowQR(true); // QR fallback
//         } else {
//           // टाइमआउट पर स्टेटस चेक (रियल में Webhook/API यूज़ करें)
//           setTimeout(() => {
//             alert('पेमेंट सफल? /success पेज चेक करें।');
//             navigate('/success');
//           }, 45000);
//         }
//       } else {
//         alert('मोबाइल पर ट्राई करें।');
//         setShowQR(true); // QR fallback डेस्कटॉप पर
//       }
//       setIsLoading(false);
//     } else {
//       // COD
//       alert(`Order placed successfully with ${method}!`);
//       navigate('/');
//     }
//   };


//   const paymentMethods = [
//     {
//       id: 'phonepe',
//       name: 'PhonePe',
//       subtitle: 'UPI Payment',
//       icon: 'https://www.phonepe.com/static/media/phonepe-logo.4c3b9b3b.svg',
//       bgColor: 'bg-gradient-to-r from-orange-500 to-orange-600'
//     },
//     {
//       id: 'gpay',
//       name: 'Google Pay',
//       subtitle: 'UPI Payment',
//       icon: 'https://www.gstatic.com/images/branding/product/1x/gpay_48dp.png',
//       bgColor: 'bg-gradient-to-r from-green-500 to-green-600'
//     },
//     {
//       id: 'cod',
//       name: 'Cash on Delivery',
//       subtitle: 'Pay when product arrives',
//       icon: null,
//       bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-3xl mx-auto px-6 py-8">
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">

//           {/* Header */}
//           <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
//             <h1 className="text-2xl font-bold text-gray-900">
//               Select Payment Method
//             </h1>
//           </div>

//           {/* Payment Methods */}
//           <div className="divide-y divide-gray-200">
//             {paymentMethods.map((method) => (
//               <button
//                 key={method.id}
//                 onClick={() => handlePayment(method.id)}
//                 disabled={isLoading}
//                 className={`w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors group ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//               >
//                 <div className="flex items-center gap-4">
//                   <div className={`w-14 h-14 rounded-lg ${method.bgColor} flex items-center justify-center shadow-md`}>
//                     {method.icon ? (
//                       <img
//                         src={method.icon}
//                         alt={method.name}
//                         className="w-10 h-10 object-contain rounded"
//                       />
//                     ) : (
//                       <Banknote className="w-8 h-8 text-white" />
//                     )}
//                   </div>

//                   <div className="text-left">
//                     <h3 className="text-lg font-semibold text-gray-900">
//                       {method.name}
//                     </h3>
//                     <p className="text-sm text-gray-600">
//                       {method.subtitle}
//                     </p>
//                   </div>
//                 </div>

//                 <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gray-600" />
//               </button>
//             ))}
//           </div>

//           {/* Security Badges */}
//           <div className="border-t-8 border-gray-100 px-6 py-6">
//             <div className="flex items-center justify-center gap-4 mb-6">
//               <img
//                 src="data:image/png;base64,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"
//                 alt="Norton"
//                 className="h-8 opacity-40"
//               />
//               <img
//                 src="data:image/png;base64,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"
//                 alt="PCI"
//                 className="h-8 opacity-40"
//               />
//               <div className="flex items-center gap-1 opacity-40">
//                 <span className="text-sm font-semibold">Verified by</span>
//                 <CreditCard className="w-5 h-5" />
//                 <span className="text-sm font-bold">VISA</span>
//               </div>
//               <img
//                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png"
//                 alt="Mastercard"
//                 className="h-8 opacity-40"
//               />
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
//             <h2 className="font-semibold text-gray-900 mb-4">
//               Order Summary
//             </h2>

//             <div className="flex gap-4">
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="w-24 h-24 object-cover rounded border border-gray-200"
//               />

//               <div className="flex-1">
//                 <h3 className="text-sm text-gray-900 mb-2 line-clamp-2">
//                   {product.title}
//                 </h3>
//                 <div className="text-sm text-gray-600">
//                   <p>Quantity: {quantity}</p>
//                   <p>Price: Rs. {product.price}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Total */}
//           <div className="border-t border-gray-200 bg-gray-50 px-6 py-5">
//             <div className="flex items-center justify-between mb-3">
//               <span className="text-gray-700 text-lg">Subtotal</span>
//               <span className="text-gray-900 text-lg font-semibold">
//                 Rs. {totalAmount}
//               </span>
//             </div>

//             <div className="flex items-center justify-between pt-3 border-t border-gray-300">
//               <span className="text-gray-900 text-xl font-bold">
//                 Total Amount
//               </span>
//               <span className="text-[#F85606] text-2xl font-bold">
//                 Rs. {totalAmount}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* QR Fallback Modal (अगर showQR true हो) */}
//         {showQR && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white p-6 rounded-lg max-w-sm mx-auto">
//               <h3 className="text-lg font-bold mb-4">UPI QR Code से पेमेंट करें</h3>
//               {/* <QRCode value={deepLinkForQR} size={200} />  // अनकमेंट करें */}
//               <p className="text-sm text-gray-600 mt-2">GPay/PhonePe से स्कैन करें। अमाउंट: Rs. {totalAmount}</p>
//               <button 
//                 onClick={() => setShowQR(false)} 
//                 className="mt-4 w-full bg-gray-500 text-white py-2 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// ye rhne de 







// ye vala block ho rha hai bar bar 
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronRight, Banknote } from 'lucide-react';

interface Product {
  image: string;
  title: string;
  price: number;
}

interface LocationState {
  product: Product;
  quantity: number;
  totalAmount: number;
}

export default function PaymentGateway() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, quantity, totalAmount } =
    location.state as LocationState;

  // ✅ NORMAL P2P UPI (PERSONAL)
  const UPI_ID =
    import.meta.env.VITE_UPI_ID || 'rishabhjhade060-@oksbi';

  const [isLoading, setIsLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [upiLinkForQR, setUpiLinkForQR] = useState('');

  const handleUPIPayment = () => {
    setIsLoading(true);

    const amount = totalAmount.toFixed(2);

    // ✅ PURE P2P UPI LINK (NO MERCHANT PARAMS)
    const upiLink = `upi://pay?pa=${encodeURIComponent(
      UPI_ID
    )}&am=${amount}&cu=INR`;

    console.log('UPI LINK:', upiLink);
    setUpiLinkForQR(upiLink);

    const isMobile = /Android|iPhone|iPad/i.test(
      navigator.userAgent
    );

    if (isMobile) {
      window.location.href = upiLink;
    } else {
      setShowQR(true);
    }

    setIsLoading(false);
  };

  const handleCOD = () => {
    alert('Order placed successfully with Cash on Delivery');
    navigate('/');
  };

  const paymentMethods = [
    {
      id: 'gpay',
      name: 'Khalti by IME',
      subtitle: 'UPI Payment',
      icon: 'https://khaltibyime.khalti.com/wp-content/uploads/2025/07/cropped-Logo-for-Blog-1024x522.png',
      action: handleUPIPayment,
    },
    {
      id: 'phonepe',
      name: 'eSewa Mobile Wallet',
      subtitle: 'UPI Payment',
      icon: 'data:image/png;base64,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',
      action: handleUPIPayment,
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      subtitle: 'Pay when product arrives',
      icon: null,
      action: handleCOD,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">

        {/* HEADER */}
        <div className="border-b px-6 py-4">
          <h1 className="text-2xl font-bold">
            Select Payment Method
          </h1>
        </div>

        {/* PAYMENT METHODS */}
        <div className="divide-y">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={method.action}
              disabled={isLoading}
              className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center">
                  {method.icon ? (
                    <img
                      src={method.icon}
                      alt={method.name}
                      className="w-10"
                    />
                  ) : (
                    <Banknote className="w-8 h-8" />
                  )}
                </div>

                <div className="text-left">
                  <h3 className="text-lg font-semibold">
                    {method.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {method.subtitle}
                  </p>
                </div>
              </div>

              <ChevronRight />
            </button>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div className="p-6 border-t">
          <h2 className="font-semibold mb-4">
            Order Summary
          </h2>

          <div className="flex gap-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-24 h-24 object-cover rounded"
            />
            <div>
              <p className="font-medium">{product.title}</p>
              <p className="text-sm text-gray-600">
                Quantity: {quantity}
              </p>
              <p className="text-sm text-gray-600">
                Price: ₹{product.price}
              </p>
            </div>
          </div>
        </div>

        {/* TOTAL */}
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-orange-600">
            ₹{totalAmount}
          </span>
        </div>
      </div>

      {/* QR MODAL */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded max-w-sm w-full text-center">
            <h3 className="font-bold text-lg mb-3">
              Scan with UPI App
            </h3>

            {/* QR CODE YAHAN LAG SAKTA HAI */}
            {/* <QRCode value={upiLinkForQR} size={200} /> */}

            <p className="text-sm text-gray-600 mt-2">
              Google Pay / PhonePe se scan kare
            </p>

            <button
              onClick={() => setShowQR(false)}
              className="mt-4 w-full bg-gray-700 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}












