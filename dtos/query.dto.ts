import { IPagination } from "@/interfaces/paginate.interface";

export type TQueryDTO<T = undefined> = {
  enabled?: boolean;
  params?: T;
};

export type TResponse<T = undefined> = {
  data: T;
  status: string;
  message: string;
  access_token?: string;
  pagination?: IPagination;
};
