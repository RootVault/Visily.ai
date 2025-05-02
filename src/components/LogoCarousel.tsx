import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const logos = [
  { src: '/Images/Vercel.png', alt: 'Vercel' },
  { src: '/Images/loom.png', alt: 'Loom' },
  { src: '/Images/Notion.png', alt: 'Notion' },
  { src: '/Images/Clickup.png', alt: 'ClickUp' },
  { src: '/Images/Supabase.png', alt: 'Supabase' },
  { src: '/Images/Zapier.png', alt: 'Zapier' },
  { src: '/Images/Sap.png', alt: 'Sap' },
  { src: '/Images/Ibm.png', alt: 'Ibm' },
  { src: '/Images/Oracle.png', alt: 'Oracle' },
  { src: '/Images/Siemens.png', alt: 'Siemens' },
];

const LogoCarousel: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={2}
        spaceBetween={32}
        loop={true}
        speed={3000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          waitForTransition: true
        }}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="py-4"
      >
        {logos.map((logo, idx) => (
          <SwiperSlide key={logo.alt + idx} className="flex items-center justify-center h-16 sm:h-20">
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-10 sm:h-14 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LogoCarousel; 