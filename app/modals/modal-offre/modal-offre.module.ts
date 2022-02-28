import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalOffrePageRoutingModule } from './modal-offre-routing.module';

import { ModalOffrePage } from './modal-offre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalOffrePageRoutingModule
  ],
  declarations: [ModalOffrePage]
})
export class ModalOffrePageModule {}
