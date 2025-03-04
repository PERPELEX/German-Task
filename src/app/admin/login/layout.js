// app/layout.js

import "../../../app/globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className="min-h-screen bg-gray-900 text-white">{children}</body>
    </html>
  );
}
