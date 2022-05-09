import { IUsers } from 'app/entities/SimMangmentTool/users/users.model';

export interface IRole {
  id?: number;
  roleName?: string;
  users?: IUsers[] | null;
}

export class Role implements IRole {
  constructor(public id?: number, public roleName?: string, public users?: IUsers[] | null) {}
}

export function getRoleIdentifier(role: IRole): number | undefined {
  return role.id;
}
