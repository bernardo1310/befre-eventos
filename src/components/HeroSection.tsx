import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import logo from "@/assets/logo.png";

const WHATSAPP_LINK = "https://wa.me/5547999988040";

const HeroSection = () => {
  return (
    <section className="relative">
      <HeroGeometric
        badge="BeFre Eventos"
        title1="O melhor para o seu evento"
        title2="começa aqui."
        description="Sonorização profissional, iluminação cênica e estrutura completa para casamentos, festas e eventos inesquecíveis."
      >
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
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
        </div>
      </HeroGeometric>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <ChevronDown className="h-6 w-6 animate-scroll-indicator text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
