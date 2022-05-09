import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'customer',
        data: { pageTitle: 'simMangmentToolApp.simMangmentToolCustomer.home.title' },
        loadChildren: () => import('./SimMangmentTool/customer/customer.module').then(m => m.SimMangmentToolCustomerModule),
      },
      {
        path: 'dial',
        data: { pageTitle: 'simMangmentToolApp.simMangmentToolDial.home.title' },
        loadChildren: () => import('./SimMangmentTool/dial/dial.module').then(m => m.SimMangmentToolDialModule),
      },
      {
        path: 'bucket',
        data: { pageTitle: 'simMangmentToolApp.simMangmentToolBucket.home.title' },
        loadChildren: () => import('./SimMangmentTool/bucket/bucket.module').then(m => m.SimMangmentToolBucketModule),
      },
      {
        path: 'alert',
        data: { pageTitle: 'simMangmentToolApp.simMangmentToolAlert.home.title' },
        loadChildren: () => import('./SimMangmentTool/alert/alert.module').then(m => m.SimMangmentToolAlertModule),
      },
      {
        path: 'active-alert',
        data: { pageTitle: 'simMangmentToolApp.simMangmentToolActiveAlert.home.title' },
        loadChildren: () => import('./SimMangmentTool/active-alert/active-alert.module').then(m => m.SimMangmentToolActiveAlertModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
