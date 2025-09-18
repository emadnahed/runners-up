import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { load } from '@cashfreepayments/cashfree-js';

const app_env = import.meta.env.VITE_PUBLIC_APP_ENV;

interface UpiApp {
  id: string;
  name: string;
  available: boolean;
}

const PaymentCashfree: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const orderId = searchParams.get('orderId');

  const [isLoading, setIsLoading] = useState(true);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success' | ''>('');
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const cashfreeRef = useRef<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isInWebView, setIsInWebView] = useState(false);

  const upiApps: UpiApp[] = [
    { id: 'phonepe', name: 'PhonePe', available: true },
    { id: 'paytm', name: 'Paytm', available: true },
    { id: 'gpay', name: 'Google Pay', available: true },
    { id: 'default', name: 'Other UPI App', available: true },
    { id: 'web', name: 'UPI Link', available: true },
  ];

  useEffect(() => {
    // Check if we're in a WebView (React Native)
    const checkWebView = () => {
      const userAgent = navigator.userAgent || '';
      const isRNWebView =
        userAgent.includes('ReactNative') ||
        typeof (window as any).ReactNativeWebView !== 'undefined';
      setIsInWebView(isRNWebView);
      console.log('WebView detection:', { isRNWebView, userAgent });
    };
    checkWebView();
  }, []);

  const initializeSDK = useCallback(async () => {
    try {
      const cashfree = await load({
        mode: app_env,
      });
      cashfreeRef.current = cashfree;
      console.log('Cashfree SDK initialized');
      return cashfree;
    } catch (error) {
      console.error('Error initializing Cashfree SDK:', error);
      setPaymentMessage('Failed to initialize payment SDK');
      setMessageType('error');
      return null;
    }
  }, []);

  const handleUpiIntent = useCallback(
    async (appId: string) => {
      // Check if we're in WebView and should just redirect to standard checkout
      if (isInWebView && (window as any).ReactNativeWebView) {
        // For React Native WebView, we'll use standard checkout
        // because UPI intent needs to be handled differently
        console.log('In WebView, using standard checkout for UPI');
        handleCheckout();
        return;
      }

      if (!sessionId || !cashfreeRef.current || isProcessing) return;

      setIsProcessing(true);
      setPaymentMessage('');
      setMessageType('');
      setSelectedApp(appId);

      try {
        console.log('Creating UPI app component for:', appId);
        
        // Create UPI app component using Cashfree SDK
        const component = cashfreeRef.current.create('upiApp', {
          values: {
            upiApp: appId,
          },
        });

        console.log('UPI component created:', component);

        // Mount the component to a hidden div first (required by some SDKs)
        const hiddenDiv = document.createElement('div');
        hiddenDiv.id = `upi-mount-${appId}`;
        hiddenDiv.style.display = 'none';
        document.body.appendChild(hiddenDiv);

        try {
          component.mount(`#upi-mount-${appId}`);
        } catch (mountError) {
          console.log('Mount not required or failed:', mountError);
        }

        // Get the payment session details
        const returnUrl = `${window.location.origin}/payment/cashfree/success?orderId=${orderId}`;

        console.log('Calling cashfree.pay with session:', sessionId);

        // Use Cashfree's pay method which will generate the proper UPI intent URL
        const result = await cashfreeRef.current.pay({
          paymentMethod: component,
          paymentSessionId: sessionId,
          returnUrl: returnUrl,
          redirect: 'if_required',
        });

        console.log('Cashfree pay result:', result);

        // Clean up the hidden div
        if (hiddenDiv.parentNode) {
          hiddenDiv.parentNode.removeChild(hiddenDiv);
        }

        // Check the result
        if (result?.redirect) {
          // Cashfree will handle the redirect
          console.log('Cashfree handling redirect');
        } else if (result?.error) {
          console.error('Cashfree payment error:', result.error);
          setPaymentMessage(result.error.message || 'Payment failed');
          setMessageType('error');
        } else if (result?.paymentDetails) {
          setPaymentMessage('Payment initiated');
          setMessageType('success');
        } else {
          // No specific result, might be handled by Cashfree internally
          console.log('Payment initiated, waiting for redirect');
        }
      } catch (error: any) {
        console.error('UPI Intent error details:', {
          message: error?.message,
          code: error?.code,
          stack: error?.stack
        });
        
        // More specific error messages
        let errorMsg = 'Failed to process payment';
        if (error?.message?.includes('session')) {
          errorMsg = 'Payment session expired or invalid';
        } else if (error?.message?.includes('network')) {
          errorMsg = 'Network error. Please check your connection';
        } else if (error?.message) {
          errorMsg = error.message;
        }
        
        setPaymentMessage(errorMsg);
        setMessageType('error');
      } finally {
        setIsProcessing(false);
        setSelectedApp(null);
      }
    },
    [sessionId, orderId, isProcessing, isInWebView, handleCheckout]
  );

  const handleCheckout = useCallback(async () => {
    if (!sessionId || !cashfreeRef.current || isProcessing) return;

    setIsProcessing(true);
    try {
      const checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: '_self',
      };
      await cashfreeRef.current.checkout(checkoutOptions);
    } catch (error: any) {
      console.error('Checkout error:', error);
      const errorMessage =
        error?.message || error?.data?.message || 'Checkout failed';
      setPaymentMessage(errorMessage);
      setMessageType('error');
      setIsLoading(false);
    } finally {
      setIsProcessing(false);
    }
  }, [sessionId, isProcessing]);

  useEffect(() => {
    if (!sessionId || !orderId) {
      setIsLoading(false);
      return;
    }

    initializeSDK().then((cashfree) => {
      if (cashfree) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, [sessionId, orderId, initializeSDK]);

  // Listen for messages from React Native WebView
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'PAYMENT_RESULT') {
          if (data.status === 'success') {
            setPaymentMessage('Payment successful');
            setMessageType('success');
          } else if (data.status === 'failure') {
            setPaymentMessage(data.message || 'Payment failed');
            setMessageType('error');
          }
        }
      } catch (error) {
        // Not a JSON message, ignore
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!sessionId || !orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: No payment session found
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Initializing payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">
          Complete Your Payment
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>

          {/* Show error if session is invalid */}
          {messageType === 'error' && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
              <p className="text-sm">{paymentMessage}</p>
            </div>
          )}

          {/* Show info messages */}
          {messageType === '' && paymentMessage && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded">
              <p className="text-sm">{paymentMessage}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h3 className="text-md font-medium mb-3">UPI Apps</h3>
              <div className="grid grid-cols-2 gap-3">
                {upiApps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => handleUpiIntent(app.id)}
                    disabled={
                      isProcessing || !app.available || messageType === 'error'
                    }
                    className={`relative p-4 border rounded-lg transition-all ${
                      selectedApp === app.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    } ${
                      isProcessing || !app.available || messageType === 'error'
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer'
                    }`}
                  >
                    <div className="text-sm font-medium">{app.name}</div>
                    {selectedApp === app.id && isProcessing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t">
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Use Standard Checkout'}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Order ID: {orderId}</p>
          <p>Secured by Cashfree Payments</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCashfree;
