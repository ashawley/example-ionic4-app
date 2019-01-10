import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterButtonsComponent } from '../filter-buttons/filter-buttons.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  private subscription: Subscription;
  private fid: Subscription;

  constructor(
    private filterButtons: FilterButtonsComponent) {

    }

  ngOnInit() {
    this.subscription = this.filterButtons.changed.subscribe((ev) =>
      console.log("filter change home page")
      //console.log('Filter change received by home page '+ev)
    );

    this.fid = this.filterButtons.hmm.subscribe(() => 
      console.log("hmmm filt change homepage")
    );
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  items: Array<any> = [
    {
      title: "Unit 10",
      subtitle: "Substraction strategies",
      items: [
        {
          title: "Lesson 10.1",
          subtitle: "One Less, Ten Less",
          date: "2019-05-28"
        },
        {
          title: "Lesson 3.2",
          subtitle: "Counting back form 10",
          date: "2019-05-28"
        }
      ]
    }
  ]

}
