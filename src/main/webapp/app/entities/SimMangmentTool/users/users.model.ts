import { ICustomer } from 'app/entities/SimMangmentTool/customer/customer.model';
import { IRole } from 'app/entities/SimMangmentTool/role/role.model';

export interface IUsers {
  id?: number;
  userName?: string;
  userPassword?: string;
  userEmail?: string;
  userDial?: number;
  customer?: ICustomer | null;
  role?: IRole | null;
}

export class Users implements IUsers {
  constructor(
    public id?: number,
    public userName?: string,
    public userPassword?: string,
    public userEmail?: string,
    public userDial?: number,
    public customer?: ICustomer | null,
    public role?: IRole | null
  ) {}
}

export function getUsersIdentifier(users: IUsers): number | undefined {
  return users.id;
}
