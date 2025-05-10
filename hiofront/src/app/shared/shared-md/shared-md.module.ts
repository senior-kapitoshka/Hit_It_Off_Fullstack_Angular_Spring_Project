import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventProfileComponent } from '../../events/components/event-profile/event-profile.component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { IsGrantedDirective } from '../../app/directives/is-granted.directive';



@NgModule({
  declarations: [
    IsGrantedDirective,
    EventProfileComponent,
  ],
  exports: [
    IsGrantedDirective,
    EventProfileComponent,
  ],imports:[
    MatExpansionModule,
    MatAccordion
  ]
})
export class SharedMdModule { }
