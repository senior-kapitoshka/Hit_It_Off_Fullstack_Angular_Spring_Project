import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../app/models/user.interface';
import { HomeService} from '../../../../app/core/services/home.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth-form',
  standalone:false,
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AuthFormComponent implements OnInit,OnChanges{

  @Input() title: string = "Login"
  @Input() userDetails: User|null=null
  @Output() submitEmitter = new EventEmitter();
  form: FormGroup;

  
  email?:string;
 
  city?:string;
  
  about?:string;

  private lastErrorShown: string | null = null;

@Input()
set error(value: string | null) {
  if (value && value !== this.lastErrorShown) {
    this.snackBar.open(`♖ ${value} ♖`, '', {
      duration: 3000,
      panelClass: ['custom-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    this.lastErrorShown = value;
  }
}

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar) {

    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
      email:['',Validators.required],
      city:['',Validators.required],
      about:['',Validators.required],
    })

  }


  ngOnInit(): void {
    
  }
  ngOnChanges(): void {
    this.checkAction();
    try{
      this.email=this.userDetails!.email;
      this.city=this.userDetails!.city;
      this.about=this.userDetails!.about;
    }catch{
    }
    
  }

  checkAction() {
    if(this.userDetails) {
      this.patchDataValues()
    }
  }

  patchDataValues () {
     if(this.userDetails)
     this.form.patchValue(this.userDetails);
  }

  emitAction() {
    if(this.title==="Login"){
      if (this.form.get('username')?.invalid || this.form.get('password')?.invalid) {
        this.snackBar.open(`⸸ Please fill out all required fields ⸸`, '', {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.form.markAllAsTouched();
        return;
      }
          this.submitEmitter.emit({username:this.form.value.username,
            password:this.form.value.password,});
    }else  if(this.title==="Join"){
      if (this.form.invalid) {
        this.snackBar.open(`⸸ Please fill out all required fields ⸸`, '', {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.form.markAllAsTouched();
        return;
      }
         this.submitEmitter.emit(this.form.value); 
    }else  if(this.title==="Update") this.submitEmitter.emit({
      email:this.form.value.email,
      city:this.form.value.city,
      about:this.form.value.about,
    });
  }

  clear() {
     this.form.reset();
  }

}
