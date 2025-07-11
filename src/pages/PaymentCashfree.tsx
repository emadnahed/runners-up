import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { load } from '@cashfreepayments/cashfree-js';

const app_env = import.meta.env.VITE_PUBLIC_APP_ENV;

const PaymentCashfree: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const orderId = searchParams.get('orderId');

  let cashfree;
  const initializeSDK = async function () {
    cashfree = await load({
      mode: app_env === 'production' ? 'production' : 'sandbox',
    });
  };

  const doPayment = useCallback(async () => {
    console.log('starting payment', sessionId, cashfree);
    const checkoutOptions = {
      paymentSessionId: sessionId,
      redirectTarget: '_self',
    };
    cashfree.checkout(checkoutOptions);
  }, [sessionId, cashfree]);

  initializeSDK().then(() => {
    console.log('SDK initialized', cashfree);
    if (sessionId && cashfree && orderId) {
      doPayment();
    }
  });

  if (!sessionId || !orderId) {
    return <div>Error: No payment session found</div>;
  }

  return (
    <div className="row">
      <p>Loading...</p>
    </div>
  );
};

export default PaymentCashfree;

// http://localhost:8000/custom-order?sessionId=session_mS9HRtIHjgrfConWJJ4jMPBnp5ZILKdYrQSS3EE3jO-pl0KVJMF7i_QtLwPE_vRAruFo6HY89nAOEchr8Umsse8X5wQe8tFWYLIVOTpp4yZ6euT_MIfmBJLX4-LlFgpaymentpayment&orderId=PM-CF-1752240720699
// https://edumadi.com/custom-order?sessionId=session_mS9HRtIHjgrfConWJJ4jMPBnp5ZILKdYrQSS3EE3jO-pl0KVJMF7i_QtLwPE_vRAruFo6HY89nAOEchr8Umsse8X5wQe8tFWYLIVOTpp4yZ6euT_MIfmBJLX4-LlFgpaymentpayment&orderId=PM-CF-1752240720699
