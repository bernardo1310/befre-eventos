import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EventItem, loadEvents, saveEvent, deleteEvent, getEventsForDate } from "@/data/events";
import { useAuth } from "@/contexts/AuthContext";
import EventModal from "@/components/EventModal";
import { AdminLoginDialog, AdminLogoutButton } from "@/components/AdminLogin";

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const CalendarSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const { isAdmin } = useAuth();

  // Hidden admin access: triple-click on title
  const [clickCount, setClickCount] = useState(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTitleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (clickTimer.current) clearTimeout(clickTimer.current);
    if (newCount >= 5) {
      setClickCount(0);
      if (!isAdmin) setShowLogin(true);
    } else {
      clickTimer.current = setTimeout(() => setClickCount(0), 1500);
    }
  };

  useEffect(() => {
    loadEvents().then(setEvents);
  }, []);

  const refreshEvents = async () => {
    const updated = await loadEvents();
    setEvents(updated);
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const eventCountMap = useMemo(() => {
    const map: Record<number, number> = {};
    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const count = getEventsForDate(events, key).length;
      if (count > 0) map[d] = count;
    }
    return map;
  }, [events, currentMonth, currentYear, daysInMonth]);

  const prev = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1); }
    else setCurrentMonth((m) => m - 1);
  };

  const next = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1); }
    else setCurrentMonth((m) => m + 1);
  };

  const makeDateKey = (day: number) =>
    `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const handleDayClick = (day: number) => setSelectedDateKey(makeDateKey(day));

  const selectedEvents = selectedDateKey ? getEventsForDate(events, selectedDateKey) : [];

  const formatDateLabel = (key: string) => {
    const [y, m, d] = key.split("-");
    return `${d}/${m}/${y}`;
  };

  const handleSaveEvent = async (event: EventItem) => {
    await saveEvent(event);
    await refreshEvents();
  };

  const handleDeleteEvent = async (id: string) => {
    await deleteEvent(id);
    await refreshEvents();
  };

  return (
    <section id="agenda" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-2xl">
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="heading-display text-center text-3xl md:text-4xl lg:text-5xl cursor-default select-none"
            onClick={handleTitleClick}
          >
            <span className="text-gradient-gold">Agenda</span>
          </h2>
        </motion.div>

        {/* Admin controls - only visible when logged in */}
        {isAdmin && (
          <motion.div
            className="mt-4 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AdminLogoutButton />
          </motion.div>
        )}

        <motion.div
          className="mt-8 glass-strong rounded-2xl p-6 md:p-8"
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
              const count = eventCountMap[day] || 0;
              const hasEvents = count > 0;
              return (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  title={hasEvents ? `${count} evento${count > 1 ? "s" : ""}` : "Sem eventos"}
                  className={`relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                    ${hasEvents
                      ? "text-primary hover:bg-primary/10 font-semibold"
                      : "text-foreground/60 hover:bg-muted/40"
                    }`}
                >
                  {day}
                  {hasEvents && (
                    <span className="absolute bottom-1 flex gap-0.5">
                      {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
                        <span key={i} className="h-1 w-1 rounded-full bg-primary" />
                      ))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" /> Com eventos
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" /> Sem eventos
            </span>
            {isAdmin && (
              <span className="flex items-center gap-2 text-primary">
                ✏️ Modo Admin ativo
              </span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Event modal */}
      {selectedDateKey && (
        <EventModal
          dateLabel={formatDateLabel(selectedDateKey)}
          dateKey={selectedDateKey}
          events={selectedEvents}
          onClose={() => setSelectedDateKey(null)}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
        />
      )}

      {/* Login dialog */}
      {showLogin && <AdminLoginDialog onClose={() => setShowLogin(false)} />}
    </section>
  );
};

export default CalendarSection;
