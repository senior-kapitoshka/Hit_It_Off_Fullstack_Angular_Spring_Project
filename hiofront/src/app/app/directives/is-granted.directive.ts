import { Directive, inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { RbacService } from '../../core/services/rbac.service';
import { User } from '../models/user.interface';

@Directive({
  selector: '[isGranted]',
  standalone:false,
})
export class IsGrantedDirective implements OnInit {
  private rbacService = inject(RbacService);
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  private user!: User;
  private roleOrPermission!: string;

  @Input()
  set isGranted(roleOrPermission: string) {
    
    this.roleOrPermission = roleOrPermission;
  }

  ngOnInit() {
    if (this.rbacService.isGranted(this.roleOrPermission)) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}