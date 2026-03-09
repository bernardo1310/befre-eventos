import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import eventImg from "@/assets/event1.png";

const stats = [
  { value: "10+", label: "Anos de experiência" },
  { value: "100+", label: "Casamentos realizados" },
  { value: "300+", label: "Eventos produzidos" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            className="relative overflow-hidden rounded-2xl shadow-luxury"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <img
              src={eventImg}
              alt="BeFre Eventos - Estrutura profissional"
              className="h-[500px] w-full object-cover lg:h-[600px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl">
              Mais de <span className="text-gradient-gold">300 produções</span>{" "}
              realizadas
            </h2>

            <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
              <p>
                A BEFRE EVENTOS nasceu de uma paixão genuína pela música e pela
                energia única que um evento bem produzido pode criar.
              </p>
              <p>
                Começamos com pequenos projetos e, ao longo de mais de uma
                década, evoluímos constantemente em busca de equipamentos
                profissionais e estruturas completas capazes de transformar
                qualquer espaço em uma experiência memorável.
              </p>
              <p>
                Com mais de 100 casamentos realizados, tratamos cada evento como
                único. Nossa missão é garantir que a trilha sonora do seu grande
                dia seja tão inesquecível quanto os momentos que ele cria.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center lg:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                >
                  <div className="text-3xl font-bold text-gradient-gold md:text-4xl font-display">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground md:text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
