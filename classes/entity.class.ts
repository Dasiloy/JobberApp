import { Omit } from "lodash";
import { Util } from "./util.class";
import { TResponse } from "@/dtos/query.dto";
import { IUser } from "@/interfaces/user.interface";

export abstract class BaseEntity {
  protected readonly util: Util = new Util();

  protected constructor(public readonly id: string) {}

  abstract getInstance(): Record<string, any>;

  static GetDataFromQuery<T>(data?: TResponse<T>, fallback = null) {
    return data?.data ?? fallback;
  }

  static CreateInstance<T extends BaseEntity>(
    this: new (...args: any[]) => T,
    data: Partial<T>
  ): T {
    return new this(data.id, ...Object.values(data));
  }
}
