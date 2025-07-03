import conf from "./conf/conf.js";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Razorpay from "razorpay";

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Create Razorpay Order
app.post("/orders", async (req, res) => {
  console.log("📥 Received /orders request body:", req.body);

  const { amount, currency } = req.body;

  // Validate input
  if (!amount || !currency) {
    console.log("❌ Missing amount or currency");
    return res.status(400).json({ error: "Missing amount or currency" });
  }

  // Initialize Razorpay instance
  const razorpay = new Razorpay({
    key_id: conf.razorpayKeyId,
    key_secret: conf.razorpaySecretKey
  });

  const options = {
    amount: amount * 100, // Convert to paise
    currency,
    receipt: "receipt#1",
    payment_capture: 1
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log("✅ Razorpay order created:", response);

    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount
    });
  } catch (error) {
    console.error("🔥 Error creating Razorpay order:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
      stack: error.stack
    });
  }
});

// Fetch Payment Info
app.get("/payment/:paymentId", async (req, res) => {
  const { paymentId } = req.params;

  const razorpay = new Razorpay({
    key_id: conf.razorpayKeyId,
    key_secret: conf.razorpaySecretKey
  });

  try {
    const payment = await razorpay.payments.fetch(paymentId);

    if (!payment) {
      return res.status(500).json({ error: "Payment not found" });
    }

    res.json({
      status: payment.status,
      method: payment.method,
      amount: payment.amount,
      currency: payment.currency
    });
  } catch (error) {
    console.error("🔥 Error fetching Razorpay payment:", error);
    res.status(500).json({
      error: "Failed to fetch payment",
      message: error.message,
      stack: error.stack
    });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});

