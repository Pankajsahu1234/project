import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronRight, Banknote, Loader, AlertCircle } from 'lucide-react';

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
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [error, setError] = useState<string>('');

  const processPayment = async (method: string) => {
    setIsLoading(true);
    setError('');
    setSelectedMethod(method);

    try {
      const transactionRef = `TXN${Date.now()}`;

      const paymentData = {
        product_title: product.title,
        quantity,
        amount: totalAmount,
        payment_method: method,
        transaction_ref: transactionRef,
        status: 'pending',
      };

      const response = await fetch(`${SUPABASE_URL}/functions/v1/process-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          ...paymentData,
          terminal_id: TERMINAL_ID,
          merchant_name: MERCHANT_NAME,
        }),
      });

      if (!response.ok) {
        throw new Error('Payment processing failed');
      }

      const data = await response.json();

      if (data.paymentLink) {
        window.open(data.paymentLink, '_blank');
        setIsProcessing(true);
        setShowPaymentModal(true);
      } else {
        setError('Unable to generate payment link');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment processing failed');
      console.error('Payment error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKhalti = async () => {
    await processPayment('Khalti');
  };

  const handleESewa = async () => {
    await processPayment('eSewa');
  };

  const handleFonePay = async () => {
    await processPayment('FonePay');
  };

  const handlePaymentCompleted = async () => {
    try {
      await fetch(`${SUPABASE_URL}/functions/v1/process-payment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          status: 'completed',
        }),
      });

      alert(`Payment via ${selectedMethod} completed successfully!`);
      setShowPaymentModal(false);
      setIsProcessing(false);
      navigate('/');
    } catch (err) {
      setError('Failed to confirm payment');
    }
  };

  const handleCOD = () => {
    alert('Order placed successfully with Cash on Delivery!');
    navigate('/');
  };

  const paymentMethods = [
    {
      id: 'khalti',
      name: 'Khalti by IME',
      subtitle: 'Mobile Wallet - Fast & Secure',
      icon: 'https://khalti.s3.amazonaws.com/image/KHT.png',
      action: handleKhalti,
    },
    {
      id: 'esewa',
      name: 'eSewa Mobile Wallet',
      subtitle: 'eSewa - Fast & Secure',
      icon: 'https://esewa.com.np/assets/esewa_og.png',
      action: handleESewa,
    },
    {
      id: 'fonepay',
      name: 'FonePay',
      subtitle: 'Mobile Payment - Fast & Secure',
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
        <div className="border-b px-6 py-4">
          <h1 className="text-2xl font-bold">Select Payment Method</h1>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

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

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-center mb-6">
              <Loader className="w-12 h-12 text-orange-600 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">{selectedMethod} Payment</h2>
            <p className="text-gray-600 text-center mb-4">Payment window opened. Complete the payment in the opened window and click button below.</p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold">Rs. {totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Method:</span>
                <span className="font-semibold">{selectedMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Merchant:</span>
                <span className="font-semibold text-sm">{MERCHANT_NAME}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePaymentCompleted}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Payment Done
              </button>
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setIsProcessing(false);
                }}
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
