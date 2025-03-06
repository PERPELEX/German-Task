"use client";

import { useRouter } from "next/navigation";
import ThemeToggle from "../../components/ThemeToggle";
import CategorySection from "../../components/CategorySelection";
import { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../slider.css";
import { useProducts } from "../../hooks/useProducts";

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50px",
        height: "50px",
        backgroundColor: "#D3183D",
        borderRadius: "50%",
        zIndex: 1,
        left: "-60px",
        bottom: "150px",
        position: "absolute",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="black"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50px",
        height: "50px",
        backgroundColor: "#D3183D",
        borderRadius: "50%",
        zIndex: 1,
        right: "-60px",
        bottom: "150px",
        position: "absolute",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="black"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
};

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { getBestsellerProducts } = useProducts();
  const products = getBestsellerProducts();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-[#F9F1E7] px-8 md:px-16 md:pt-16">
        {/* Text Section */}
        <div className="md:w-[50%] flex flex-col justify-center items-center text-center md:text-left pb-16 ">
          <Image
            src="/logo.png"
            alt="Alex am Naschmarkt Logo"
            width={500}
            height={350}
            className="mx-auto md:mx-0"
          />
          <p className="text-lg md:w-[70%] font-normal text-black mt-4">
            Entdecken Sie die Vielfalt an frischem Obst, knackigem Gemüse und
            erlesenen Weinen – direkt am legendären Wiener Naschmarkt!
          </p>
          <button className="mt-6 bg-[#D3183D] text-white px-12 py-3 rounded-full font-semibold hover:bg-red-600 transition">
            JETZT BESTELLEN
          </button>
        </div>

        {/* Image Section */}
        <div
          className="md:w-[50%] mt-8 md:mt-0 h-[550px] bg-cover bg-bottom"
          style={{ backgroundImage: "url('/Foto 1.png')" }}
        ></div>
      </div>

      <hr className="border-4 border-[#2a2a2a]" />

      <ThemeToggle />

      {/* Uber uns */}

      <div className="flex flex-col md:flex-row items-center bg-[#D3183D] text-white ">
        {/* Left Side - Image */}
        <div
          className="md:w-1/2 w-full relative h-[700px] bg-cover bg-center"
          style={{ backgroundImage: "url('/Foto 2.jpg')" }}
        ></div>

        {/* Right Side - Text */}
        <div className="md:w-1/2 w-full text-center md:text-left p-6 px-24">
          <h2 className="text-5xl font-bold mb-4">Über uns</h2>
          <p className="text-lg mb-12">
            Seit vielen Jahren ist Alex am Naschmarkt eine feste Größe für
            Feinschmecker und Genießer. Unsere Leidenschaft für frische,
            hochwertige Lebensmittel spiegelt sich in unserem handverlesenen
            Sortiment wider. Wir setzen auf regionale Bauern, nachhaltigen Anbau
            und absolute Frische <br />– Tag für Tag.
          </p>
          <button className="bg-black text-white px-8 py-2 rounded-full hover:bg-gray-800 transition">
            MEHR ERFAHREN
          </button>
        </div>
      </div>

      <hr className="border-4 border-[#2a2a2a]" />

      {/* products */}

      <div className="bg-[#F4E5D5] text-center py-12 px-6">
        <h2 className="text-4xl font-extrabold mb-2 text-black">
          Was wir anbieten
        </h2>
        <p className="text-lg text-black mb-8 font-semibold">
          Neugierig? Hier sind unsere beliebtesten Produkte
        </p>

        {/* Product Carousel */}
        <div className="max-w-[80%] mx-auto">
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id} className="p-12">
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition-all ease-in-out duration-200 hover:scale-105">
                  <div className="relative w-40 h-40">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <h3 className="font-extrabold text-base mt-4 text-black">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-700 mt-2">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold text-black mt-2">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Shop Button */}
        <button className="mt-8 bg-[#D3183D] text-white px-12 py-2 rounded-full font-bold hover:bg-red-700 transition">
          ZUM SHOP
        </button>
      </div>

      <hr className="border-4 border-[#2a2a2a]" />

      {/* Reviews */}
      <div className="bg-[#EC7B37] text-white py-40 px-6 relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: "url('/Muster.png')" }}
        ></div>

        <div className="relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">
            Was unsere Kunden sagen:
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Heike B.",
                text: "Ein sehr schöner Stand, super frisches Obst und Gemüse, die Angestellten nett, höflich und aufmerksam. Wenn ich in Wien bin, bin ich immer sehr gerne dort. Sehr zu empfehlen!",
              },
              {
                name: "Raphael A.",
                text: "Sehr freundlich, alles wirklich frisch und sehr appetitlich. Besonders die nette Dame, die mich bedient hatte und die Kinder dürfen dort verstecken spielen. Gute Qualität, nicht zu teuer, aber sehr wertvoll.",
              },
              {
                name: "Makkavelli",
                text: "Sehr fruchtige und köstliche Früchte, sowie Gemüse. In Wien meine erste Wahl, wenn ich Obst oder Gemüse kaufen möchte. Lieferung funktioniert ebenfalls problemlos und pünktlich.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold mb-2">
                  {testimonial.name}
                </h3>
                <p className="text-base">{testimonial.text}</p>
                <div className="mt-4 flex justify-center space-x-1 text-yellow-400">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-2xl">
                        ★
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-4 border-[#2a2a2a]" />
    </>
  );
}
