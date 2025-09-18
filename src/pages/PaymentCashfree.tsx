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
  const [isMobile, setIsMobile] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success' | ''>('');
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const cashfreeRef = useRef<any>(null);
  const upiComponentsRef = useRef<Map<string, any>>(new Map());
  const [isProcessing, setIsProcessing] = useState(false);

  const upiApps: UpiApp[] = [
    { id: 'phonepe', name: 'PhonePe', available: true },
    { id: 'paytm', name: 'Paytm', available: true },
    { id: 'gpay', name: 'Google Pay', available: true },
    { id: 'default', name: 'Other UPI App', available: true },
    { id: 'web', name: 'UPI Link', available: true },
  ];

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      setIsMobile(mobileRegex.test(userAgent.toLowerCase()));
    };
    checkMobile();
  }, []);

  const initializeSDK = useCallback(async () => {
    try {
      const cashfree = await load({
        mode: app_env === 'production' ? 'production' : 'sandbox',
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

  const initializeUpiComponents = useCallback(() => {
    if (!cashfreeRef.current || !isMobile) return;

    const style = {
      base: {
        fontSize: '16px',
        padding: '10px',
      },
    };

    upiApps.forEach((app) => {
      try {
        const component = cashfreeRef.current.create('upiApp', {
          values: {
            upiApp: app.id,
          },
          style,
        });
        
        upiComponentsRef.current.set(app.id, component);
        
        const element = document.getElementById(`upi-${app.id}`);
        if (element) {
          component.mount(`#upi-${app.id}`);
          
          component.on('loaderror', (data: any) => {
            console.error(`Error loading ${app.name}:`, data.error?.message);
          });
        }
      } catch (error) {
        console.error(`Error creating component for ${app.name}:`, error);
      }
    });
  }, [isMobile, upiApps]);

  const handleUpiPayment = useCallback(async (appId: string) => {
    if (!sessionId || !cashfreeRef.current || isProcessing) return;

    setIsProcessing(true);
    setPaymentMessage('');
    setMessageType('');
    setSelectedApp(appId);

    const component = upiComponentsRef.current.get(appId);
    if (!component) {
      setPaymentMessage('Payment component not initialized');
      setMessageType('error');
      setIsProcessing(false);
      return;
    }

    try {
      component.disable();
      
      const returnUrl = window.location.origin + `/payment/cashfree/success?orderId=${orderId}`;
      
      const result = await cashfreeRef.current.pay({
        paymentMethod: component,
        paymentSessionId: sessionId,
        returnUrl: returnUrl,
        redirect: 'if_required',
      });

      component.enable();
      
      if (result.error) {
        setPaymentMessage(result.error.message || 'Payment failed');
        setMessageType('error');
      } else if (result.paymentDetails) {
        setPaymentMessage(result.paymentDetails.paymentMessage || 'Payment successful');
        setMessageType('success');
      } else if (result.redirect) {
        console.log('Redirecting to payment page...');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      setPaymentMessage(error.message || 'Payment processing failed');
      setMessageType('error');
      component.enable();
    } finally {
      setIsProcessing(false);
      setSelectedApp(null);
    }
  }, [sessionId, orderId, isProcessing]);

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
      setPaymentMessage(error.message || 'Checkout failed');
      setMessageType('error');
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
        if (isMobile) {
          setIsLoading(false);
          setTimeout(() => {
            initializeUpiComponents();
          }, 100);
        } else {
          // On desktop, directly trigger checkout
          handleCheckout();
        }
      } else {
        setIsLoading(false);
      }
    });
  }, [sessionId, orderId, initializeSDK, isMobile, initializeUpiComponents, handleCheckout]);

  if (!sessionId || !orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: No payment session found
        </div>
      </div>
    );
  }

  if (isLoading || (!isMobile && isProcessing)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {!isMobile ? 'Redirecting to payment...' : 'Initializing payment...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">Complete Your Payment</h1>
        
        {paymentMessage && (
          <div className={`mb-6 p-4 rounded ${
            messageType === 'error' 
              ? 'bg-red-50 border border-red-200 text-red-700' 
              : messageType === 'success'
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-blue-50 border border-blue-200 text-blue-700'
          }`}>
            {paymentMessage}
          </div>
        )}

        {isMobile ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-md font-medium mb-3">UPI Apps</h3>
                <div className="grid grid-cols-2 gap-3">
                  {upiApps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => handleUpiPayment(app.id)}
                      disabled={isProcessing || !app.available}
                      className={`relative p-4 border rounded-lg transition-all ${
                        selectedApp === app.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      } ${
                        isProcessing || !app.available
                          ? 'opacity-50 cursor-not-allowed'
                          : 'cursor-pointer'
                      }`}
                    >
                      <div id={`upi-${app.id}`} className="mb-2"></div>
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
                  {isProcessing ? 'Processing...' : 'Use Other Payment Methods'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Proceeding to Payment</h2>
            <p className="text-gray-600 mb-6">
              Click the button below to proceed with your payment through Cashfree's secure checkout.
            </p>
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Order ID: {orderId}</p>
          <p>Secured by Cashfree Payments</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCashfree;