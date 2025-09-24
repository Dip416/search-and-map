import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import formatPriceRange from "@/helpers/formatPriceRange";

// const S3_BUCKET_URL =
//   "https://elasticbeanstalk-ap-south-1-471112538523.s3.ap-south-1.amazonaws.com/";
const ImageSlider = ({ property }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Sample images - in real implementation, these would come from props
  //   const images =
  //     property?.project_images?.images?.length > 0
  //       ? property?.project_images?.images?.map(
  //           (image: any) => S3_BUCKET_URL + image?.image,
  //         )
  //       : [];
  const price: string | null = useMemo(() => {
    return formatPriceRange(property);
  }, [property]);
  const images = [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative h-50 overflow-hidden">
      {/* Images */}
      <div
        className="flex transition-transform duration-300 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((image: string, index: number) => (
          <img
            key={index}
            src={image}
            alt={`Property view ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
            loading="lazy"
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
      >
        <ChevronLeft size={18} className="text-gray-700" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
      >
        <ChevronRight size={18} className="text-gray-700" />
      </button>

      {/* Price Range Badge */}
      {price && (
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-lg text-sm font-bold">
            {price}
          </div>
        </div>
      )}

      {/* Pagination Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_: any, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 cursor-pointer rounded-full transition-all duration-200 ${
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
