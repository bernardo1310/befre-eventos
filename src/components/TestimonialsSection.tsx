import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Rubens & Ana",
    quote: "Celebrar nossas bodas de ouro foi algo muito especial para nós. Não era nosso primeiro casamento, mas o Adriano conseguiu transformar a noite em algo único. Ele construiu cada detalhe do evento e superou completamente nossas expectativas.",
    rating: 5,
  },
  {
    name: "Daniela & Fabiano",
    quote: "Nosso casamento aconteceu há mais de dez anos e tivemos o prazer de contar com a Befre na estrutura e com o Adriano Coelho na organização. Foi um momento muito especial para nós, e todo o trabalho realizado foi simplesmente impecável.",
    rating: 5,
  },
  {
    name: "José & Inês",
    quote: "Adriano foi impecável em cada detalhe. As luzes, o painel e toda a ambientação estavam lindos. Foi um evento inesquecível que ficará marcado para sempre em nossas vidas.",
    rating: 5,
  },
  {
    name: "Bernardo — Formatura Galileu 2023",
    quote: "Sensacional! A estrutura era incrível, com tecnologia de ponta e tudo pensado nos mínimos detalhes para a nossa formatura. O repertório do DJ agradou a todos, passando pela vaneira até o mega funk e mantendo a pista animada a noite inteira. 🎉",
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
