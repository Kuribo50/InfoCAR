"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
}

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    title: "Bienvenido a InfoCar",
    description: "Sistema integral de gestión vehicular para tu empresa",
    image: "/carousel-1.svg"
  },
  {
    id: 2,
    title: "Análisis Avanzado",
    description: "Reportes detallados y estadísticas en tiempo real",
    image: "/carousel-2.svg"
  },
  {
    id: 3,
    title: "Gestión Eficiente",
    description: "Controla tu flota vehicular de manera inteligente",
    image: "/carousel-3.svg"
  }
];

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-64 md:h-80">
          {/* Carousel Images */}
          <div className="relative w-full h-full overflow-hidden">
            {carouselItems.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                  index === currentIndex ? "translate-x-0" : 
                  index < currentIndex ? "-translate-x-full" : "translate-x-full"
                }`}
              >
                <div className="relative w-full h-full bg-gradient-to-r from-blue-500 to-purple-600">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-80"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/800x400/6366f1/ffffff?text=" + encodeURIComponent(item.title);
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                      <h2 className="text-2xl md:text-3xl font-bold mb-2">
                        {item.title}
                      </h2>
                      <p className="text-lg md:text-xl opacity-90">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={prevSlide}
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={nextSlide}
            aria-label="Siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}