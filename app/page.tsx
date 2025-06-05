"use client"
import React, { useState, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Wifi,
  CarCrash,
  Coffee,
  Waves,
  Star,
  Pin,
  Phone,
  Mail,
} from "@mui/icons-material"
import { Box, Button } from "@mui/material"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"

const ElegantHotelPage = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Premium Dining",
      description:
        "Curated culinary experiences with locally sourced ingredients",
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Seamless Connectivity",
      description: "High-speed internet throughout the property",
    },
    {
      icon: <Waves className="w-8 h-8" />,
      title: "Wellness Sanctuary",
      description: "Private pool and spa facilities for ultimate relaxation",
    },
    {
      icon: <CarCrash className="w-8 h-8" />,
      title: "Valet Service",
      description: "Complimentary parking with professional valet assistance",
    },
  ]

  const testimonials = [
    {
      name: "Elena Rodriguez",
      role: "Creative Director",
      text: "An oasis of tranquility. Every detail reflects exceptional taste and thoughtful design.",
      rating: 5,
    },
    {
      name: "James Mitchell",
      role: "Business Executive",
      text: "Impeccable service and sophisticated ambiance. A truly memorable experience.",
      rating: 5,
    },
    {
      name: "Sofia Chen",
      role: "Architect",
      text: "The perfect blend of modern luxury and timeless elegance. Simply extraordinary.",
      rating: 5,
    },
  ]

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  const handleSignin = () => {
    router.push(pathname === "/sign-in" ? "/" : "/sign-in")
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-light tracking-wide text-gray-900">
              Southwoods
            </div>
            <div className="hidden md:flex items-center space-x-8 text-sm font-light">
              <a href="#home" className="hover:text-gray-600 transition-colors">
                Home
              </a>
              <a
                href="#about"
                className="hover:text-gray-600 transition-colors"
              >
                About
              </a>
              <a
                href="#services"
                className="hover:text-gray-600 transition-colors"
              >
                Services
              </a>
              <a
                href="#contact"
                className="hover:text-gray-600 transition-colors"
              >
                Contact
              </a>
              <Button
                onClick={handleSignin}
                variant="outlined"
                sx={{
                  borderRadius: "0.75rem",
                  textTransform: "none",
                  fontWeight: 500,
                  borderColor: "#ccc",
                  color: "#333",
                  px: 3,
                  py: 1,
                  "&:hover": {
                    backgroundColor: "#f4f4f4",
                    borderColor: "#bbb",
                  },
                }}
              >
                {pathname === "/sign-in" ? "Back" : "Sign In"}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
        <div
          className={`relative z-10 text-center max-w-4xl mx-auto px-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-6xl md:text-8xl font-extralight mb-6 tracking-tight">
            Southwoods
          </h1>
          <div className="w-24 h-px bg-gray-400 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl font-light text-gray-600 mb-12 leading-relaxed">
            Where sophistication meets serenity
          </p>
          <button className="px-8 py-3 border border-gray-900 text-gray-900 font-light tracking-wide hover:bg-gray-900 hover:text-white transition-all duration-300">
            DISCOVER MORE
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-extralight mb-4 tracking-tight">
                  About
                </h2>
                <div className="w-16 h-px bg-gray-400 mb-8"></div>
              </div>
              <p className="text-lg font-light leading-relaxed text-gray-600">
                Nestled in the heart of refined elegance, Southwoods Hotel
                represents the pinnacle of contemporary hospitality. Our
                philosophy centers on creating extraordinary moments through
                understated luxury and personalized attention to detail.
              </p>
              <p className="text-lg font-light leading-relaxed text-gray-600">
                Every element has been thoughtfully curated to provide a
                sanctuary of calm sophistication, where discerning guests can
                experience the perfect balance of comfort and class.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/assets/home/room.jpg"
                alt="room"
                width={3500}
                height={2000}
                style={{ borderRadius: "12px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extralight mb-4 tracking-tight">
              Services
            </h2>
            <div className="w-16 h-px bg-gray-400 mx-auto mb-8"></div>
            <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
              Exceptional amenities designed to elevate your experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 border border-gray-200 rounded-full group-hover:border-gray-400 transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-light mb-4">{feature.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extralight mb-4 tracking-tight">
              Testimonials
            </h2>
            <div className="w-16 h-px bg-gray-400 mx-auto"></div>
          </div>

          <div className="relative">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[activeTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-current text-gray-400"
                    />
                  )
                )}
              </div>
              <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-8 text-gray-700">
                <p>{testimonials[activeTestimonial].text}</p>
              </blockquote>
              <div className="space-y-2">
                <p className="font-light text-lg">
                  {testimonials[activeTestimonial].name}
                </p>
                <p className="text-gray-500 font-light">
                  {testimonials[activeTestimonial].role}
                </p>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-12">
              <button
                onClick={prevTestimonial}
                className="p-3 border border-gray-200 rounded-full hover:border-gray-400 transition-colors duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 border border-gray-200 rounded-full hover:border-gray-400 transition-colors duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extralight mb-4 tracking-tight">
              Location
            </h2>
            <div className="w-16 h-px bg-gray-400 mx-auto mb-8"></div>
            <p className="text-lg font-light text-gray-600">
              Perfectly positioned in the heart of Southwoods
            </p>
          </div>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 400,
              borderRadius: "16px",
              overflow: "hidden", // <-- add this
            }}
            mb={25}
          >
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Southwoods+Exchange+Boulevard"
              style={{
                border: 0,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              allowFullScreen
              frameBorder="0"
            />
          </Box>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extralight mb-4 tracking-tight">
            Contact
          </h2>
          <div className="w-16 h-px bg-gray-400 mx-auto mb-16"></div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="flex justify-center">
                <Pin className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-light">Address</h3>
              <p className="font-light text-gray-600">
                Southwoods Exchange Boulevard
                <br />
                Muntinlupa, Philippines
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center">
                <Phone className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-light">Phone</h3>
              <p className="font-light text-gray-600">+63 2 8123 4567</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center">
                <Mail className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-light">Email</h3>
              <p className="font-light text-gray-600">
                hello@southwoodshotel.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
            <div className="text-2xl font-light tracking-wide">Southwoods</div>

            <div className="flex space-x-8 text-sm font-light">
              <a href="#" className="hover:text-gray-600 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-gray-600 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-gray-600 transition-colors">
                Careers
              </a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="font-light text-gray-500">
              © {new Date().getFullYear()} Southwoods Hotel. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ElegantHotelPage
