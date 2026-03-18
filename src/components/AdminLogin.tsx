import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface AdminLoginProps {
  onClose: () => void;
}

export const AdminLoginDialog = ({ onClose }: AdminLoginProps) => {
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      onClose();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="relative z-10 w-full max-w-sm rounded-2xl border border-border/50 bg-card shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <div className="flex items-center justify-between border-b border-border/30 bg-muted/30 px-6 py-4">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-semibold text-foreground">Acesso Admin</h3>
            </div>
            <button onClick={onClose} className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm text-muted-foreground">Senha de administrador</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="w-full rounded-lg border border-border/50 bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                placeholder="Digite a senha"
              />
            </div>
            {error && (
              <motion.p
                className="text-sm text-destructive"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Senha incorreta. Tente novamente.
              </motion.p>
            )}
            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Entrar
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export const AdminLogoutButton = () => {
  const { isAdmin, logout } = useAuth();
  if (!isAdmin) return null;

  return (
    <button
      onClick={logout}
      className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
    >
      <LogOut className="h-3.5 w-3.5" />
      Sair do Admin
    </button>
  );
};
