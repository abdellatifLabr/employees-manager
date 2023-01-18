import { useQuery, useMutation } from "react-query";
import supabase from "@db";

export const useSettings = () => {
  const {
    data: settings,
    isLoading: isQueryLoading,
    error: queryError,
  } = useQuery("settings", async () => {
    const { data } = await supabase.from("settings").select("*");
    return data;
  });

  const {
    mutate: updateSettings,
    isLoading: isMutationLoading,
    error: mutationError,
  } = useMutation<any, any, any>(async ({ name, value }) => {
    await supabase.from("settings").update({ value }).match({ name });
  });

  return {
    settings,
    updateSettings,
    isLoading: isQueryLoading || isMutationLoading,
    errors: queryError || mutationError,
  };
};
