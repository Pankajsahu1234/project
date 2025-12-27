import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronRight, Banknote, Copy, Check } from 'lucide-react';

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
  const [showManualPayment, setShowManualPayment] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleUPIPayment = () => {
    setIsLoading(true);

    const amount = totalAmount.toFixed(2);
    const transactionNote = `Order: ${product.title.substring(0, 30)}`;

    const upiLink = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

    console.log('Generated UPI Link:', upiLink);

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      const intentLink = `intent://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`;

      window.location.href = intentLink;

      setTimeout(() => {
        const confirmPayment = window.confirm(
          'Payment completed? Click OK if payment was successful, or Cancel to try again.'
        );

        if (confirmPayment) {
          alert('Order placed successfully! We will verify your payment and process your order.');
          navigate('/');
        } else {
          setShowManualPayment(true);
        }
      }, 5000);
    } else {
      setShowManualPayment(true);
    }

    setIsLoading(false);
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCOD = () => {
    alert('Order placed successfully with Cash on Delivery!');
    navigate('/');
  };

  const paymentMethods = [
    {
      id: 'gpay',
      name: 'Google Pay / PhonePe',
      subtitle: 'UPI Payment',
      icon: 'https://www.gstatic.com/images/branding/product/1x/gpay_48dp.png',
      action: handleUPIPayment,
    },
    {
      id: 'upi',
      name: 'Any UPI App',
      subtitle: 'Paytm, BHIM, etc.',
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

      {showManualPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Complete UPI Payment</h3>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800 mb-3">
                1. Open any UPI app (Google Pay, PhonePe, Paytm, BHIM)
              </p>
              <p className="text-sm text-blue-800 mb-3">
                2. Send money to this UPI ID:
              </p>

              <div className="bg-white border-2 border-blue-300 rounded-lg p-3 flex items-center justify-between">
                <span className="font-bold text-lg text-gray-900">{UPI_ID}</span>
                <button
                  onClick={handleCopyUPI}
                  className="ml-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>

              <p className="text-sm text-blue-800 mt-3">
                3. Amount to pay: <span className="font-bold">Rs. {totalAmount}</span>
              </p>
              <p className="text-sm text-blue-800 mt-2">
                4. After payment, click "Payment Done" below
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  alert('Thank you! We will verify your payment and process your order shortly.');
                  navigate('/');
                }}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Payment Done
              </button>
              <button
                onClick={() => setShowManualPayment(false)}
                className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              After payment, keep the transaction ID for verification
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
