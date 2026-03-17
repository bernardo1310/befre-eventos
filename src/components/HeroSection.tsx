import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.png";

const WHATSAPP_LINK = "https://wa.me/5547999988040";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background image with parallax-like depth */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}>
        
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover object-center"
          style={{ filter: "blur(1.5px)" }}
          draggable={false} />
        
      </motion.div>

      {/* Dark cinematic overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
          "linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.50) 40%, rgba(0,0,0,0.75) 100%)"
        }} />
      

      {/* Subtle vignette for depth */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
          "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)"
        }} />
      

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        {/* Logo — larger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="mb-10">
          
          <img

            alt="BeFre Eventos"
            className="mx-auto w-72 md:w-96 lg:w-[420px] max-w-[420px] h-auto drop-shadow-2xl" src="/lovable-uploads/5f24987d-842f-4f15-9fbb-f4e419c89f08.png" />
          
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}>
          
          <h1 className="heading-display max-w-4xl mx-auto text-4xl md:text-6xl lg:text-7xl text-foreground drop-shadow-lg">
            O melhor para o seu evento{" "}
            <span className="text-gradient-gold">começa aqui.</span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
          className="mx-auto mt-8 max-w-xl text-base text-foreground/80 md:text-lg drop-shadow-md">
          
          Sonorização profissional, iluminação cênica e estrutura completa para
          casamentos, festas e eventos inesquecíveis.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          
          <a
            href="#agenda"
            className="group relative inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105">
            
            Ver disponibilidade
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="glass inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-card/80 hover:scale-105">
            
            Falar no WhatsApp
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}>
        
        <ChevronDown className="h-6 w-6 animate-scroll-indicator text-foreground/50" />
      </motion.div>
    </section>);

};

export default HeroSection;