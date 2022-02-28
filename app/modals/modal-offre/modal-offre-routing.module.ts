import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalOffrePage } from './modal-offre.page';

const routes: Routes = [
  {
    path: '',
    component: ModalOffrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalOffrePageRoutingModule {}
