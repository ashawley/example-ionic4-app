import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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
