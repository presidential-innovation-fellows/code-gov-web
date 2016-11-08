import { NgModule } from '@angular/core'
import { ModalComponent } from './modal.component';
import { CommonModule } from '@angular/common'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ModalComponent
  ],
  exports: [
    ModalComponent
  ]
})
export class ModalModule {}
