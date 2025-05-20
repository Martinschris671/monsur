import React, { useState, useEffect, useRef } from "react";
import {
  ArrowDown,
  ArrowRight,
  Menu,
  X,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const productsRef = useRef(null);
  const storyRef = useRef(null);
  const moreInfoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (ref) => {
    setIsMenuOpen(false);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-widest">IMPERIAL</div>
        <div className="hidden md:flex space-x-8">
          <button
            onClick={() => scrollTo(heroRef)}
            className="hover:text-gray-400 transition duration-300"
          >
            HOME
          </button>
          <button
            onClick={() => scrollTo(productsRef)}
            className="hover:text-gray-400 transition duration-300"
          >
            PRODUCTS
          </button>
          <button
            onClick={() => scrollTo(storyRef)}
            className="hover:text-gray-400 transition duration-300"
          >
            OUR STORY
          </button>
          <button
            onClick={() => scrollTo(moreInfoRef)}
            className="hover:text-gray-400 transition duration-300"
          >
            MORE INFO
          </button>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8 md:hidden">
          <button
            onClick={() => scrollTo(heroRef)}
            className="text-2xl hover:text-gray-400 transition duration-300"
          >
            HOME
          </button>
          <button
            onClick={() => scrollTo(productsRef)}
            className="text-2xl hover:text-gray-400 transition duration-300"
          >
            PRODUCTS
          </button>
          <button
            onClick={() => scrollTo(storyRef)}
            className="text-2xl hover:text-gray-400 transition duration-300"
          >
            OUR STORY
          </button>
          <button
            onClick={() => scrollTo(moreInfoRef)}
            className="text-2xl hover:text-gray-400 transition duration-300"
          >
            MORE INFO
          </button>
        </div>
      )}

      {/* Side text */}
      <div className="hidden md:block fixed left-6 top-1/2 -translate-y-1/2 transform rotate-90 origin-left">
        <span className="text-sm tracking-widest opacity-70">
          PREMIUM CRAFT BEER
        </span>
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex flex-col justify-center items-center px-6"
      >
        <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
          <div className="absolute w-full h-full bg-gradient-to-t from-black to-transparent opacity-70"></div>
          <div
            className="relative w-full max-w-md transform transition-all duration-1000 ease-out"
            style={{
              transform: `rotate(${scrollY * 0.02}deg) translateY(${
                scrollY * 0.1
              }px)`,
            }}
          >
            <img
              src="/api/placeholder/500/700"
              alt="Imperial Beer Can"
              className="w-full object-contain"
            />
          </div>
        </div>

        <div className="relative z-10 text-center">
          <h1
            className="text-7xl md:text-9xl font-bold tracking-tighter mb-4 opacity-0 animate-fadeIn"
            style={{ animationDelay: "300ms" }}
          >
            IMPERIAL
          </h1>
          <p
            className="text-lg md:text-xl tracking-wider mb-8 opacity-0 animate-fadeIn"
            style={{ animationDelay: "600ms" }}
          >
            PREMIUM CRAFT BEER
          </p>
          <button
            onClick={() => scrollTo(productsRef)}
            className="flex items-center space-x-2 mx-auto border border-white px-6 py-3 hover:bg-white hover:text-black transition duration-300 opacity-0 animate-fadeIn"
            style={{ animationDelay: "900ms" }}
          >
            <span>SEE OUR COLLECTION</span>
            <ArrowDown size={16} />
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section ref={productsRef} className="min-h-screen py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 tracking-tight">
            OUR
            <br />
            COLLECTION
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ProductCard
              name="IMPERIAL PILSNER"
              description="Crisp, bright, and elegantly refreshing – our classic pilsner delivers excellence in every sip."
              image="/api/placeholder/300/500"
              index={0}
            />
            <ProductCard
              name="IMPERIAL STOUT"
              description="Our flagship brew combines deep, complex profiles with unrivaled smoothness."
              image="/api/placeholder/300/500"
              index={1}
            />
            <ProductCard
              name="IMPERIAL HAZY IPA"
              description="Hazy and full-bodied, delivering tropical fruit notes and a soft, velvety finish."
              image="/api/placeholder/300/500"
              index={2}
            />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="py-24 px-6 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 tracking-tight">
            OUR
            <br />
            STORY
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <img
                src="/api/placeholder/600/400"
                alt="Our Brewery"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-6">THE LEGACY OF CRAFT</h3>
              <p className="mb-6">
                On 21st December 1768, the first original IMPERIAL BREWING CO.
                began with a vision. A craft that would redefine excellence.
              </p>
              <p className="mb-6">
                From Arthur Founder's legacy of perfectionism to how Imperial
                has been setting craft beer standards for over 250 years.
              </p>
              <button className="flex items-center space-x-2 border border-white px-6 py-3 hover:bg-white hover:text-black transition duration-300 w-fit">
                <span>READ MORE</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* More Info Section */}
      <section ref={moreInfoRef} className="min-h-screen py-24 px-6 relative">
        <div className="absolute right-0 bottom-0 w-1/2 h-2/3 opacity-30">
          <img
            src="/api/placeholder/600/800"
            alt="Beer Six Pack"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold mb-6">
              You can learn more about Imperial
            </h2>
            <p className="mb-6">
              This product was meticulously crafted to be launched in 2022.
              Somehow, the Imperial brand reached a path to enter the
              competitive market.
            </p>
            <button className="flex items-center space-x-2 border border-white px-6 py-3 hover:bg-white hover:text-black transition duration-300 w-fit">
              <span>LEARN MORE</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-zinc-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">IMPERIAL</h3>
            <p className="text-sm text-gray-400 mb-6">
              The Imperial brand, which produces and packages premium craft beer
              products, has extensive activities in European countries.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">
              KEEP UPDATED WITH ALL THINGS IMPERIAL
            </h3>
            <div className="flex mb-6">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent border border-gray-600 px-4 py-2 flex-grow"
              />
              <button className="bg-white text-black px-4 py-2">SIGN UP</button>
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-gray-400 transition duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="hover:text-gray-400 transition duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="hover:text-gray-400 transition duration-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="hover:text-gray-400 transition duration-300"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="md:text-right">
            <img
              src="/api/placeholder/300/150"
              alt="Imperial Beer"
              className="inline-block mb-6"
            />
            <div className="flex md:justify-end space-x-4 text-sm">
              <a
                href="#"
                className="hover:text-gray-400 transition duration-300"
              >
                OUR STORY
              </a>
              <a
                href="#"
                className="hover:text-gray-400 transition duration-300"
              >
                EXPERIENCES
              </a>
              <a
                href="#"
                className="hover:text-gray-400 transition duration-300"
              >
                OUR PRODUCTS
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-12 mt-12 border-t border-gray-800 text-sm text-gray-500">
          © Copyright by Imperial Brewery. All Rights Reserved. 2025
        </div>
      </footer>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background-color: black;
          color: white;
          font-family: "Helvetica Neue", "Arial", sans-serif;
        }
      `}</style>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ name, description, image, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 200}ms`,
      }}
    >
      <div className="overflow-hidden mb-6">
        <div
          className="relative transform transition-all duration-700 ease-out"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-400 mb-6 text-sm">{description}</p>
      <button className="border border-white px-4 py-2 hover:bg-white hover:text-black transition duration-300">
        BUY NOW
      </button>
    </div>
  );
};

export default App;
