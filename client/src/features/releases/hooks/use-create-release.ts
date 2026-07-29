import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createRelease,
  type CreateReleasePayload,
} from "../api/create-release";

export const useCreateRelease = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReleasePayload) =>
      createRelease(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["releases"],
      });
    },
  });
};