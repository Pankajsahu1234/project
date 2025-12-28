import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ChevronRight, Banknote, Loader } from 'lucide-react';

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
  const { product, quantity, totalAmount } = location.state as LocationState;

  const UPI_ID = import.meta.env.VITE_UPI_ID || 'rishabhjhade060-1@oksbi';
  const PAYEE_NAME = import.meta.env.VITE_PAYEE_NAME || 'Store Name';

  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleFocus = () => {
      if (isProcessing) {
        setIsProcessing(false);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [isProcessing]);

  const handleUPIPayment = () => {
    setIsLoading(true);
    const amount = totalAmount.toFixed(2);
    const transactionNote = `Order: ${product.title.substring(0, 30)}`;
    const upiLink = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

    console.log('Opening UPI App with link:', upiLink);

    setIsProcessing(true);
    window.location.href = upiLink;

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleCOD = () => {
    alert('Order placed successfully with Cash on Delivery!');
    navigate('/');
  };

  const paymentMethods = [
    {
      id: 'gpay',
      name: 'Google Pay / PhonePe',
      subtitle: 'UPI Payment - Opens instantly',
      icon: 'https://www.gstatic.com/images/branding/product/1x/gpay_48dp.png',
      action: handleUPIPayment,
    },
    {
      id: 'upi',
      name: 'Any UPI App',
      subtitle: 'Paytm, BHIM, etc. - Opens instantly',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/200px-UPI-Logo-vector.svg.png',
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

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow p-8 text-center">
          <div className="flex justify-center mb-6">
            <Loader className="w-12 h-12 text-orange-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Opening UPI App</h2>
          <p className="text-gray-600 mb-4">Your UPI app is opening. Please complete the payment.</p>
          <p className="text-sm text-gray-500">Amount: Rs. {totalAmount}</p>
          <p className="text-sm text-gray-500 mt-2">Receiving UPI: {UPI_ID}</p>
          <button
            onClick={() => {
              setIsProcessing(false);
              setIsLoading(false);
            }}
            className="mt-6 w-full bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
        <div className="border-b px-6 py-4">
          <h1 className="text-2xl font-bold">Select Payment Method</h1>
        </div>

        <div className="divide-y">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={method.action}
              disabled={isLoading}
              className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-100 disabled:opacity-50 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center">
                  {method.icon ? (
                    <img src={method.icon} alt={method.name} className="w-10 h-10 object-contain" />
                  ) : (
                    <Banknote className="w-8 h-8 text-gray-600" />
                  )}
                </div>

                <div className="text-left">
                  <h3 className="text-lg font-semibold">{method.name}</h3>
                  <p className="text-sm text-gray-500">{method.subtitle}</p>
                </div>
              </div>

              <ChevronRight className="text-gray-400" />
            </button>
          ))}
        </div>

        <div className="p-6 border-t">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          <div className="flex gap-4">
            <img src={product.image} alt={product.title} className="w-24 h-24 object-cover rounded border" />
            <div>
              <p className="font-medium line-clamp-2">{product.title}</p>
              <p className="text-sm text-gray-600">Quantity: {quantity}</p>
              <p className="text-sm text-gray-600">Price: Rs. {product.price}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-gray-50 flex justify-between text-lg font-bold">
          <span>Total Amount</span>
          <span className="text-orange-600">Rs. {totalAmount}</span>
        </div>
      </div>
    </div>
  );
}
