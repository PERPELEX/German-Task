"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { useState, useContext } from "react";
import { ShopContext } from "../app/context/shopContext";
import { useAuth } from "@/app/context/AuthContext";
import Cart from "./cart/Cart";

export default function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getCartCount } = useContext(ShopContext);
  const { isLoggedIn } = useAuth();
  const cartCount = getCartCount();

  const navItems = [
    { name: "HOME", href: "/" },
    { name: "ÜBER UNS", href: "/about" },
    { name: "MENÜ", href: "/menu" },
    { name: "JETZT KONTAKTIEREN!", href: "/contact" },
    { name: "SHOP", href: "/shop" },
  ];

  return (
    <header className="bg-[#2a2a2a] text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="logo">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Alex am Naschmarkt"
              width={120}
              height={60}
              priority
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                className={`hover:text-gray-400 transition ${
                  router.pathname === item.href ? "text-gray-400" : ""
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
          {/* User Avatar or Login Link */}
          {isLoggedIn ? (
            <Link href="/user">
              <User className="w-6 h-6 hover:text-gray-400 transition" />
            </Link>
          ) : (
            <Link href="/login">
              <span
                className={`hover:text-gray-400 transition ${
                  router.pathname === "/login" ? "text-gray-400" : ""
                }`}
              >
                LOGIN
              </span>
            </Link>
          )}
          {/* Shopping Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-gray-800 bg-opacity-95 flex flex-col items-center justify-center">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 text-white "
          >
            <X className="h-8 w-8" />
          </button>
          <nav className="flex flex-col items-center space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl text-white hover:text-emerald-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {/* User Avatar or Login Link */}
            {isLoggedIn ? (
              <Link href="/user" onClick={() => setIsMobileMenuOpen(false)}>
                <User className="w-8 h-8 text-white hover:text-emerald-400 transition" />
              </Link>
            ) : (
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="text-2xl text-white hover:text-emerald-400 transition">
                  LOGIN
                </span>
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* Cart Sidebar */}
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </header>
  );
}
