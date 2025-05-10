import { Component, EventEmitter, Input, OnChanges, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Event } from '../../../app/models/event.interface';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-events-form',
  standalone: false,
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.css']
})
export class EventsFormComponent implements OnInit, OnChanges {
  @Input() selectedEvent: Event | null = null;
  @Output() action = new EventEmitter();
  form: FormGroup;
  creatorId!: number;
  cookieService = inject(CookieService);
  restrict: boolean = false; // Для управления ограничениями
  readonly date = new FormControl(new Date()); // Для даты, используем FormControl
  selectedFile: File | null = null; // Переменная для хранения выбранного файла

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [],
      creatorId: [parseInt(this.cookieService.get('id'))],
      city: [''],
      eventName: [''],
      eventDate: [''],
      description: [''],
      usersAmount: [1],
      restrictions: [false],
      restrictionsLimit: [0],
      eventImg: [null] // Добавлено поле для изображения
    });
  }

  ngOnInit(): void {
    console.log(this.selectedEvent)
  }

  ngOnChanges(): void {
    this.checkAction();
  }

  checkAction() {
    if (this.selectedEvent) {
      this.patchDataValues();
    }
  }

  patchDataValues() {
    if (this.selectedEvent) {
      this.form.patchValue(this.selectedEvent);
    }
  }

  // Обработчик для выбора файла
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Selected file:', file);
    }
  }

  emitAction() {
    const eventPayload = {
      creatorId: parseInt(this.cookieService.get('id')),
      city: this.form.value.city,
      eventName: this.form.value.eventName,
      eventDate: this.date.value,
      description: this.form.value.description,
      usersAmount: this.form.value.usersAmount,
      restrictions: this.restrict,
      restrictionsLimit: this.restrict ? this.form.value.restrictionsLimit : 0,
      eventImg: null
    };
  
    this.action.emit({
      payload: {
        event: eventPayload,
        eventImg: this.selectedFile || null
      }
    });
  }
  
  

  clear() {
    // Очищаем форму и устанавливаем значения по умолчанию
    this.form.reset({
      city: '',
      eventName: '',
      description: '',
      usersAmount: 1,
      restrictions: false,
      restrictionsLimit: 0,
      eventImg: null
    });
  }
}
