export interface EventItem {
  id: string;
  code: string;
  title: string;
  location: string;
  date: string; // YYYY-MM-DD
}

// Helper to generate events for date ranges
function rangeEvents(
  startDate: string,
  endDate: string,
  items: { code: string; title: string; location: string }[]
): EventItem[] {
  const results: EventItem[] = [];
  const start = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T00:00:00");

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    items.forEach((item) => {
      results.push({
        id: `${item.code}-${dateStr}`,
        code: item.code,
        title: item.title,
        location: item.location,
        date: dateStr,
      });
    });
  }
  return results;
}

const singleEvents: EventItem[] = [
  { id: "689-1", code: "689", title: "Dia de Campo Cravil", location: "Rio do Sul", date: "2026-02-12" },
  { id: "697-1", code: "697", title: "Encontrão Evangélico", location: "Alfredo Wagner", date: "2026-02-13" },
  { id: "690-1", code: "690", title: "Dia de Campo Cravil", location: "Rio do Sul", date: "2026-02-13" },
  { id: "695-1", code: "695", title: "Encontrão Evangélico", location: "Alfredo Wagner", date: "2026-02-14" },
  { id: "654-1", code: "654", title: "Mariana e Matheus", location: "Santuário", date: "2026-02-14" },
  { id: "696-1", code: "696", title: "Encontrão Evangélico", location: "Alfredo Wagner", date: "2026-02-15" },
  { id: "606-1", code: "606", title: "Bodas Rubens e Ana", location: "Ituporanga", date: "2026-02-21" },
  { id: "701-1", code: "701", title: "15 anos Maitê", location: "Ituporanga", date: "2026-03-07" },
  { id: "595-1", code: "595", title: "Caiane e Rafael", location: "Três Barras", date: "2026-03-14" },
  { id: "718-1", code: "718", title: "Jantar lançamento Festa Matriz", location: "Centro", date: "2026-03-20" },
  { id: "713-1", code: "713", title: "Corteva", location: "Rio Batalha", date: "2026-04-06" },
  { id: "587-1", code: "587", title: "Laura Julia Gilz e Allan Vinicius Rengel", location: "Figueiredo", date: "2026-04-18" },
  { id: "700-1", code: "700", title: "Luciane e Valdemar", location: "Petropark", date: "2026-04-25" },
  { id: "601-1", code: "601", title: "Igor e Morgana", location: "A definir", date: "2026-05-09" },
  { id: "657-1", code: "657", title: "Bodas Laudir e Izolde", location: "Santuário", date: "2026-05-23" },
  { id: "712-1", code: "712", title: "Bodas de Ouro", location: "Goiabal", date: "2026-06-20" },
  { id: "699-1", code: "699", title: "45 anos Sintonia FM", location: "Complexo", date: "2026-07-11" },
  { id: "685-1", code: "685", title: "Michele e Gabriel", location: "Rio do Sul", date: "2026-09-05" },
  { id: "673-1", code: "673", title: "Casamento Maria Julia e Antony", location: "Taió", date: "2026-09-12" },
  { id: "679-1", code: "679", title: "Casamento Tatiana e Rubens", location: "Ituporanga", date: "2026-09-19" },
  { id: "648-1", code: "648", title: "Kleyton e Taili", location: "Ituporanga", date: "2026-09-26" },
  { id: "585-1", code: "585", title: "Casamento Layane e Felipe", location: "Ituporanga", date: "2026-10-17" },
  { id: "684-1", code: "684", title: "André e Thaise", location: "Ituporanga", date: "2026-10-31" },
  { id: "717-1", code: "717", title: "Lucas e Elisandra", location: "Agrolândia", date: "2026-11-14" },
  { id: "698-1", code: "698", title: "Formatura Otilia Muller", location: "Rohling", date: "2026-12-18" },
  { id: "719-1", code: "719", title: "Formatura Terceirão", location: "Atalanta", date: "2027-01-23" },
  { id: "691-1", code: "691", title: "Eduardo e Gabriela", location: "Goiabal", date: "2027-02-06" },
];

const rangedEvents: EventItem[] = [
  ...rangeEvents("2026-04-10", "2026-04-12", [
    { code: "703", title: "Festa da cebola", location: "Ituporanga" },
    { code: "702", title: "Festa da cebola", location: "Ituporanga" },
    { code: "704", title: "Festa da cebola", location: "Ituporanga" },
  ]),
  ...rangeEvents("2026-05-01", "2026-05-03", [
    { code: "705", title: "Matriz", location: "Ituporanga" },
    { code: "706", title: "Matriz", location: "Ituporanga" },
    { code: "707", title: "Matriz", location: "Ituporanga" },
  ]),
  ...rangeEvents("2026-07-02", "2026-07-05", [
    { code: "708", title: "Festa São Pedro", location: "Gabiroba" },
    { code: "709", title: "Festa São Pedro", location: "Gabiroba" },
    { code: "710", title: "Festa São Pedro", location: "Gabiroba" },
    { code: "711", title: "Festa São Pedro", location: "Gabiroba" },
  ]),
  ...rangeEvents("2027-02-05", "2027-02-07", [
    { code: "714", title: "Encontro Evangélico", location: "Alfredo Wagner" },
    { code: "715", title: "Encontro Evangélico", location: "Alfredo Wagner" },
    { code: "716", title: "Encontro Evangélico", location: "Alfredo Wagner" },
  ]),
];

export const INITIAL_EVENTS: EventItem[] = [...singleEvents, ...rangedEvents];

// LocalStorage helpers
const STORAGE_KEY = "befre_events";

export function loadEvents(): EventItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  // First load: seed with initial data
  saveEvents(INITIAL_EVENTS);
  return INITIAL_EVENTS;
}

export function saveEvents(events: EventItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function getEventsForDate(events: EventItem[], dateKey: string): EventItem[] {
  return events.filter((e) => e.date === dateKey);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
