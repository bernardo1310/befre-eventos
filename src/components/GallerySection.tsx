import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import event1 from "@/assets/event1.png";
import event2 from "@/assets/event2.png";
import event3 from "@/assets/event3.png";

const images = [
  { src: event1, alt: "Evento com iluminação verde e estrutura de palco", tall: false },
  { src: event2, alt: "Casamento com iluminação azul e vermelha", tall: true },
  { src: event3, alt: "Estrutura de LED com iluminação verde", tall: false },
];

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="galeria" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <motion.h2
          className="heading-display text-center text-3xl md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Nossos <span className="text-gradient-gold">eventos</span>
        </motion.h2>

        <div className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="mb-6 break-inside-avoid overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i }}
            >
              <div className="group relative overflow-hidden rounded-2xl">
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    img.tall ? "h-[500px]" : "h-[350px]"
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
