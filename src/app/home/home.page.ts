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
      subtitle: "Substraction strategies",
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
      console.log("filter changed home page "+ev+" event type "+ev.detail.value)
    this.filterOverdue();
  }
  
  filterOverdue() {
    this.displayItems = this.overdueItems();
    console.log(" overdue "+ this.overdueItems());
  }


  ngOnInit() {
    this.displayItems = this.items;
    console.log(" init items "+this.displayItems)
    // console.log("what the hell" + this.filterButtons.changed);
    // this.subscription = this.filterButtons.changed.subscribe((ev) =>
    //   console.log("filter change home page")
    //   //console.log('Filter change received by home page '+ev)
    // );

    // this.fid = this.filterButtons.hmm.subscribe(() => 
    //   console.log("hmmm filt change homepage")
    // );
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  all() { 
    let count = 
      this.items.map((unit) => 
                      unit.items.length
                       ).reduce((a, b) => a + b);
    return count;
  }

  overdue_count() {
    let count = this.items.map((unit) => 
      unit.items.filter(lesson => !!lesson.overdue).length
                        ).reduce((a, b) => a + b);
    //console.log(" count overdue "+count)
    return count;
  }

  overdueItems() {

    return this.items.filter(
      unit => unit.items.some ( lesson => !!lesson.overdue  ) 
      ).map (unit => {
        unit["items"] = unit.items.filter(lesson => !!lesson.overdue);
        return unit;
      });
  }

  retake() {
    let count = this.items.map((unit) => 
      unit.items.filter(lesson => !!lesson.retake).length
                        ).reduce((a, b) => a + b);
    //console.log(" retake count "+count)
    return count;
  }

  

}
