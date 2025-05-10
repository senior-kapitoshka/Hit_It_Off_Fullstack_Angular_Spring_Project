import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../app/models/user.interface';
import { TableActions } from '../../../app/models/page-actions.enum';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-users-list',
  standalone:false,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit, AfterViewInit {
  @Input() headers: Array<{header: string, fieldName: keyof User}> = [];

  /*
  
  @ViewChild()[для одного элемента] 
  и
  @ViewChildren()[для массива элементов] 
  — это декораторы Angular, 
  которые позволяют получить доступ к DOM-элементам, директивам 
  или компонентам, находящимся внутри шаблона текущего компонента (в его view).

  */
  @ViewChild(MatSort) sort!: MatSort;// для сортировки таблицы

  @Input() set users(value: ReadonlyArray<User>) {//сеттер
    this._users = value;
    this.dataSource.data = [...value]; // обновляем dataSource при изменении входного массива
  }
  get users(): ReadonlyArray<User> {//геттер
    return this._users;
  }
  private _users: ReadonlyArray<User> = [];

  @Output() event = new EventEmitter<{user: User, action: TableActions}>();
  
  dataSource = new MatTableDataSource<User>();

  eventNamesFields: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getHeaderFields();
  }

  /*вызывается один раз после того, 
  как Angular полностью инициализировал представление 
  компонента (view), включая все дочерние компоненты и директивы,
   объявленные в шаблоне. */
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getHeaderFields() {
    this.eventNamesFields = this.headers.map((data) => data.fieldName);
    this.eventNamesFields.push('actions');
  }

  selectUser(user: User, action: TableActions) {
    this.event.emit({ user, action });
  }
}
