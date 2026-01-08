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

  const initiatePaymentWithFallback = (method: string, deepLink: string, webUrl: string) => {
    setSelectedMethod(method);
    setIsProcessing(true);

    const timeout = setTimeout(() => {
      window.location.href = webUrl;
    }, 1500);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimeout(timeout);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    window.location.href = deepLink;

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(timeout);
    };
  };

  const handleKhalti = () => {
    const transactionId = `${Date.now()}`;
    const amountInPaisa = Math.floor(totalAmount * 100);

    const deepLink = `khalti://splash?token=${transactionId}&amount=${amountInPaisa}&product_name=${encodeURIComponent(product.title)}&merchant_name=${encodeURIComponent(MERCHANT_NAME)}&public_key=test_public_key_do_not_modify_hJg922FW92EL92d&transaction_uuid=${transactionId}`;

    const webUrl = `https://khalti.com/api/payment/initiate/?amount=${amountInPaisa}&merchant_name=${encodeURIComponent(MERCHANT_NAME)}&return_url=${encodeURIComponent(window.location.origin + '/payment-success')}&website_url=${encodeURIComponent(window.location.origin)}&product_identity=${transactionId}&product_name=${encodeURIComponent(product.title)}`;

    initiatePaymentWithFallback('Khalti by IME', deepLink, webUrl);
  };

  const handleESewa = () => {
    const transactionId = `${Date.now()}`;

    const deepLink = `esewa://pay/merchant/details?scd=EPAYTEST&pid=${transactionId}&amt=${totalAmount}&psc=0&pdc=0&txAmt=0&tAmt=${totalAmount}&su=${encodeURIComponent(window.location.origin + '/payment-success')}&fu=${encodeURIComponent(window.location.origin + '/payment-failed')}`;

    const webUrl = `https://esewa.com.np/epay/main?amt=${totalAmount}&psc=0&pdc=0&txAmt=0&tAmt=${totalAmount}&pid=${transactionId}&scd=EPAYTEST&su=${encodeURIComponent(window.location.origin + '/payment-success')}&fu=${encodeURIComponent(window.location.origin + '/payment-failed')}`;

    initiatePaymentWithFallback('eSewa', deepLink, webUrl);
  };

  const handleFonePay = () => {
    const transactionId = `${Date.now()}`;

    const deepLink = `fonepay://transaction/initiate?amount=${totalAmount}&transaction_uuid=${transactionId}&terminal_id=${TERMINAL_ID}&product_name=${encodeURIComponent(product.title)}&merchant_name=${encodeURIComponent(MERCHANT_NAME)}&return_url=${encodeURIComponent(window.location.origin + '/payment-success')}`;

    const webUrl = `https://www.fonepay.com/services/?amt=${totalAmount}&txn=${transactionId}&prd=${encodeURIComponent(product.title)}&mrn=${encodeURIComponent(MERCHANT_NAME)}&crncy=NPR&mel=test@example.com&mpc=${TERMINAL_ID}&md=W&su=${encodeURIComponent(window.location.origin + '/payment-success')}&fu=${encodeURIComponent(window.location.origin + '/payment-failed')}`;

    initiatePaymentWithFallback('FonePay', deepLink, webUrl);
  };

  const handleCOD = () => {
    alert('Order placed successfully with Cash on Delivery!');
    navigate('/');
  };

  const paymentMethods = [
    {
      id: 'khalti',
      name: 'Khalti by IME',
      subtitle: 'Pay securely using Khalti wallet or bank',
      icon: 'https://khalti.s3.amazonaws.com/image/KHT.png',
      action: handleKhalti,
    },
    {
      id: 'esewa',
      name: 'eSewa Mobile Wallet',
      subtitle: 'Pay securely using eSewa wallet',
      icon: 'https://esewa.com.np/assets/esewa_og.png',
      action: handleESewa,
    },
    {
      id: 'fonepay',
      name: 'FonePay',
      subtitle: 'Pay directly via FonePay gateway',
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
          <h2 className="text-2xl font-bold mb-2">Processing with {selectedMethod}</h2>
          <p className="text-gray-600 mb-2">Redirecting to payment page...</p>
          <p className="text-sm text-gray-500 mb-6">
            You will be taken to {selectedMethod} payment page. Complete payment there and you will be redirected back.
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
            <p className="text-sm font-semibold text-amber-900 mb-2">Page not loading?</p>
            <ol className="text-xs text-amber-800 space-y-1 list-decimal list-inside">
              <li>Check your internet connection</li>
              <li>Make sure to allow pop-ups and redirects</li>
              <li>If stuck, click Back and try another payment method</li>
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
