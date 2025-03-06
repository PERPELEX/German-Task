"use client";

import React, { useState } from "react";
import { Leaf } from "lucide-react";

const Footer = () => {
  const [showCookieConsent, setShowCookieConsent] = useState(true);

  return (
    <>
      <footer className="glass-card mt-20 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-[#00ff88]" />
                <span className="text-xl font-bold gradient-text">
                  Alex am Naschmarkt
                </span>
              </div>
              <p className="text-gray-400">
                Ihr Markt für frische Produkte und erlesene Weine
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Rechtliches</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/impressum"
                    className="text-gray-400 hover:text-white"
                  >
                    Impressum
                  </a>
                </li>
                <li>
                  <a
                    href="/datenschutz"
                    className="text-gray-400 hover:text-white"
                  >
                    Datenschutzerklärung
                  </a>
                </li>
                <li>
                  <a href="/agb" className="text-gray-400 hover:text-white">
                    AGB
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Naschmarkt 1</li>
                <li>1060 Wien</li>
                <li>Tel: +43 1 234 567</li>
                <li>Email: info@alexamnaschmarkt.at</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Öffnungszeiten</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Mo-Fr: 08:00 - 18:30</li>
                <li>Sa: 08:00 - 17:00</li>
                <li>So: geschlossen</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Alex am Naschmarkt. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      {showCookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 z-50">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-300 mb-4 md:mb-0">
              Wir verwenden Cookies, um Ihnen das beste Einkaufserlebnis zu
              bieten. Durch die weitere Nutzung der Website stimmen Sie der
              Verwendung von Cookies zu.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowCookieConsent(false)}
                className="bg-gradient-to-r from-[#00ff88] to-[#00a3ff] text-white px-6 py-2 rounded-full"
              >
                Akzeptieren
              </button>
              <button
                onClick={() => setShowCookieConsent(false)}
                className="glass-card px-6 py-2 rounded-full"
              >
                Ablehnen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
