import { useQuery } from "react-query";
import supabase from "@db";

export const useWorkers = (
  filters?: { name?: string },
  pagination: { page: number; perPage: number } = { page: 1, perPage: 3 }
) => {
  return useQuery(["workers", filters, pagination], async () => {
    const { data, error, count } = await supabase
      .from("workers")
      .select("*,replacement:replacementId(*)", { count: "exact" })
      .or(`firstname.ilike.${filters?.name}%,lastname.ilike.${filters?.name}%`)
      .range(
        (pagination.page - 1) * pagination.perPage,
        (pagination.page - 1) * pagination.perPage + pagination.perPage - 1
      )
      .order("next_date");

    if (error) throw error;

    return { data, count };
  });
};
