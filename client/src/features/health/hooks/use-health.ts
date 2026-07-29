import { useQuery } from "@tanstack/react-query";

import { getHealth } from "../api/get-health";

export const useHealth = () => {
  return useQuery({
    queryKey: ["health"],
    queryFn: getHealth,
  });
};