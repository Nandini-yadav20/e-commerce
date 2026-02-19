import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import hero_img from "../assets/hero_img.png";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [slideDirection, setSlideDirection] = useState("next");
  const [pausedByUser, setPausedByUser] = useState(false);

  // Hero slides data
  const heroSlides = [
    {
      id: 1,
      title: "LATEST ARRIVALS",
      subtitle: "OUR BESTSELLERS",
      description: "Discover the season's hottest collections with exclusive new arrivals",
      image: hero_img,
      cta: "SHOP NOW",
      link: "/collection",
    },
    {
  id: 2,
  title: "SUMMER COLLECTION",
  subtitle: "CURATED FOR EVERYONE",
  description: "Discover our specially curated fashion collection for men, women, and kids. Stylish, comfortable, and perfect for every occasion.",
  image: "https://img.freepik.com/free-photo/shop-clothing-clothes-shop-hanger-modern-shop-boutique_1150-8886.jpg?semt=ais_hybrid&w=740&q=80",
  cta: "EXPLORE COLLECTION",
  link: "/collection",
}
,
    {
      id: 3,
      title: "EXCLUSIVE OFFERS",
      subtitle: "LIMITED TIME",
      description: "Get up to 50% off on selected items. Hurry, stock is limited!",
      image: "https://img.freepik.com/free-vector/sale-up-50-off-vector_53876-57827.jpg?semt=ais_user_personalization&w=740&q=80",
      cta: "GRAB NOW",
      link: "/collection",
    },
  ];

  const currentSlideData = heroSlides[currentSlide];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay || pausedByUser) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setSlideDirection("next");
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, pausedByUser, heroSlides.length]);

  // Resume auto-play after user stops interacting
  useEffect(() => {
    if (pausedByUser) {
      const timeout = setTimeout(() => {
        setPausedByUser(false);
      }, 8000); // Resume after 8 seconds of inactivity
      return () => clearTimeout(timeout);
    }
  }, [pausedByUser]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setSlideDirection("next");
    setPausedByUser(true);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setSlideDirection("prev");
    setPausedByUser(true);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setSlideDirection(index > currentSlide ? "next" : "prev");
    setPausedByUser(true);
  };

  return (
    <div className="w-full">
      {/* MAIN HERO CAROUSEL */}
      <div className="relative w-full h-screen overflow-hidden bg-gray-100">
        
        {/* Slides Container */}
        <div className="relative w-full h-full flex">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute w-full h-full transition-all duration-1000 ease-out ${
                index === currentSlide
                  ? "opacity-100 scale-100 translate-x-0"
                  : slideDirection === "next"
                  ? "opacity-0 scale-95 translate-x-full"
                  : "opacity-0 scale-95 -translate-x-full"
              }`}
            >
              <div className="flex flex-col md:flex-row w-full h-full overflow-hidden">
                
                {/* LEFT SIDE - Text Content */}
                <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-12 py-10 md:py-0 bg-white">
                  <div className="text-[#414141] max-w-md">
                    
                    {/* Subtitle with line - Fade in animation */}
                    <div className={`flex items-center gap-3 mb-4 transition-all duration-1000 ${
                      index === currentSlide
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}>
                      <p className="w-8 md:w-12 h-[2px] bg-[#414141] transition-all duration-1000" />
                      <p className="font-semibold text-xs md:text-sm tracking-widest uppercase">
                        {slide.subtitle}
                      </p>
                    </div>

                    {/* Main Title - Fade in animation with stagger */}
                    <h1 className={`text-4xl md:text-6xl font-bold leading-tight mb-4 font-prata transition-all duration-1000 ${
                      index === currentSlide
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}>
                      {slide.title}
                    </h1>

                    {/* Description - Fade in animation with more stagger */}
                    <p className={`text-sm md:text-base text-gray-600 mb-8 leading-relaxed transition-all duration-1000 delay-200 ${
                      index === currentSlide
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}>
                      {slide.description}
                    </p>

                    {/* CTA with line - Fade in animation */}
                    <div className={`transition-all duration-1000 delay-300 ${
                      index === currentSlide
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}>
                      <Link
                        to={slide.link}
                        className="inline-flex items-center gap-3 group"
                      >
                        <p className="font-bold text-sm md:text-base uppercase tracking-widest hover:text-black transition-colors">
                          {slide.cta}
                        </p>
                        <p className="w-8 md:w-12 h-[2px] bg-[#414141] group-hover:w-12 md:group-hover:w-16 transition-all duration-300"></p>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE - Image with Ken Burns Effect */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-gray-200">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                      index === currentSlide
                        ? "scale-110"
                        : "scale-100"
                    }`}
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/10" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows with Enhanced Styling */}
        <button
          onClick={prevSlide}
          className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 bg-white/70 backdrop-blur-sm hover:bg-white p-3 md:p-4 rounded-full transition-all shadow-lg hover:shadow-2xl group transform hover:scale-110 duration-300"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6 md:w-8 md:h-8 text-[#414141] group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 bg-white/70 backdrop-blur-sm hover:bg-white p-3 md:p-4 rounded-full transition-all shadow-lg hover:shadow-2xl group transform hover:scale-110 duration-300"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6 md:w-8 md:h-8 text-[#414141] group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Pagination Dots with Auto-play Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3 items-center">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-300 rounded-full group`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Background dot */}
              <div
                className={`rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 md:w-10 h-2.5 md:h-3 bg-[#414141]"
                    : "w-2.5 md:w-3 h-2.5 md:h-3 bg-gray-400 hover:bg-gray-600"
                }`}
              />
              
              {/* Auto-play progress indicator for active slide */}
              {index === currentSlide && !pausedByUser && (
                <div className="absolute inset-0 rounded-full animate-pulse">
                  <div
                    className="h-full rounded-full bg-[#414141]/30"
                    style={{
                      animation: "progress 5s linear infinite",
                      width: "100%",
                    }}
                  />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Auto-play Status Indicator */}
        <div className="absolute top-6 right-6 z-30 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
          <div className={`w-2 h-2 rounded-full transition-all ${
            isAutoPlay && !pausedByUser ? "bg-green-500 animate-pulse" : "bg-gray-400"
          }`} />
          <span className="text-xs md:text-sm font-semibold text-[#414141]">
            {isAutoPlay && !pausedByUser ? "Auto-play" : "Paused"}
          </span>
        </div>
      </div>

      {/* CATEGORY SECTIONS */}
      <div className="w-full py-16 md:py-24 px-4 md:px-0 bg-white">
        
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <p className="w-8 md:w-12 h-[2px] bg-[#414141]"></p>
            <p className="font-semibold text-xs md:text-sm tracking-widest uppercase text-[#414141]">
              SHOP BY CATEGORY
            </p>
            <p className="w-8 md:w-12 h-[2px] bg-[#414141]"></p>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#414141] font-prata">
            Find Your Style
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          
          {/* MEN'S CATEGORY */}
          <Link
            to="/collection?category=men"
            className="group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative h-96 md:h-80 overflow-hidden bg-gray-200">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdY7-gr46uUX_aRpgsLeJzkQRMUbUj043zQ&s"
                alt="Men's Collection"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 flex items-end p-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-prata">
                    MEN'S COLLECTION
                  </h3>
                  <p className="text-white/90 text-sm md:text-base mb-4">
                    Discover our premium selection of men's fashion
                  </p>
                  <div className="flex items-center gap-2 text-white text-sm font-semibold">
                    <span>EXPLORE NOW</span>
                    <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* WOMEN'S CATEGORY */}
          <Link
            to="/collection?category=women"
            className="group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative h-96 md:h-80 overflow-hidden bg-gray-200">
              <img
                src={hero_img}
                alt="Women's Collection"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 flex items-end p-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-prata">
                    WOMEN'S COLLECTION
                  </h3>
                  <p className="text-white/90 text-sm md:text-base mb-4">
                    Explore elegant and trendy women's wear
                  </p>
                  <div className="flex items-center gap-2 text-white text-sm font-semibold">
                    <span>EXPLORE NOW</span>
                    <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* KIDS CATEGORY */}
          <Link
            to="/collection?category=kids"
            className="group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative h-96 md:h-80 overflow-hidden bg-gray-200">
              <img
                src="
https://t4.ftcdn.net/jpg/04/64/71/65/360_F_464716593_LD9IBzIJwlRMwQzjqVwHLL7XeupROIlS.jpg"

                alt="Kids Collection"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 flex items-end p-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-prata">
                    KIDS' COLLECTION
                  </h3>
                  <p className="text-white/90 text-sm md:text-base mb-4">
                    Adorable and comfortable kids' fashion
                  </p>
                  <div className="flex items-center gap-2 text-white text-sm font-semibold">
                    <span>EXPLORE NOW</span>
                    <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* PROMOTIONAL BANNER */}
      <div className="w-full bg-gradient-to-r from-[#414141] to-black text-white py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs md:text-sm tracking-widest uppercase mb-3">
            Limited Time Offer
          </p>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 font-prata">
            Get 30% Off on Your First Purchase
          </h2>
          <p className="text-sm md:text-base text-gray-200 mb-6">
            Use code <span className="font-bold text-white">WELCOME30</span> at checkout
          </p>
          <Link
            to="/collection"
            className="inline-block bg-white text-black px-8 py-3 font-bold uppercase hover:bg-gray-100 transition-all"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = `
  @keyframes progress {
    from {
      width: 100%;
      opacity: 1;
    }
    to {
      width: 0%;
      opacity: 0;
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  /* Smooth scroll behavior */
  html {
    scroll-behavior: smooth;
  }
`;

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

export default Hero;