import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Star } from "lucide-react";
import estruturaOuro from "@/assets/estrutura_ouro.jpg";
import estruturaPrata from "@/assets/estrutura_prata.jpeg";
import estruturaBronze from "@/assets/estrutura_bronze.jpg";

const WHATSAPP_LINK = "https://wa.me/5547999988040";

const packages = [
  {
    name: "Estrutura Bronze",
    highlighted: false,
    badge: null,
    image: estruturaBronze,
    features: [
      "8 luzes cênicas",
      "4 subwoofers",
      "4 line arrays",
      "DJ profissional",
      "4 horas de baile",
    ],
    note: "Ideal para eventos íntimos até 150 convidados",
  },
  {
    name: "Estrutura Prata",
    highlighted: false,
    badge: null,
    image: estruturaPrata,
    features: [
      "14 luzes cênicas",
      "8 subwoofers",
      "6 line arrays",
      "DJ profissional",
      "4 horas de baile",
    ],
    note: null,
  },
  {
    name: "Estrutura Ouro",
    highlighted: true,
    badge: "Mais escolhido",
    image: estruturaOuro,
    features: [
      "25 luzes cênicas",
      "Painel de LED",
      "8 subwoofers",
      "6 line arrays",
      "DJ profissional",
      "5h30 de baile",
    ],
    note: "Traga sua ideia ou imaginação e nós construímos o palco ideal para o seu evento. Cada estrutura pode ser totalmente personalizada para o seu espaço.",
  },
];

const PackagesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pacotes" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl">
            Escolha o pacote ideal{" "}
            <span className="text-gradient-gold">para o seu evento</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Todos os pacotes incluem sonorização profissional, iluminação cênica
            e DJ profissional. Os projetos podem ser personalizados de acordo com
            o tamanho e conceito do evento.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              className={`relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                pkg.highlighted
                  ? "glass-strong glow-gold border-primary/30"
                  : "glass"
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
            >
              {pkg.badge && (
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  <Star className="h-3 w-3" />
                  {pkg.badge}
                </div>
              )}

              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-xl font-bold font-display text-foreground drop-shadow-lg">
                  {pkg.name}
                </h3>
              </div>

              <div className="flex flex-1 flex-col p-8 pt-4">
                <ul className="mt-4 flex-1 space-y-4">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>

                {pkg.note && (
                  <p className="mt-6 text-xs text-muted-foreground/70 leading-relaxed italic">
                    {pkg.note}
                  </p>
                )}

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                    pkg.highlighted
                      ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25"
                      : "glass text-foreground hover:bg-card/80"
                  }`}
                >
                  Consultar disponibilidade
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
