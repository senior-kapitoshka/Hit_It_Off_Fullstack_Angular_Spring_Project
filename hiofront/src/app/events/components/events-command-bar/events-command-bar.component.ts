import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export enum CommandBarActions {
  Create
}


@Component({
  selector: 'app-events-command-bar',
  standalone:false,
  templateUrl: './events-command-bar.component.html',
  styleUrl: './events-command-bar.component.css'
})
export class EventsCommandBarComponent implements OnInit {
  @Output() action = new EventEmitter<CommandBarActions>()
  constructor() { }

  ngOnInit(): void {
  }

  emitAction(action: CommandBarActions) {
    this.action.emit(action);
  }
}
