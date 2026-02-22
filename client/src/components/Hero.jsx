import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import hero_img from "../assets/hero_img.png";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pausedByUser, setPausedByUser] = useState(false);

  const heroSlides = [
    {
      id: 1,
      title: "LATEST ARRIVALS",
      subtitle: "OUR BESTSELLERS",
      description:
        "Discover the season's hottest collections with exclusive new arrivals",
      image:
        "https://apexdisplay.com.au/wp-content/uploads/2024/02/UniSlot-Wallmount-Concept-5-1.webp",
      cta: "SHOP NOW",
      link: "/collection",
    },
    {
      id: 2,
      title: "SUMMER COLLECTION",
      subtitle: "CURATED FOR EVERYONE",
      description:
        "Premium fashion for men, women and kids — crafted for comfort, style and everyday luxury.",
      image:
        "https://img.freepik.com/free-photo/shop-clothing-clothes-shop-hanger-modern-shop-boutique_1150-8886.jpg?w=740",
      cta: "EXPLORE COLLECTION",
      link: "/collection",
    },
    {
      id: 3,
      title: "EXCLUSIVE OFFERS",
      subtitle: "LIMITED TIME",
      description:
        "Get up to 50% off on selected items. Elevate your wardrobe today.",
      image:
        "https://img.freepik.com/free-vector/sale-up-50-off-vector_53876-57827.jpg?w=740",
      cta: "GRAB NOW",
      link: "/collection",
    },
  ];

  useEffect(() => {
    if (pausedByUser) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [pausedByUser]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setPausedByUser(true);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
    setPausedByUser(true);
  };

  return (
    <div className="w-full">

      {/* HERO */}
      <div className="relative w-full h-screen overflow-hidden bg-[#F5EFE7]">

        {/* ALL SLIDES — pre-rendered, toggled via opacity */}
        {heroSlides.map((slide, i) => {
          const isActive = i === currentSlide;
          return (
            <div
              key={slide.id}
              style={{
                position: "absolute",
                inset: 0,
                opacity: isActive ? 1 : 0,
                transition: "opacity 0.8s ease",
                pointerEvents: isActive ? "auto" : "none",
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "100%",
              }}
            >
              {/* LEFT — TEXT */}
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 4rem",
                  background: "#F5EFE7",
                  transform: isActive ? "translateX(0)" : "translateX(-24px)",
                  transition: "transform 0.8s ease, opacity 0.8s ease",
                }}
              >
                <div style={{ maxWidth: "28rem", color: "#2C2C2C" }}>

                  {/* Subtitle */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                    <span style={{ width: "2.5rem", height: "2px", background: "#8B5E3C", display: "block" }} />
                    <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", fontWeight: 600, textTransform: "uppercase", color: "#8B5E3C" }}>
                      {slide.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1.5rem", fontFamily: "Prata, serif" }}>
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p style={{ color: "#6B5E55", marginBottom: "2rem", lineHeight: 1.7 }}>
                    {slide.description}
                  </p>

                  {/* CTA */}
                  <Link
                    to={slide.link}
                    style={{ display: "inline-flex", alignItems: "center", gap: "1rem", textDecoration: "none" }}
                    className="group"
                  >
                    <span style={{ fontWeight: 600, letterSpacing: "0.18em", fontSize: "0.8rem", color: "#5A3E2B" }}>
                      {slide.cta}
                    </span>
                    <span
                      style={{
                        height: "2px",
                        background: "#5A3E2B",
                        display: "block",
                        width: "2.5rem",
                        transition: "width 0.3s",
                      }}
                      className="group-hover:!w-16"
                    />
                  </Link>
                </div>
              </div>

              {/* RIGHT — IMAGE */}
              <div style={{ width: "50%", position: "relative", overflow: "hidden" }}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading="eager"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    willChange: "transform",
                    /* Ken-Burns only on active slide, resets on inactive so it restarts properly */
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                    transition: isActive ? "transform 6000ms ease-out" : "none",
                  }}
                />
                {/* gradient overlay */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to left, rgba(90,62,43,0.4), transparent, #F5EFE7)",
                }} />
              </div>
            </div>
          );
        })}

        {/* ARROWS */}
        <button
          onClick={prevSlide}
          style={{ position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.85)", border: "none", borderRadius: "50%", width: "44px", height: "44px", fontSize: "22px", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.12)", transition: "background 0.2s", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          style={{ position: "absolute", right: "1.5rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.85)", border: "none", borderRadius: "50%", width: "44px", height: "44px", fontSize: "22px", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.12)", transition: "background 0.2s", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          ›
        </button>

        {/* DOTS */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.75rem", zIndex: 10 }}>
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentSlide(i); setPausedByUser(true); }}
              style={{
                border: "none",
                cursor: "pointer",
                borderRadius: "9999px",
                height: "8px",
                width: i === currentSlide ? "2rem" : "8px",
                background: i === currentSlide ? "#8B5E3C" : "#C6A27E",
                transition: "width 0.3s, background 0.3s",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* PROMO BANNER */}
      <div className="bg-[#5A3E2B] text-white py-14 text-center">
        <p className="uppercase tracking-widest text-sm mb-3">
          Limited Time Offer
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-prata">
          Get 30% Off on Your First Purchase
        </h2>

        <Link
          to="/collection"
          className="inline-block bg-[#C6A27E] text-[#2C2C2C] px-8 py-3 font-semibold hover:bg-[#B08B6A] transition"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Hero;