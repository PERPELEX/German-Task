"use client";

import React from "react";

import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";

import "../globals.css";
import "../slider.css";
import ShopProvider from "../context/shopContext";
import Header from "@/components/Header";
import { AuthProvider } from "../context/AuthContext";
/* import { CartProvider } from "../context/CartContext"; */

/* function AuthInfo() {
  const { isLoggedIn } = useAuth();
  return (
    <div className="p-2 text-sm text-gray-400">
      {isLoggedIn ? "Logged in" : "Not logged in"}
    </div>
  );
} */

export default function RootLayout({ children }) {
  /* const [isCartModalOpen, setIsCartModalOpen] = useState(false); */

  return (
    <html lang="de">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-gray-900 text-white">
        <AuthProvider>
          <ShopProvider>
            {/*    <CartProvider> */}
            {/* Header */}
            <Header />
            {/* Optionally show auth status */}
            {/*     <AuthInfo /> */}
            {/* Main content */}
            <main>{children}</main>
            <Footer />
            <ThemeToggle />

            {/* Cart Modal */}
            {/* {isCartModalOpen && (
              <CartModal
                isOpen={isCartModalOpen}
                onClose={() => setIsCartModalOpen(false)}
              />
            )} */}
            {/*   </CartProvider> */}
          </ShopProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
