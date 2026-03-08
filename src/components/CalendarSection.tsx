import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WHATSAPP_BASE = "https://wa.me/5547999988040";

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

// Sample data: status per date key "YYYY-MM-DD"
const sampleEvents: Record<string, "reserved" | "full"> = {
  "2026-03-14": "reserved",
  "2026-03-21": "full",
  "2026-03-28": "reserved",
  "2026-04-04": "reserved",
  "2026-04-18": "full",
  "2026-05-09": "reserved",
  "2026-05-23": "reserved",
  "2026-06-06": "full",
  "2026-06-20": "reserved",
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const CalendarSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [currentMonth, setCurrentMonth] = useState(2); // March
  const [currentYear] = useState(2026);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prev = () => setCurrentMonth((m) => (m === 0 ? 11 : m - 1));
  const next = () => setCurrentMonth((m) => (m === 11 ? 0 : m + 1));

  const getStatus = (day: number) => {
    const key = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return sampleEvents[key] || "available";
  };

  const handleDateClick = (day: number) => {
    const status = getStatus(day);
    if (status === "available") {
      const formatted = `${String(day).padStart(2, "0")}/${String(currentMonth + 1).padStart(2, "0")}/${currentYear}`;
      setSelectedDate(formatted);
    }
  };

  const statusStyles = {
    available: "text-green-400 hover:bg-green-400/10 cursor-pointer",
    reserved: "text-yellow-400 bg-yellow-400/10",
    full: "text-red-400 bg-red-400/10",
  };

  return (
    <section id="agenda" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-2xl">
        <motion.h2
          className="heading-display text-center text-3xl md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gradient-gold">Agenda</span>
        </motion.h2>

        <motion.div
          className="mt-12 glass-strong rounded-2xl p-6 md:p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Month nav */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={prev} className="rounded-full p-2 transition-colors hover:bg-muted">
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <h3 className="text-lg font-semibold font-display text-foreground">
              {MONTHS[currentMonth]} {currentYear}
            </h3>
            <button onClick={next} className="rounded-full p-2 transition-colors hover:bg-muted">
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const status = getStatus(day);
              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${statusStyles[status]}`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" /> Disponível
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" /> Reservado
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" /> Lotado
            </span>
          </div>

          {/* Selected date CTA */}
          {selectedDate && (
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="mb-3 text-sm text-foreground">
                Data selecionada: <strong>{selectedDate}</strong>
              </p>
              <a
                href={`${WHATSAPP_BASE}?text=${encodeURIComponent(`Olá! Gostaria de consultar a disponibilidade para meu evento na data ${selectedDate}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              >
                Reservar minha data
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CalendarSection;
