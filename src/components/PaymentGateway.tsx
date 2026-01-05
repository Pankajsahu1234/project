import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronRight, Banknote, X } from 'lucide-react';

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

  const MERCHANT_NAME = import.meta.env.VITE_MERCHANT_NAME || 'Mahaseth Mobile All Solution';
  const TERMINAL_ID = import.meta.env.VITE_TERMINAL_ID || '2222610015419744';
  const MERCHANT_ADDRESS = import.meta.env.VITE_MERCHANT_ADDRESS || 'Kshireshwarnath MC';
  const QR_CODE_URL = import.meta.env.VITE_QR_CODE_URL || '';

  const [isLoading, setIsLoading] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const handleMobileWallet = (method: string) => {
    setIsLoading(true);
    setSelectedMethod(method);
    setShowQRModal(true);
    setIsLoading(false);
  };

  const handlePaymentDone = () => {
    alert(`Thank you! Payment via ${selectedMethod} received. Your order will be processed shortly.`);
    setShowQRModal(false);
    navigate('/');
  };

  const handleCOD = () => {
    alert('Order placed successfully with Cash on Delivery!');
    navigate('/');
  };

  const paymentMethods = [
    {
      id: 'khalti',
      name: 'Khalti by IME',
      subtitle: 'Mobile Wallet - Scan QR to pay',
      icon: 'https://khalti.s3.amazonaws.com/image/KHT.png',
      action: () => handleMobileWallet('Khalti by IME'),
    },
    {
      id: 'esewa',
      name: 'eSewa Mobile Wallet',
      subtitle: 'eSewa - Scan QR to pay',
      icon: 'https://esewa.com.np/assets/esewa_og.png',
      action: () => handleMobileWallet('eSewa'),
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

      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Scan to Pay</h3>
              <button
                onClick={() => setShowQRModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 mb-4 flex items-center justify-center min-h-80">
              {QR_CODE_URL ? (
                <img src={QR_CODE_URL} alt="Payment QR Code" className="w-full h-full object-contain" />
              ) : (
                <div className="text-center">
                  <div className="w-48 h-48 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">QR Code will be displayed here</span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 space-y-3">
              <div>
                <p className="text-xs text-gray-600">Payment Method</p>
                <p className="font-semibold text-gray-900">{selectedMethod}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Amount</p>
                <p className="font-semibold text-lg text-orange-600">Rs. {totalAmount}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Merchant</p>
                <p className="font-semibold text-gray-900">{MERCHANT_NAME}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Terminal ID</p>
                <p className="font-semibold text-gray-900">{TERMINAL_ID}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Address</p>
                <p className="font-semibold text-gray-900">{MERCHANT_ADDRESS}</p>
              </div>
            </div>

            <p className="text-sm text-blue-700 bg-blue-50 p-3 rounded mb-4">
              Scan the QR code with your {selectedMethod} app to complete payment
            </p>

            <div className="flex gap-3">
              <button
                onClick={handlePaymentDone}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Payment Done
              </button>
              <button
                onClick={() => setShowQRModal(false)}
                className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
