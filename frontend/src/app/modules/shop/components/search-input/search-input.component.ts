import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnChanges {
  searchValue: string;

  @Input() isOpened: boolean;

  @ViewChild('input') input: ElementRef;

  @Output() closeSearchBar = new EventEmitter();

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isOpened.currentValue === true) {
      this.input.nativeElement.focus();
    }
  }

  search() {
    if (!this.searchValue.trim()) {
      return;
    }

    this.router.navigate(['', 'catalog', 'search', this.searchValue.trim()]);
    this.searchValue = null;
    this.closeSearchBar.emit(true);
  }
}
