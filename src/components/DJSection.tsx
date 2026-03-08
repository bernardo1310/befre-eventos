import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Music, Headphones, Award, Mic } from "lucide-react";
import djPhoto1 from "@/assets/dj1.png";
import djPhoto2 from "@/assets/dj2.png";

const features = [
  { icon: Music, text: "Repertório open format" },
  { icon: Headphones, text: "Equipamento profissional" },
  { icon: Award, text: "Mais de 100 eventos realizados" },
  { icon: Mic, text: "Excelente comunicador" },
];

const DJSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="dj" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Photo placeholder */}
          <motion.div
            className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl glass glow-gold"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <Headphones className="mx-auto h-20 w-20 text-primary/40" />
                <p className="mt-4 text-sm text-muted-foreground">DJ Adriano Coelho</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl">
              DJ <span className="text-gradient-gold">Adriano Coelho</span>
            </h2>

            <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Com anos de experiência em casamentos e eventos sociais, DJ
                Adriano Coelho é especialista em criar a atmosfera perfeita para
                cada momento do evento.
              </p>
              <p>
                Desde o pôr do sol até o último minuto da pista de dança, ele
                conduz o evento com sensibilidade musical e energia.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.text}
                    className="glass flex items-center gap-3 rounded-xl p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  >
                    <Icon className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-xs text-foreground">{f.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DJSection;
