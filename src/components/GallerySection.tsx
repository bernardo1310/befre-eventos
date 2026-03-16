import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import event1 from "@/assets/event1.png";
import event2 from "@/assets/event2.png";
import event3 from "@/assets/event3.png";
import gallery1 from "@/assets/gallery1.png";
import gallery2 from "@/assets/gallery2.png";
import gallery3 from "@/assets/gallery3.png";
import gallery4 from "@/assets/gallery4.png";
import gallery5 from "@/assets/gallery5.png";
import gallery6 from "@/assets/gallery6.png";
import gallery7 from "@/assets/gallery7.png";
import gallery8 from "@/assets/gallery8.png";
import gallery9 from "@/assets/gallery9.png";
import gallery10 from "@/assets/gallery10.png";

const images = [
  { src: gallery1, alt: "Palco BeFre com painel LED colorido e flores" },
  { src: gallery2, alt: "DJ BeFre com painel LED vermelho" },
  { src: event1, alt: "Evento com iluminação verde e estrutura de palco" },
  { src: gallery4, alt: "Pista de dança com iluminação verde neon" },
  { src: gallery5, alt: "Estrutura BeFre com iluminação verde e vermelha" },
  { src: gallery6, alt: "Palco BeFre com iluminação azul e vermelha" },
  { src: event2, alt: "Casamento com iluminação azul e vermelha" },
  { src: gallery7, alt: "Festa com iluminação azul e lustre dourado" },
  { src: gallery3, alt: "Show com iluminação multicolorida" },
  { src: gallery8, alt: "Palco BeFre com painel LED e setup profissional" },
  { src: gallery9, alt: "Estrutura de palco com telas LED para casamento" },
  { src: gallery10, alt: "Show Léo e Raphael com mesa de som profissional" },
  { src: event3, alt: "Estrutura de LED com iluminação verde" },
];

const GallerySection = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const slideTo = useCallback(
    (index: number) => {
      const clamped = ((index % images.length) + images.length) % images.length;
      setCurrent(clamped);
      if (!trackRef.current) return;
      const container = trackRef.current.parentElement;
      if (!container) return;
      const containerW = container.offsetWidth;
      // Each slide: 80vw on mobile, 45vw on md, 33vw on lg — approximate with offsetWidth
      const slides = trackRef.current.children;
      if (!slides[clamped]) return;
      const slide = slides[clamped] as HTMLElement;
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const target = -(slideCenter - containerW / 2);
      animate(x, target, { type: "spring", stiffness: 200, damping: 30 });
    },
    [x]
  );

  const next = useCallback(() => slideTo(current + 1), [current, slideTo]);
  const prev = useCallback(() => slideTo(current - 1), [current, slideTo]);

  // Auto-play
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [next, isHovered]);

  // Initial center
  useEffect(() => {
    if (inView) slideTo(0);
  }, [inView, slideTo]);

  return (
    <section
      id="galeria"
      className="section-padding overflow-hidden"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          className="heading-display text-center text-3xl md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Nossos <span className="text-gradient-gold">eventos</span>
        </motion.h2>
      </div>

      {/* Carousel */}
      <motion.div
        className="relative mt-16"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Track container */}
        <div className="overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex gap-4 md:gap-6 cursor-grab active:cursor-grabbing"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -((images.length - 1) * 400), right: 100 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) next();
              else if (info.offset.x > 50) prev();
            }}
          >
            {images.map((img, i) => {
              const isActive = i === current;
              return (
                <motion.div
                  key={i}
                  className="relative flex-shrink-0 overflow-hidden rounded-2xl"
                  style={{
                    width: "clamp(300px, 40vw, 600px)",
                    height: "clamp(220px, 28vw, 420px)",
                  }}
                  animate={{
                    scale: isActive ? 1 : 0.9,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onClick={() => slideTo(i)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Navigation arrows */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full glass text-foreground/70 transition-all hover:text-foreground hover:scale-110"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => slideTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-primary"
                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full glass text-foreground/70 transition-all hover:text-foreground hover:scale-110"
            aria-label="Próximo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default GallerySection;
