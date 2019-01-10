import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterButtonsComponent } from '../filter-buttons/filter-buttons.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy, OnInit {

 

  private subscription: Subscription;
  private fid: Subscription;

  constructor(
    //private filterButtons: FilterButtonsComponent
    ) {}

    filterChanged(ev: any): any {
      console.log("filter changed home page "+ev+" event type "+ev.detail.value)
    }
  


  ngOnInit() {
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

  overdue() {
    let count = this.items.map((unit) => 
      unit.items.filter(lesson => !!lesson.overdue).length
                        ).reduce((a, b) => a + b);
    //console.log(" count overdue "+count)
    return count;
  }

  retake() {
    let count = this.items.map((unit) => 
      unit.items.filter(lesson => !!lesson.retake).length
                        ).reduce((a, b) => a + b);
    //console.log(" retake count "+count)
    return count;
  }

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
          title: "Lesson 3.2",
          subtitle: "Counting back form 10",
          date: "2019-05-28",
          overdue: false,
          retake: true
        }
      ]
    }
  ]

}
