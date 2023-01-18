import { useMutation } from "react-query";
import supabase from "@db";

export const useCreateWorker = () => {
  return useMutation(async (worker) => {
    const { data, error } = await supabase.from("workers").insert([worker]);
    const created = data && data[0];
    if (created.replacementId) {
      await supabase
        .from("workers")
        .update({ replacementId: created.id })
        .match({ id: created.replacementId });
    }
    if (error) throw error;
  });
};
