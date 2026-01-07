import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
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

  const MERCHANT_NAME = 'Mahaseth Mobile All Solution';
  const TERMINAL_ID = '2222610015419744';
  const MERCHANT_ADDRESS = 'Kshireshwarnath MC';

  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const generateKhaltiDeepLink = (): string => {
    const amountInPaisa = Math.floor(totalAmount * 100);
    return `khalti://splash?token=${Date.now()}&amount=${amountInPaisa}&product_name=${encodeURIComponent(product.title)}&product_url=undefined&product_category=&merchant_name=${encodeURIComponent(MERCHANT_NAME)}&public_key=test_public_key_do_not_modify_hJg922FW92EL92d&transaction_uuid=${Date.now()}&merchant=${encodeURIComponent(MERCHANT_NAME)}`;
  };

  const generateESewaDeepLink = (): string => {
    const refId = `${Date.now()}`;
    return `esewa://pay/merchant/details?scd=EPAYTEST&pid=${refId}&amt=${totalAmount}&psc=0&pdc=0&txAmt=0&tAmt=${totalAmount}&su=undefined&fu=undefined`;
  };

  const generateFonePayDeepLink = (): string => {
    return `fonepay://transaction/initiate?amount=${totalAmount}&transaction_uuid=${Date.now()}&terminal_id=${TERMINAL_ID}&product_name=${encodeURIComponent(product.title)}&merchant_name=${encodeURIComponent(MERCHANT_NAME)}`;
  };

  const initiatePayment = (method: string, deepLink: string) => {
    setSelectedMethod(method);
    setIsProcessing(true);

    const timeout = setTimeout(() => {
      setIsProcessing(false);
    }, 2500);

    try {
      window.location.href = deepLink;
    } catch (err) {
      clearTimeout(timeout);
      console.error('Payment error:', err);
      setIsProcessing(false);
    }
  };

  const handleKhalti = () => {
    initiatePayment('Khalti by IME', generateKhaltiDeepLink());
  };

  const handleESewa = () => {
    initiatePayment('eSewa', generateESewaDeepLink());
  };

  const handleFonePay = () => {
    initiatePayment('FonePay', generateFonePayDeepLink());
  };

  const handleCOD = () => {
    alert('Order placed successfully with Cash on Delivery!');
    navigate('/');
  };

  const paymentMethods = [
    {
      id: 'khalti',
      name: 'Khalti by IME',
      subtitle: 'Opens Khalti app to pay via FonePay',
      icon: 'https://khalti.s3.amazonaws.com/image/KHT.png',
      action: handleKhalti,
    },
    {
      id: 'esewa',
      name: 'eSewa Mobile Wallet',
      subtitle: 'Opens eSewa app to pay via FonePay',
      icon: 'https://esewa.com.np/assets/esewa_og.png',
      action: handleESewa,
    },
    {
      id: 'fonepay',
      name: 'FonePay',
      subtitle: 'Direct payment to FonePay account',
      icon: 'https://www.fonepay.com/assets/img/logo.png',
      action: handleFonePay,
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
          <h2 className="text-2xl font-bold mb-2">Opening {selectedMethod}</h2>
          <p className="text-gray-600 mb-2">Launching your payment app...</p>
          <p className="text-sm text-gray-500 mb-6">
            {selectedMethod} will open automatically. If it doesn't open within 3 seconds, please ensure the app is installed on your device.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold">Rs. {totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Terminal:</span>
              <span className="font-semibold text-sm">{TERMINAL_ID}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Merchant:</span>
              <span className="font-semibold text-sm">{MERCHANT_NAME}</span>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 text-left">
            <p className="text-sm font-semibold text-amber-900 mb-2">App not opening?</p>
            <ol className="text-xs text-amber-800 space-y-1 list-decimal list-inside">
              <li>Make sure {selectedMethod} app is installed</li>
              <li>Check your app is updated to latest version</li>
              <li>If using on web, use a mobile device for payment</li>
            </ol>
          </div>

          <button
            onClick={() => setIsProcessing(false)}
            className="w-full bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            Back to Payment Methods
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
          <p className="text-sm text-gray-600 mt-1">All payments credited to: {MERCHANT_NAME}</p>
        </div>

        <div className="divide-y">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={method.action}
              className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-100 transition"
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
