import { useQuery } from "react-query";
import supabase from "@db";

export const useWorker = (id) => {
  return useQuery(
    ["workers", id],
    async () => {
      const { data, error } = await supabase
        .from("workers")
        .select("*,replacement:replacementId(*)", { count: "exact" })
        .match({ id })
        .single();

      if (error) throw error;

      return data;
    },
    { cacheTime: 0 }
  );
};
