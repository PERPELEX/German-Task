"use client";
import { useContext } from "react";
import { ShopContext } from "../app/context/shopContext";
import { ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProductGrid = () => {
  const { products, addToCart } = useContext(ShopContext);
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => {
        const productId = product._id ? String(product._id) : "";
        return (
          <div
            key={productId}
            className="product-card glass-card rounded-2xl overflow-hidden"
          >
            <div className="relative">
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-300 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-emerald-400">
                  €{product.price}
                </span>
                <button
                  onClick={() => {
                    console.log("Adding item:", productId);
                    addToCart(productId);
                  }}
                  className="flex items-center space-x-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-4 py-2 rounded-full transition-all duration-300"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{t("add_to_cart")}</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
