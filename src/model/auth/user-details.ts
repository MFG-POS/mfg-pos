import { BaseModel } from 'model/base-model';
import { UserRole } from 'model/enums/user-role';

export type UserDetails = BaseModel & {
  email: string;
  name: string;
  surname: string;
  role: keyof typeof UserRole;
};

export type UserWrite = UserDetails & {
  password: string;
};
