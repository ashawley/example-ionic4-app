import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-buttons',
  templateUrl: './filter-buttons.component.html',
  styleUrls: ['./filter-buttons.component.scss']
})
export class FilterButtonsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  filterChanged(ev: any) {
    console.log('Filter changed', ev);
  }
}
