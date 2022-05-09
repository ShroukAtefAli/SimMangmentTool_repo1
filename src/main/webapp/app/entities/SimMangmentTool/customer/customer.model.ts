import { IDial } from 'app/entities/SimMangmentTool/dial/dial.model';
import { IBucket } from 'app/entities/SimMangmentTool/bucket/bucket.model';
import { IUsers } from 'app/entities/SimMangmentTool/users/users.model';

export interface ICustomer {
  id?: number;
  customerName?: string;
  contarctId?: number | null;
  customerParent?: string | null;
  dummyContract?: number | null;
  customerIdHight?: number | null;
  customerCode?: string | null;
  dials?: IDial[] | null;
  buckets?: IBucket[] | null;
  users?: IUsers[] | null;
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public customerName?: string,
    public contarctId?: number | null,
    public customerParent?: string | null,
    public dummyContract?: number | null,
    public customerIdHight?: number | null,
    public customerCode?: string | null,
    public dials?: IDial[] | null,
    public buckets?: IBucket[] | null,
    public users?: IUsers[] | null
  ) {}
}

export function getCustomerIdentifier(customer: ICustomer): number | undefined {
  return customer.id;
}
