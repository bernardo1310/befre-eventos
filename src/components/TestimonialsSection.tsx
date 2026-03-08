import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Camila & Rafael",
    quote: "A estrutura de som e iluminação foi impecável. Nosso casamento ficou inesquecível.",
    rating: 5,
  },
  {
    name: "Juliana & Marcos",
    quote: "O DJ Adriano fez a festa ser incrível! Todos os convidados elogiaram demais a pista de dança.",
    rating: 5,
  },
  {
    name: "Fernanda & Lucas",
    quote: "Profissionalismo do início ao fim. A iluminação cênica transformou completamente o espaço.",
    rating: 5,
  },
  {
    name: "Amanda & Thiago",
    quote: "Superou todas as nossas expectativas. A equipe BeFre é extremamente dedicada e talentosa.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  const t = testimonials[current];

  return (
    <section className="section-padding" ref={ref}>
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          className="heading-display text-3xl md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          O que nossos clientes{" "}
          <span className="text-gradient-gold">dizem</span>
        </motion.h2>

        <motion.div
          className="mt-16 glass-strong rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Stars */}
          <div className="flex justify-center gap-1">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-primary text-primary" />
            ))}
          </div>

          <blockquote className="mt-6 text-lg text-foreground leading-relaxed md:text-xl italic">
            "{t.quote}"
          </blockquote>

          <p className="mt-6 text-sm font-semibold text-gradient-gold font-display">
            {t.name}
          </p>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={prev} className="rounded-full p-2 transition-colors hover:bg-muted">
              <ChevronLeft className="h-5 w-5 text-muted-foreground" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-primary" : "w-2 bg-muted"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="rounded-full p-2 transition-colors hover:bg-muted">
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
