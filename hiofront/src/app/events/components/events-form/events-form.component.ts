import { Component, EventEmitter, Input, OnChanges, OnInit, Output, inject , ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Event } from '../../../app/models/event.interface';
import { CookieService } from 'ngx-cookie-service';

import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ImageService } from '../../../core/services/image.service';

@Component({
  selector: 'app-events-form',
  standalone: false,
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.css'],
  encapsulation: ViewEncapsulation.None
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

  constructor(private fb: FormBuilder,private snackBar: MatSnackBar,private imageService: ImageService) {
    this.form = this.fb.group({
      id: [],
      creatorId: [parseInt(this.cookieService.get('id'))],
      city: ['',Validators.required],
      eventName: ['',Validators.required],
      eventDate: [null,Validators.required],
      description: ['',Validators.required],
      usersAmount: [1],
      restrictions: [false],
      restrictionsLimit: [0],
      eventImg: [null] // Добавлено поле для изображения
    });
  }

  ngOnInit(): void {
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
      const eventDate = this.selectedEvent.eventDate ?
       new Date(this.selectedEvent.eventDate) :
       null;
      this.form.patchValue({...this.selectedEvent, eventDate: eventDate});
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
  
    const prepareAndEmit = (eventImg: string | null) => {
      const eventPayload = {
        creatorId: parseInt(this.cookieService.get('id')),
        city: this.form.value.city,
        eventName: this.form.value.eventName,
        eventDate: this.form.value.eventDate,
        description: this.form.value.description,
        usersAmount: this.form.value.usersAmount,
        restrictions: this.restrict,
        restrictionsLimit: this.restrict ? this.form.value.restrictionsLimit : 0,
        eventImg // теперь сюда добавляем URL от Imgur
      };
  
      this.action.emit({
        payload: {
          event: eventPayload,
          eventImg: this.selectedFile
        }
      });
    };
  
    if (this.selectedFile) {
      this.imageService.uploadImage(this.selectedFile).subscribe({
        next: (link) => {
          console.log('[Imgur] Uploaded to:', link);
          prepareAndEmit(link);
        },
        error: (err) => {
          console.error('[Imgur Upload Error]', err);
          console.error('Status:', err.status);
          console.error('Error body:', err.error);
          this.snackBar.open(`Image upload failed 🥀 (status: ${err.status})`, '', {
            duration: 4000,
            panelClass: ['custom-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top'
                  });
                }
              });
            } else {
              prepareAndEmit(null); // без картинки
            }
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
