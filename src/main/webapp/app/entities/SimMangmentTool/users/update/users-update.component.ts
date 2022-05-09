import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IUsers, Users } from '../users.model';
import { UsersService } from '../service/users.service';
import { ICustomer } from 'app/entities/SimMangmentTool/customer/customer.model';
import { CustomerService } from 'app/entities/SimMangmentTool/customer/service/customer.service';
import { IRole } from 'app/entities/SimMangmentTool/role/role.model';
import { RoleService } from 'app/entities/SimMangmentTool/role/service/role.service';

@Component({
  selector: 'jhi-users-update',
  templateUrl: './users-update.component.html',
})
export class UsersUpdateComponent implements OnInit {
  isSaving = false;

  customersSharedCollection: ICustomer[] = [];
  rolesSharedCollection: IRole[] = [];

  editForm = this.fb.group({
    id: [],
    userName: [null, [Validators.required]],
    userPassword: [null, [Validators.required]],
    userEmail: [null, [Validators.required]],
    userDial: [null, [Validators.required]],
    customer: [],
    role: [],
  });

  constructor(
    protected usersService: UsersService,
    protected customerService: CustomerService,
    protected roleService: RoleService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ users }) => {
      this.updateForm(users);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const users = this.createFromForm();
    if (users.id !== undefined) {
      this.subscribeToSaveResponse(this.usersService.update(users));
    } else {
      this.subscribeToSaveResponse(this.usersService.create(users));
    }
  }

  trackCustomerById(_index: number, item: ICustomer): number {
    return item.id!;
  }

  trackRoleById(_index: number, item: IRole): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsers>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(users: IUsers): void {
    this.editForm.patchValue({
      id: users.id,
      userName: users.userName,
      userPassword: users.userPassword,
      userEmail: users.userEmail,
      userDial: users.userDial,
      customer: users.customer,
      role: users.role,
    });

    this.customersSharedCollection = this.customerService.addCustomerToCollectionIfMissing(this.customersSharedCollection, users.customer);
    this.rolesSharedCollection = this.roleService.addRoleToCollectionIfMissing(this.rolesSharedCollection, users.role);
  }

  protected loadRelationshipsOptions(): void {
    this.customerService
      .query()
      .pipe(map((res: HttpResponse<ICustomer[]>) => res.body ?? []))
      .pipe(
        map((customers: ICustomer[]) =>
          this.customerService.addCustomerToCollectionIfMissing(customers, this.editForm.get('customer')!.value)
        )
      )
      .subscribe((customers: ICustomer[]) => (this.customersSharedCollection = customers));

    this.roleService
      .query()
      .pipe(map((res: HttpResponse<IRole[]>) => res.body ?? []))
      .pipe(map((roles: IRole[]) => this.roleService.addRoleToCollectionIfMissing(roles, this.editForm.get('role')!.value)))
      .subscribe((roles: IRole[]) => (this.rolesSharedCollection = roles));
  }

  protected createFromForm(): IUsers {
    return {
      ...new Users(),
      id: this.editForm.get(['id'])!.value,
      userName: this.editForm.get(['userName'])!.value,
      userPassword: this.editForm.get(['userPassword'])!.value,
      userEmail: this.editForm.get(['userEmail'])!.value,
      userDial: this.editForm.get(['userDial'])!.value,
      customer: this.editForm.get(['customer'])!.value,
      role: this.editForm.get(['role'])!.value,
    };
  }
}
