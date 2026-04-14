import { supabase } from "@/integrations/supabase/client";

export interface EventItem {
  id: string;
  code: string;
  title: string;
  location: string;
  date: string; // YYYY-MM-DD
}

export async function loadEvents(): Promise<EventItem[]> {
  const { data, error } = await supabase
    .from("events")
    .select("id, code, title, location, date")
    .order("date", { ascending: true });

  if (error) {
    console.error("Error loading events:", error);
    return [];
  }

  return (data || []).map((e) => ({
    id: e.id,
    code: e.code,
    title: e.title,
    location: e.location,
    date: e.date,
  }));
}

export async function saveEvent(event: Omit<EventItem, "id"> & { id?: string }): Promise<EventItem | null> {
  if (event.id) {
    // Update
    const { data, error } = await supabase
      .from("events")
      .update({ code: event.code, title: event.title, location: event.location, date: event.date })
      .eq("id", event.id)
      .select()
      .single();
    if (error) { console.error("Error updating event:", error); return null; }
    return data as EventItem;
  } else {
    // Insert
    const { data, error } = await supabase
      .from("events")
      .insert({ code: event.code, title: event.title, location: event.location, date: event.date })
      .select()
      .single();
    if (error) { console.error("Error inserting event:", error); return null; }
    return data as EventItem;
  }
}

export async function deleteEvent(id: string): Promise<boolean> {
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) { console.error("Error deleting event:", error); return false; }
  return true;
}

export function getEventsForDate(events: EventItem[], dateKey: string): EventItem[] {
  return events.filter((e) => e.date === dateKey);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
