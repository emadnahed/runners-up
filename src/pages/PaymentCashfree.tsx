import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

declare global {
  interface Window {
    cashfree?: any;
  }
}

const PaymentCashfree: React.FC = () => {
  const location = useLocation();
  const { id: orderId } = useParams<{ id: string }>();

  const getPaymentSessionId = () => {
    const params = new URLSearchParams(location.search);
    return params.get("sessionId");
  };

  useEffect(() => {
    const paymentSessionId = getPaymentSessionId();
    if (!paymentSessionId) {
      alert("Missing paymentSessionId in URL query params.");
      return;
    }
    if (!window.cashfree) {
      // Wait for SDK to load, then try again
      const interval = setInterval(() => {
        if (window.cashfree) {
          clearInterval(interval);
          window.cashfree.checkout({
            paymentSessionId,
            returnUrl: `${window.location.origin}/orders/${orderId}/success`,
            cancelUrl: `${window.location.origin}/orders/${orderId}/failure`,
          });
        }
      }, 100);
      return () => clearInterval(interval);
    } else {
      window.cashfree.checkout({
        paymentSessionId,
        returnUrl: `${window.location.origin}/orders/${orderId}/success`,
        cancelUrl: `${window.location.origin}/orders/${orderId}/failure`,
      });
    }
  }, [location, orderId]);

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Pay with Cashfree</h1>
      <p>Order ID: {orderId}</p>
      <p>Loading payment gateway...</p>
    </div>
  );
};

export default PaymentCashfree;
