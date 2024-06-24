import kpuApi from "@/lib/kpu-api";
import { UpdateFavorite } from "@/lib/kpu-api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useFavoriteMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ favorite, uid }: UpdateFavorite) =>
      kpuApi.updateFavorite({ favorite, uid }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
      queryClient.invalidateQueries({
        queryKey: ["other-services"],
      });
    },
  });
}
