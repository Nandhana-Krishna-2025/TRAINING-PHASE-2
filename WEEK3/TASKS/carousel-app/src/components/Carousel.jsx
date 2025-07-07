import { useState } from "react";
import slide0 from '../assets/slide0.jpg';
import slide1 from '../assets/slide-1.jpg';
import slide2 from '../assets/slide-2.jpeg';

const images = [slide0, slide1, slide2];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-10 h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden rounded-xl shadow-lg bg-black">
      <img
        src={images[current]}
        alt={`Slide ${current}`}
        className="w-full h-full object-contain transition duration-500"
      />
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200"
      >
        &#8594;
      </button>
    </div>
  );
}
