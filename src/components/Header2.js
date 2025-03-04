"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { ShoppingCart, Menu, User, Leaf, X } from "lucide-react";
import { ShopContext } from "../app/context/shopContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const { getCartCount, token } = useContext(ShopContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  const cartCount = getCartCount();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const navItems = [
    { name: "Startseite", href: "/" },
    { name: "Gemüse", href: "/gemuese" },
    { name: "Weine & Co.", href: "/weinepage" },
    { name: "Über uns", href: "/about" },
    { name: "Kontakt", onClick: () => {} },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-800">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-emerald-400" />
            <span className="text-xl font-bold">Alex am Naschmarkt</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) =>
              item.href ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm hover:text-emerald-400 transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className="text-sm hover:text-emerald-400 transition-colors"
                >
                  {item.name}
                </button>
              )
            )}
          </nav>
        </div>
        <div className="flex items-center space-x-4 relative">
          <button
            onClick={() => router.push("/cart")}
            className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <User className="h-6 w-6" />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded shadow-lg z-50">
                {!token ? (
                  <div className="flex flex-col">
                    <Link
                      href="/login"
                      className="px-4 py-2 hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Login / Register
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-gray-800 bg-opacity-95 flex flex-col items-center justify-center">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 text-white"
          >
            <X className="h-8 w-8" />
          </button>
          <nav className="flex flex-col items-center space-y-6">
            {navItems.map((item) =>
              item.href ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl text-white hover:text-emerald-400 transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => {
                    item.onClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-2xl text-white hover:text-emerald-400 transition-colors"
                >
                  {item.name}
                </button>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
