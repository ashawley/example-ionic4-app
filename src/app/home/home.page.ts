import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterButtonsComponent } from '../filter-buttons/filter-buttons.component';
import { until } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy, OnInit {

 

  private subscription: Subscription;
  private fid: Subscription;
 

  items: Array<any> = [
    {
      title: "Unit 10",
      subtitle: "Subtraction strategies",
      items: [
        {
          title: "Lesson 10.1",
          subtitle: "One Less, Ten Less",
          date: "2019-05-28",
          overdue: true,
          retake: false
        },
        {
          title: "Lesson 10.2",
          subtitle: "Counting back form 10",
          date: "2019-05-28",
          overdue: false,
          retake: true
        }
      ]
    },
    {
      title: "Unit 11",
      subtitle: "Semester review",
      items: [
        {
          title: "Lesson 11.3",
          subtitle: "Additions with Sums Through 100",
          date: "2019-05-28",
          overdue: false,
          retake: true
        },
        {
          title: "Lesson 11.4",
          subtitle: "Unit Review",
          date: "2019-05-28",
          overdue: false,
          retake: false
        }
      ]
    }
  ];

  displayItems: Array<any>;
 

  constructor(
    //private filterButtons: FilterButtonsComponent
    ) {}

  filterChanged(ev: any) {
    if (ev.detail.value == 'overdue') {
      this.filterOverdue();
    }
    else if (ev.detail.value == 'retake') {
      this.filterRetake();
    }
    else if (ev.detail.value == 'all') {
      this.showAll();
    }
  }
  
  filterOverdue() {
    this.displayItems = this.overdueItems();
  }

  filterRetake() {
    this.displayItems = this.retakeItems();
  }

  showAll() {
    this.displayItems = this.items;
  }


  ngOnInit() {
    this.displayItems = this.items
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  all() { 
    let count = this.items.map((unit) => 
      unit.items.length
    ).reduce((a, b) => a + b);
    return count;
  }

  overdueCount() {
    let count = this.items.map((unit) => 
      unit.items.filter(lesson => !!lesson.overdue).length
    ).reduce((a, b) => a + b);
    return count;
  }

  overdueItems() {
    return this.items.filter(
      unit => unit.items.some ( lesson => !!lesson.overdue  ) 
    ).map (unit => {
      let temp = Object.create(unit);
      temp["items"] = unit.items.filter(lesson => !!lesson.overdue);
      return temp;
    });
  }

  retakeCount() {
    let count = this.items.map((unit) => 
      unit.items.filter(lesson => !!lesson.retake).length
    ).reduce((a, b) => a + b);
    return count;
  }

  retakeItems() {
    return this.items.filter(
        unit => unit.items.some ( lesson => !!lesson.retake  ) 
    ).map (unit => {
      let temp = Object.create(unit) ;
      temp["items"] = unit.items.filter(lesson => !!lesson.retake);
      return temp;
    });
  }
}
