import { ERole } from "@/enums/role.enum";

export interface IUser {
  id: string;

  first_name: string;

  last_name: string;

  full_name: string;

  email: string;

  email_verified: boolean;

  country_code: string;

  phone_number: string;

  full_phone_number: string;

  phone_number_verified: boolean;

  active: boolean;

  deleted: boolean;

  profile_pic: string;

  role: ERole;
}
