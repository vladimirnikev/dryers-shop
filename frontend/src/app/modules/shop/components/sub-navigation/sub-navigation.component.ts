import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sub-navigation',
  templateUrl: './sub-navigation.component.html',
  styleUrls: ['./sub-navigation.component.scss'],
})
export class SubNavigationComponent {
  @Input() isNav = false;

  @Input() isOpened: boolean;

  @Output() closeSubMenuEvent = new EventEmitter();

  closeSubMenu() {
    this.closeSubMenuEvent.emit(true);
  }
}
