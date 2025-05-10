import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder,  FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../app/models/user.interface';
import { HomeService} from '../../../../app/core/services/home.service';

@Component({
  selector: 'app-auth-form',
  standalone:false,
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent implements OnInit,OnChanges{
  @Input() error: string = "";
  @Input() title: string = "Login"
  @Input() userDetails: User|null=null
  @Output() submitEmitter = new EventEmitter();
  form: FormGroup;

  
  email?:string;
 
  city?:string;
  
  about?:string;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      username: [''],
      password: [''],
      email:[''],
      city:[''],
      about:[''],
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
    if(this.title==="Login")
          this.submitEmitter.emit({username:this.form.value.username,
            password:this.form.value.password,});
    else  if(this.title==="Join")    this.submitEmitter.emit(this.form.value); 
    else  if(this.title==="Update") this.submitEmitter.emit({
      email:this.form.value.email,
      city:this.form.value.city,
      about:this.form.value.about,
    });
  }

  clear() {
     this.form.reset();
  }

}
