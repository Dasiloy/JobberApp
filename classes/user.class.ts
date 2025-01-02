import { ERole } from "@/enums/role.enum";
import { IUser } from "@/interfaces/user.interface";
import { omit } from "lodash";
import { BaseEntity } from "./entity.class";

export class User extends BaseEntity implements IUser {
  constructor(
    public readonly id: string,
    public readonly first_name: string,
    public readonly last_name: string,
    public readonly full_name: string,
    public readonly email: string,
    public readonly email_verified: boolean,
    public readonly phone_number: string,
    public readonly country_code: string,
    public readonly full_phone_number: string,
    public readonly phone_number_verified: boolean,
    public readonly role: ERole,
    public readonly profile_pic: string,
    public readonly active: boolean,
    public readonly deleted: boolean
  ) {
    super(id);
  }

  getInstance(): Omit<User, "id"> {
    return {
      ...omit(this, ["id"]),
    };
  }
}

// Usage
const user = User.CreateInstance({
  id: "user123",
  first_name: "John",
  last_name: "Doe",
  full_name: "John Doe",
  email: "john.doe@example.com",
  email_verified: true,
  phone_number: "+234567890123",
  country_code: "NG",
  full_phone_number: "+234 567 890 123",
  phone_number_verified: true,
  role: ERole.JOB_SEEKER,
  profile_pic: "https://example.com/john-doe.jpg",
  active: true,
  deleted: false,
});
