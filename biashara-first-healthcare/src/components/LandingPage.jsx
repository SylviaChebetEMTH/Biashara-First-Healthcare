import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MapView from "./MapView";
import "aos/dist/aos.css";
import "./styles/button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FaArrowRight } from "react-icons/fa";

const LandingPage = () => {
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      url: "https://img.freepik.com/free-photo/little-girls-consulting-map-their-familiar-trip_23-2149373954.jpg?t=st=1729162263~exp=1729165863~hmac=ee2f4b46ea864cb59df7208544d7aef2442e073550043735075208555960c406&w=360",
      heading: "Connect Businesses & Hospitals",
      description: "Our platform helps businesses and hospitals easily register, and allows businesses to locate nearby hospitals using our interactive map."
    },
    {
      url: "https://img.freepik.com/free-photo/location-symbol-city-low-angle_23-2149764142.jpg?t=st=1728995642~exp=1728999242~hmac=56774faacb5faee10e3ba9e06b3e005b37397b615ad31e514527c5ca3b7565fd&w=740",
      heading: "Locate Nearby Hospitals",
      description: "Easily find health facilities around your area using our interactive map."
    },
    {
      url: "https://img.freepik.com/free-photo/black-woman-running-flower-business-side-view_23-2149871124.jpg?t=st=1729001064~exp=1729004664~hmac=10e6d2c08ab74e1282078007a5e4be99cebad3bbd73148a6466fbe533b25a35f&w=740",
      heading: "Join Our Network",
      description: "Connect with nearby businesses and healthcare facilities to grow together."
    },
    {
      url: "https://img.freepik.com/free-photo/man-with-dreads-representing-rastafari-movement_23-2151532093.jpg?t=st=1729001189~exp=1729004789~hmac=765c2f013e29eb032989d06485e5328e53016842d9f6ecb667f939b84c451607&w=740",
      heading: "Helping Your Community",
      description: "Support local businesses and health facilities by registering on our platform."
    }
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };




  return (
    <div className="min-h-screen ">
      <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${slides[currentSlide].url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-[#020234] bg-opacity-40"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            {/* Small heading with decorative line */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-blue-500"></div>
              <p className="text-sm md:text-base font-medium text-gray-300">
                Glad To Have You On Board With Biashara First Healthcare
              </p>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {slides[currentSlide].heading}
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
              {slides[currentSlide].description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register-business"
                className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-md font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Register Business
                <FaArrowRight className="text-sm" />
              </Link>

              <Link
                to="/register-hospital"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white hover:bg-white hover:text-[#020234] text-white px-8 py-4 rounded-md font-semibold transition-all duration-300"
              >
                Register Hospital
              </Link>
            </div>

            {/* Slide Indicators */}
            <div className="flex gap-2 mt-8">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1 rounded-full transition-all duration-300 ${currentSlide === index ? "w-8 bg-blue-500" : "w-6 bg-gray-500"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6"
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
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6"
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

        {/* Chat Widget (Optional - like in the reference) */}
        <div className="fixed bottom-6 right-6 z-50">
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" />
            </svg>
          </button>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image collage */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Top left image */}
                <div className="col-span-1">
                  <img
                    src="/assets/healthcareprofessional.jpg"
                    alt="Healthcare professional"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>

                {/* Top right image */}
                <div className="col-span-1">
                  <img
                    src="/assets/workspace.jpg"
                    alt="Medical workspace"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>

                {/* Bottom left image */}
                <div className="col-span-1">
                  <img
                    src="/assets/teamCollab.jpg"
                    alt="Team collaboration"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>

                {/* Bottom right - Experience badge */}
                <div className="col-span-1 flex items-end">
                  <div className="bg-[#020234] text-white p-8 rounded-lg shadow-xl w-full">
                    <div className="text-5xl font-bold mb-2">7+</div>
                    <div className="text-lg">Years Of Experience</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div>
              {/* Small heading with line */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-[#020234]"></div>
                <p className="text-sm font-semibold text-gray-600">
                  Karibu sana <span className="text-blue-500">Biashara First Healthcare</span>
                </p>
              </div>

              {/* Main heading */}
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Driving Innovation Through Tailored Digital Solutions
              </h2>

              {/* Description paragraphs */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                Imagine a platform connecting passionate healthcare providers with businesses seeking
                quality healthcare partnerships. At Biashara First Healthcare, we blend innovation with
                practical solutions to create connections that don't just work - they transform. From
                intuitive registration systems to interactive maps that help you find the perfect
                healthcare partner - we help you stand out in the healthcare marketplace.
              </p>

              <p className="text-gray-600 mb-4 leading-relaxed">
                What makes us different? It's our business-first approach. We go beyond just building{' '}
                <Link to="/hospitals" className="text-blue-500 underline hover:text-blue-600">hospitals</Link>,{' '}
                <Link to="/partnerships" className="text-blue-500 underline hover:text-blue-600">partnerships</Link>, and{' '}
                <Link to="/networks" className="text-blue-500 underline hover:text-blue-600">networks</Link>;
                we build relationships. We take the time to understand your goals, challenges, and unique
                needs - then design solutions that fit you perfectly.
              </p>

              <p className="text-gray-600 mb-8 leading-relaxed">
                And here's the kicker - our signature{' '}
                <Link to="/consultation" className="text-blue-500 underline hover:text-blue-600">free consultation</Link>.
                Whether you're launching your first partnership or scaling your healthcare network, our expert
                team is here to guide you, strategize with you, and help you make smart healthcare
                decisions - completely free.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 bg-[#020234] hover:bg-[#030350] text-white px-8 py-4 rounded-md font-semibold transition-all duration-300"
                >
                  Read About Us
                  <FaArrowRight className="text-sm" />
                </Link>

                <a
                  href="tel:0790761708"
                  className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
                >
                  <div className="bg-white text-blue-500 rounded-full p-2">
                    <FontAwesomeIcon icon={faPhone} className="text-sm" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold">0712345678</div>
                    <div className="text-xs">Call Us</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map-section" className=" bg-white">
        <div id="map-section" className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-700 mb-4">
            Find Nearby Hospitals
          </h3>
          <p className="text-center text-gray-600 mb-8">
            Use our interactive map to locate nearby hospitals for small businesses.
          </p>
          <div className="h-96">
            <MapView setCoordinates={setCoordinates} canPlacePin={false} />
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-700 mb-4">
            Why Choose Us?
          </h3>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            We make it easier for small businesses to locate health facilities, while helping health facilities to become easily accessible.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/about" className="px-6 py-3 bg-[#e28d8c] text-white rounded-md hover:bg-[#c96361]">
              Learn More
            </Link>
            <Link to="/contact" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

