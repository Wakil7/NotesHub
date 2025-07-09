import { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

export default function Payments() {
  const userData = useSelector((state) => state.auth.userData);

  const [balance, setBalance] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    accountNumber: "",
    ifsc: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const threshold = 1000;
  const thresholdPercent = Math.min((balance / threshold) * 100, 100);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await appwriteService.updatePaymentsInfo(userData.$id, {
        accHolderName: formData.name,
        accNumber: formData.accountNumber,
        IFSC: formData.ifsc,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error updating payment info:", error);
      alert("Failed to update payment info. Please try again.");
    }
  };

  const handleEdit = () => {
    setSubmitted(false);
  };

  const handleWithdraw = async () => {
    try {
      await appwriteService.setAmountByUserId({
        userId: userData.$id,
        amount: 0,
      });
      setBalance(0);
      alert("Withdraw initiated!");
    } catch (error) {
      console.error("Error initiating withdraw:", error);
      alert("Withdraw failed. Please try again.");
    }
  };

  useEffect(() => {
    appwriteService.getAmountByUserId(userData.$id).then(setBalance);
    appwriteService.getPaymentsInfo(userData.$id).then((response) => {
      if (
        response &&
        response.accHolderName !== "null" &&
        response.accNumber !== "null" &&
        response.IFSC !== "null"
      ) {
        setFormData({
          name: response.accHolderName,
          accountNumber: response.accNumber,
          ifsc: response.IFSC,
        });
        setSubmitted(true);
      }
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 my-10">
      {/* Balance Box */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold">Current Balance</h2>
          <span className="text-3xl font-extrabold text-green-600">
            ₹{balance}
          </span>
        </div>
        <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
          <div
            className="bg-red-500 h-3 transition-all duration-500"
            style={{ width: `${thresholdPercent}%` }}
          ></div>
        </div>
        <p className="text-base text-gray-600 mt-2">
          Threshold: ₹{threshold} —{" "}
          <span className="font-semibold">
            {thresholdPercent.toFixed(0)}% reached
          </span>
        </p>

        {/* Withdraw Button */}
        <div className="mt-5">
          <button
            onClick={handleWithdraw}
            disabled={balance < threshold}
            className={`px-6 py-2.5 rounded-lg text-white text-base font-medium transition ${
              balance >= threshold
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* Payment Form or Submitted Info */}
      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6 space-y-5"
        >
          <h3 className="text-xl font-bold mb-2">Bank Transfer Details</h3>

          <div>
            <label className="block text-base font-medium mb-1">
              Account Holder Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-base"
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-1">
              Bank Account Number
            </label>
            <input
              type="text"
              name="accountNumber"
              required
              value={formData.accountNumber}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-base"
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-1">
              IFSC Code
            </label>
            <input
              type="text"
              name="ifsc"
              required
              value={formData.ifsc}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-base"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-base rounded-lg"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h3 className="text-xl font-bold mb-2">Bank Details</h3>
          <div className="text-base">
            <strong className="block">Name:</strong> {formData.name}
          </div>
          <div className="text-base">
            <strong className="block">Account Number:</strong>{" "}
            {formData.accountNumber}
          </div>
          <div className="text-base">
            <strong className="block">IFSC Code:</strong> {formData.ifsc}
          </div>

          <button
            onClick={handleEdit}
            className="mt-3 text-blue-600 hover:underline text-base"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
