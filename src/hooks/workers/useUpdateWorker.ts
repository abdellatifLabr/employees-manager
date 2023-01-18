import { useMutation } from "react-query";
import supabase from "@db";

export const useUpdateWorker = () => {
  return useMutation<any, any, any>(async ({ id, worker }) => {
    const { data, error } = await supabase
      .from("workers")
      .update(worker)
      .match({ id });

    await supabase
      .from("workers")
      .update({ replacementId: null })
      .match({ replacementId: id });

    const updated = data && data[0];
    if (updated.replacementId) {
      await supabase
        .from("workers")
        .update({ replacementId: id })
        .match({ id: updated.replacementId });
    }

    if (error) throw error;

    return updated;
  });
};
