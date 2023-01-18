import { useQuery } from "react-query";
import supabase from "@db";

export const useAllWorkers = (filters: { name?: string } = { name: "" }) => {
  return useQuery(["workers", filters], async () => {
    const { data, error, count } = await supabase
      .from("workers")
      .select("*,replacement:replacementId(*)", { count: "exact" })
      .or(`firstname.ilike.${filters?.name}%,lastname.ilike.${filters?.name}%`)
      .order("next_date");

    if (error) throw error;

    return { data, count };
  });
};
