import axios from 'axios';
import { useState } from 'react';
import conf from '../../backend/conf/conf';

function Payments() {
  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState([]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = (amount) => {
    const data = JSON.stringify({
      amount: amount, // ✅ in rupees — backend multiplies it by 100
      currency: "INR"
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/orders",
      headers: {
        "Content-Type": "application/json"
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log("🧾 Order created:", response.data);
        handleRazorpayScreen(response.data); // ✅ pass full order
      })
      .catch((error) => {
        console.error("❌ Error creating order:", error);
      });
  };

  const handleRazorpayScreen = async (orderData) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      console.error("❌ Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: conf.razorpayKeyId,
      amount: orderData.amount,       // ✅ already in paise
      currency: orderData.currency,
      name: "Note Name",
      description: "Payment for note",
      order_id: orderData.order_id,   // ✅ essential to link with Razorpay
      handler: function (response) {
        console.log("✅ Payment success:", response);
        setResponseId(response.razorpay_payment_id);
      },
      prefill: {
        name: "Wakil",
        email: "test@gmail.com"
      },
      theme: {
        color: "blue"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const paymentFetch = (e) => {
    e.preventDefault();
    const paymentId = e.target.paymentId.value;
    axios.get(`http://localhost:5000/payment/${paymentId}`)
      .then((response) => {
        console.log("✅ Payment fetched:", response.data);
        setResponseState(response.data);
      })
      .catch((error) => {
        console.error("❌ Payment fetch failed:", error);
      });
  };

  return (
    <div className="m-32">
      <button
        className="bg-blue-400 hover:bg-blue-500 p-2 rounded"
        onClick={() => createRazorpayOrder(100)} // ₹100
      >
        Pay Rs.100
      </button>

      {responseId && <p className="mt-4 text-green-600">Payment ID: {responseId}</p>}

      <h1 className="mt-8 text-xl font-bold">Payment Verification</h1>
      <form onSubmit={paymentFetch} className="mt-2 space-x-2">
        <input type="text" name="paymentId" placeholder="Enter Razorpay Payment ID" className="border px-2 py-1" />
        <button type="submit" className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded">
          Fetch Payment
        </button>
      </form>

      {responseState && responseState.status && (
        <div className="mt-4">
          <p>Status: {responseState.status}</p>
          <p>Method: {responseState.method}</p>
          <p>Amount: ₹{responseState.amount / 100}</p>
          <p>Currency: {responseState.currency}</p>
        </div>
      )}
    </div>
  );
}

export default Payments;
