import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import heroImg from "@/assets/event2.png";

const WHATSAPP_LINK = "https://wa.me/5547999988040";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="BeFre Eventos - Estrutura de iluminação e som"
          className="h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        {/* Subtle light effects */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.img
          src={logo}
          alt="BeFre Eventos"
          className="mb-8 h-24 w-auto md:h-32 lg:h-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        <motion.h1
          className="heading-display max-w-3xl text-3xl text-foreground md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          O melhor para o seu evento{" "}
          <span className="text-gradient-gold">começa aqui.</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg lg:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Sonorização profissional, iluminação cênica e estrutura completa para
          casamentos, festas e eventos inesquecíveis.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <a
            href="#agenda"
            className="group relative inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
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
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <ChevronDown className="h-6 w-6 animate-scroll-indicator text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
