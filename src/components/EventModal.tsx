import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Pencil, Trash2, Calendar, MapPin, Hash } from "lucide-react";
import { EventItem } from "@/data/events";
import { useAuth } from "@/contexts/AuthContext";

interface EventModalProps {
  dateLabel: string;
  dateKey: string;
  events: EventItem[];
  onClose: () => void;
  onSave: (event: EventItem) => void;
  onDelete: (id: string) => void;
}

const EventModal = ({ dateLabel, dateKey, events, onClose, onSave, onDelete }: EventModalProps) => {
  const { isAdmin } = useAuth();
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [creating, setCreating] = useState(false);

  const [formCode, setFormCode] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formDate, setFormDate] = useState(dateKey);

  const startCreate = () => {
    setEditing(null);
    setCreating(true);
    setFormCode("");
    setFormTitle("");
    setFormLocation("");
    setFormDate(dateKey);
  };

  const startEdit = (ev: EventItem) => {
    setCreating(false);
    setEditing(ev);
    setFormCode(ev.code);
    setFormTitle(ev.title);
    setFormLocation(ev.location);
    setFormDate(ev.date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;
    const event: EventItem = {
      id: editing ? editing.id : generateId(),
      code: formCode.trim(),
      title: formTitle.trim(),
      location: formLocation.trim(),
      date: formDate,
    };
    onSave(event);
    setEditing(null);
    setCreating(false);
  };

  const cancelForm = () => {
    setEditing(null);
    setCreating(false);
  };

  const showForm = creating || editing;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-lg rounded-2xl border border-border/50 bg-card shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/30 bg-muted/30 px-6 py-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-semibold text-foreground">{dateLabel}</h3>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[60vh] overflow-y-auto p-6">
            {events.length === 0 && !showForm ? (
              <p className="text-center text-sm text-muted-foreground py-8">
                Nenhum evento cadastrado para esta data.
              </p>
            ) : (
              <div className="space-y-3">
                {events.map((ev) => (
                  <motion.div
                    key={ev.id}
                    layout
                    className="group rounded-xl border border-border/30 bg-muted/20 p-4 transition-colors hover:bg-muted/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Hash className="h-3.5 w-3.5 text-primary/70" />
                          <span className="text-xs font-medium text-primary">{ev.code}</span>
                        </div>
                        <h4 className="font-semibold text-foreground leading-tight">{ev.title}</h4>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {ev.location}
                        </div>
                      </div>
                      {isAdmin && (
                        <div className="flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            onClick={() => startEdit(ev)}
                            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onDelete(ev.id)}
                            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Form */}
            {showForm && (
              <motion.form
                onSubmit={handleSubmit}
                className="mt-4 space-y-3 rounded-xl border border-primary/20 bg-primary/5 p-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <h4 className="text-sm font-semibold text-primary">
                  {editing ? "Editar Evento" : "Novo Evento"}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Código"
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    className="rounded-lg border border-border/50 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="rounded-lg border border-border/50 bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Título do evento"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                  className="w-full rounded-lg border border-border/50 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Local"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  className="w-full rounded-lg border border-border/50 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    onClick={cancelForm}
                    className="rounded-lg border border-border/50 px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted"
                  >
                    Cancelar
                  </button>
                </div>
              </motion.form>
            )}
          </div>

          {/* Footer */}
          {isAdmin && !showForm && (
            <div className="border-t border-border/30 px-6 py-4">
              <button
                onClick={startCreate}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                <Plus className="h-4 w-4" />
                Adicionar Evento
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EventModal;
