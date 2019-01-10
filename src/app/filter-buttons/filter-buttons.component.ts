import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-filter-buttons',
  templateUrl: './filter-buttons.component.html',
  styleUrls: ['./filter-buttons.component.scss']
})
export class FilterButtonsComponent implements OnInit {

  changed: Subject<any>;
  hmm: Subject<void>;

  constructor(
    private homePage: HomePage
  ) { 
    this.changed = new Subject();
    this.hmm = new Subject();
  }


  all() { return this.homePage.all(); }

  overdue() { return this.homePage.overdue_count(); }

  retake() { return this.homePage.retake(); }

  ngOnInit() {
  }

  filterChanged(ev: any) {
    console.log('Filter changed', ev);
    this.changed.next(ev);
    this.changed.next();
    this.hmm.next();
    this.homePage.filterChanged(ev);
    console.log("subject chagned was called");
  }
}
