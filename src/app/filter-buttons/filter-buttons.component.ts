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
  currentFilterLabel: String;

  constructor(
    private homePage: HomePage
  ) { 
    this.changed = new Subject();
    this.hmm = new Subject();
    this.setCurrentFilterLabel("all");
    
  }

  setCurrentFilterLabel(label: string) {
    // capitalize
    this.currentFilterLabel = label.charAt(0).toUpperCase() + label.substr(1);
  }

  currentFilter() { return this.currentFilterLabel; }

  currentFilterCount() { return this.homePage.getCurrentFilterCount(); }

  all() { return this.homePage.all(); }

  overdue() { return this.homePage.overdueCount(); }

  retake() { return this.homePage.retakeCount(); }

  ngOnInit() {
  }

  filterChanged(ev: any) {
    console.log('Filter changed', ev);
    this.changed.next(ev);
    this.changed.next();
    this.hmm.next();
    this.setCurrentFilterLabel(ev.detail.value);
    this.homePage.filterChanged(ev);
    console.log("subject chagned was called");
  }
}
