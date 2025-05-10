import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {MatIcon, MatIconModule} from '@angular/material/icon'
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatSlideToggle} from '@angular/material/slide-toggle'
import {MatCheckbox} from'@angular/material/checkbox'
import {MatDatepicker} from'@angular/material/datepicker'
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSlideToggle,
    MatCheckbox,
    MatDatepicker,
    MatExpansionModule,
    MatAccordion,
    MatToolbar, MatMenu, MatButton, MatIcon,MatSidenav,MatMenuModule,
    MatSortModule 
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatSlideToggle,
    MatCheckbox,
    MatDatepicker,
    MatExpansionModule,
    MatAccordion,
    MatToolbar, MatMenu, MatButton, MatIcon,MatSidenav,MatMenuModule,
    MatSortModule 
  ]
})
export class MaterialModule { }