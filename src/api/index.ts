import { supabase } from "@/lib/supabase";

export const getSupabase = async (pageParam: number, dataKey: string) => {
  const ITEMS_PER_PAGE = 20;
  const from = pageParam * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;
  return supabase.from<string, Word>(dataKey).select("*").range(from, to).order("id", { ascending: true });
};
