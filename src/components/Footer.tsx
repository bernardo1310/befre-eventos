import { useState } from "react";
import logo from "@/assets/logo.png";
import { Instagram, Phone, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLoginDialog, AdminLogoutButton } from "@/components/AdminLogin";

const Footer = () => {
  const { isAdmin } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <footer className="border-t border-border bg-card/40 px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Logo */}
          <div>
            <img src={logo} alt="BeFre Eventos" className="h-16 w-auto" />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Sonorização profissional, iluminação cênica e estrutura completa.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-foreground font-display">Navegação</h4>
            <nav className="mt-4 flex flex-col gap-3">
              {[
                { label: "Sobre", href: "#sobre" },
                { label: "Pacotes", href: "#pacotes" },
                { label: "Galeria", href: "#galeria" },
                { label: "DJ", href: "#dj" },
                { label: "Agenda", href: "#agenda" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground font-display">Contato</h4>
            <div className="mt-4 space-y-3">
              <a
                href="https://wa.me/5547999988040"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                (47) 99998-8040
              </a>
              <a
                href="https://instagram.com/befre_eventos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Instagram className="h-4 w-4" />
                @befre_eventos
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BeFre Eventos. Todos os direitos reservados.
          </span>
          {isAdmin ? (
            <AdminLogoutButton />
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="rounded-full p-2 text-muted-foreground/30 transition-colors hover:text-muted-foreground/60"
              title="Admin"
            >
              <Settings className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {showLogin && <AdminLoginDialog onClose={() => setShowLogin(false)} />}
    </footer>
  );
};

export default Footer;
