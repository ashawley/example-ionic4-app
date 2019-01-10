import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

@Component({
  selector: 'app-filter-buttons',
  templateUrl: './filter-buttons.component.html',
  styleUrls: ['./filter-buttons.component.scss']
})
export class FilterButtonsComponent implements OnInit {

  changed: Subject<any>;

  constructor() { 
    this.changed = new Subject();
  }


  ngOnInit() {
  }

  filterChanged(ev: any) {
    console.log('Filter changed', ev);
    this.changed.next(ev);
  }
}
