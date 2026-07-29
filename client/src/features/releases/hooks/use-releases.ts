import { useQuery } from "@tanstack/react-query";

import { getReleases } from "../api/get-releases";

export const useReleases = () => {
  return useQuery({
    queryKey: ["releases"],
    queryFn: getReleases,
  });
};