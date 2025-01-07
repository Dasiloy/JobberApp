import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/interfaces/user.interface";
import { TQueryDTO, TResponse } from "@/dtos/query.dto";
import { useRefreshOnFocus } from "@/hooks/use_refetch_focus";

export const useUser = (param?: TQueryDTO) => {
  const query = useQuery<TResponse<IUser>, Error>({
    retry: false,
    queryKey: ["user", param],
    enabled: param?.enabled ?? true,
    queryFn: async () => {
      try {
        const response = await api.get("/auth/me");
        return response.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });
  useRefreshOnFocus(query.refetch);
  return query;
};
