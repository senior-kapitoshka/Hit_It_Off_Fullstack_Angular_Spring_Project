import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comments-form',
  standalone:false,
  templateUrl: './comments-form.component.html',
  styleUrl: './comments-form.component.css'
})
export class CommentsFormComponent implements OnInit {
  @Input() submitLabel!: string;
  @Input() hasCancelButton: boolean = false;
  @Input() initialText: string = '';

  @Output()
  handleSubmit = new EventEmitter<string>();

  @Output()
  handleCancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.initialText],
    });
  }

  onSubmit(): void {
    this.handleSubmit.emit(this.form.value.title);
    this.form.reset();
  }
}
