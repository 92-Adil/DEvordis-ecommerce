import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const HeroCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const carouselItems = [1, 2, 3, 4];

  return (
    <div className="flex-1 max-w-screen overflow-hidden  pt-14 lg:p-4 ">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {carouselItems.map((item, index) => (
            <div className="min-w-full p-3" key={index}>
              <div className="bg-black h-[400px] text-white rounded-lg flex justify-between items-center px-8 py-10 border-none outline-none">
                <div className="max-w-lg">
                  <div className="flex">
                    <p className="text-sm mb-2 inline">
                      <span>
                        <img
                          src="/apple.png"
                          alt="logo"
                          className="inline mr-2"
                        />
                      </span>
                      iPhone 14 Series
                    </p>
                  </div>
                  <h2 className="text-4xl font-bold mb-4">
                    Up to 10% off Voucher
                  </h2>
                  <Button
                    variant="outline"
                    className="bg-white text-black hover:bg-gray-100"
                  >
                    Shop Now →
                  </Button>
                </div>
                <img
                  src="/iphone.png"
                  alt="iPhone 14"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-3 h-3 rounded-full ${
              index === selectedIndex ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
