import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const WHATSAPP_LINK = "https://wa.me/5547999988040";

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" ref={ref}>
      <motion.div
        className="mx-auto max-w-4xl glass-strong glow-gold-strong rounded-3xl p-12 text-center md:p-20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl">
          Garanta a data{" "}
          <span className="text-gradient-gold">do seu evento</span>
        </h2>
        <p className="mt-6 text-muted-foreground text-lg">
          Datas para casamentos e eventos costumam esgotar rapidamente.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="#agenda"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
          >
            Ver disponibilidade
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="glass inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-card/80 hover:scale-105"
          >
            Falar no WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
