"use client";

import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreditCard, Clock, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { ShopContext } from "../../../app/context/shopContext";

const getAvailableDeliveryDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    // Skip Sundays (0 = Sunday)
    if (date.getDay() !== 0) {
      dates.push(date);
    }
  }
  return dates;
};

const getAvailableDeliveryTimes = () => {
  const times = [];
  for (let hour = 8; hour <= 17; hour++) {
    times.push(`${hour.toString().padStart(2, "0")}:00`);
  }
  return times;
};

export default function CheckoutPage() {
  const {
    products,
    cartItems,
    getCartAmount,
    delivery_fee,
    currency,
    updateQuantity,
    clearCart,
  } = useContext(ShopContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    postalCode: "",
    deliveryTime: "",
  });
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod" or "stripe"
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const subtotal = getCartAmount();
  const shippingCost = subtotal >= 100 ? 0 : 10;
  const totalWithShipping = subtotal + shippingCost;

  const availableDates = getAvailableDeliveryDates();
  const availableTimes = getAvailableDeliveryTimes();

  const isWeekday = (date) => date.getDay() !== 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleCheckout = async () => {
    if (!deliveryDate || !formData.deliveryTime) {
      setError("Bitte wählen Sie ein Lieferdatum und eine Lieferzeit aus.");
      return;
    }
    setIsProcessing(true);
    setError(null);

    try {
      const formattedDate = deliveryDate.toISOString();

      // Create Order Record in Backend
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
          address: `${formData.street}, ${formData.postalCode} ${formData.city}`,
          deliveryDate: formattedDate,
          deliveryTime: formData.deliveryTime,
          items: cartItems,
          total: totalWithShipping,
          paymentMethod,
        }),
      });

      if (!orderResponse.ok) {
        const errData = await orderResponse.json();
        throw new Error(errData.error || "Order creation failed");
      }

      if (paymentMethod === "stripe") {
        // Stripe integration reserved for later
        alert("Stripe integration not implemented yet.");
      } else {
        alert(
          "Bestellung wurde erfolgreich aufgegeben. Sie zahlen bei Lieferung."
        );
      }

      clearCart();
      router.push("/order-confirmation");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ein Fehler ist aufgetreten"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        {/* Order Overview Section */}
        {/*   <div className="bg-white/10 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Order Overview</h3>
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>
              {currency} {subtotal}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Shipping fee:</span>
            <span>
              {currency} {shippingCost}
            </span>
          </div>
          <hr className="my-2 border-gray-600" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>
              {currency} {totalWithShipping}
            </span>
          </div>
        </div> */}

        {/* Checkout Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">Bestellung aufgeben</h2>
              {error && (
                <div className="mb-6 p-4 bg-red-500/20 text-red-200 rounded-lg">
                  {error}
                </div>
              )}
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Vorname
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nachname
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Straße & Hausnummer
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      PLZ
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Stadt
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>
                {/* Delivery Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Lieferdatum
                    </label>
                    <DatePicker
                      selected={deliveryDate}
                      onChange={(date) => setDeliveryDate(date)}
                      filterDate={isWeekday}
                      placeholderText="Bitte wählen"
                      className="w-full px-4 py-2 rounded-lg bg-white/10 text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      dateFormat="P"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium mb-2">
                      <Clock className="inline-block w-5 h-5 mr-2" />
                      Lieferzeit
                    </label>
                    <select
                      name="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Bitte wählen</option>
                      {availableTimes.map((time) => (
                        <option key={time} value={time}>
                          {time} Uhr
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Payment Method Selection */}
                <div className="mt-6">
                  <p className="text-sm font-medium mb-2">Zahlungsmethode</p>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      Nachnahme
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="stripe"
                        checked={paymentMethod === "stripe"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      Mit Stripe bezahlen
                    </label>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center space-x-2 bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      <span>Jetzt bezahlen</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* Order Overview Section */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">Bestellübersicht</h2>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>
                    {currency} {subtotal}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping fee</p>
                  <p>
                    {currency} {shippingCost}
                  </p>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2">
                  <p>Total</p>
                  <p>
                    {currency} {totalWithShipping}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
