import supabase from "@db";
import { useMutation } from "react-query";

export const useRemoveWorker = () => {
  return useMutation<void, any, string>(async (id) => {
    await supabase
      .from("workers")
      .update({ replacementId: null })
      .match({ replacementId: id });

    const { error } = await supabase.from("workers").delete().match({ id });

    if (error) throw error;
  });
};
