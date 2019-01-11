import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
  private currentFilterCount;

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
 

  private notifications = [
    "You have 1 lesson(s) remaining",
    "You have 2 lesson(s) remaining",
    "You have 3 lesson(s) remaining",
    "You have 4 lesson(s) remaining",
    "You have a lesson to retake",
    "You have 2 lesson(s) to retake",
    "You have 3 lesson(s) to retake",
    "You have 1 overdue lesson(s)",
    "You have 2 overdue lesson(s)"
  ];

  private notificationPermission: string;

  constructor(
    public alertController: AlertController
    ) {
      this.currentFilterCount = this.all();
    }

  requestPermission() {
    if (!('Notification' in window)) {
      alert('Notification API not supported!');
      return;
    }
    
    Notification.requestPermission((request) => {
      this.notificationPermission = request;
      console.log('Notification requested: ' + request);
    });
  }

  nonPersistentNotification(msg: string) {
    if (!('Notification' in window)) {
      alert('Notification API not supported!');
      return;
    }
  
    try {
      var notification = new Notification(msg);
      console.log('Notification: ' + msg);
    } catch (err) {
      alert('Notification API error: ' + err);
    }
  }

  persistentNotification(msg: string) {
    if (!('Notification' in window) || !('ServiceWorkerRegistration' in window)) {
      alert('Persistent Notification API not supported!');
      return;
    }
    
    try {
      navigator.serviceWorker.getRegistration()
        .then(reg => reg.showNotification(msg))
        .catch(err => alert('Service Worker registration error: ' + err));
      console.log('Notification: ' + msg);
    } catch (err) {
      alert('Notification API error: ' + err);
    }
  }

  filterChanged(ev: any) {
    if (ev.detail.value == 'overdue') {
      this.filterOverdue();
      this.currentFilterCount = this.overdueCount();
    }
    else if (ev.detail.value == 'retake') {
      this.filterRetake();
      this.currentFilterCount = this.retakeCount();
    }
    else if (ev.detail.value == 'all') {
      this.showAll();
      this.currentFilterCount = this.all();
    }
    else if (ev.detail.value == 'moreFilters') {
      this.currentFilterCount = '';
      
      const rand = Math.floor(Math.random() * this.notifications.length);
      this.nonPersistentNotification(this.notifications[rand]);
      
    }
  }

  getCurrentFilterCount() { return this.currentFilterCount; }
  
  filterOverdue() {
    this.displayItems = this.overdueItems();
  }

  filterRetake() {
    this.displayItems = this.retakeItems();
  }

  showAll() {
    this.displayItems = [...this.items];
  }

  getStatusImage(overdue: boolean, retake: boolean) {
    if (overdue) {
      return "assets/img/staroverdue.svg";
    }
    else if (retake) {
      return "assets/img/gray-star.png";
    }
    else {
      return "assets/img/yellow-star.png";
    }
  }

  ngOnInit() {
    this.notificationRequest();
    alert
    const delay = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.notificationRequest().then(
          controller => controller.present()
        ).catch (
          err => console.log(err)
        );
      }, 8000);
    });
    this.displayItems = [...this.items];
  }

  private notificationRequest() {
    return this.alertController.create({
      header: 'Notifications',
      message: 'Enable notifications?',
      buttons: [
        {
          text: 'No, thanks',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Notifications cancelled');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.requestPermission();
          }
        }
      ]
    });
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
      unit.items.filter( lesson => !!lesson.overdue ).length
    ).reduce((a, b) => a + b);
    return count;
  }

  overdueItems() {
    return this.items.filter(
      unit => unit.items.some ( lesson => !!lesson.overdue  ) 
    ).map (unit => {
      let temp = { ...unit };
      temp["items"] = unit.items.filter(lesson => !!lesson.overdue);
      return temp;
    });
  }

  retakeCount() {
    let count = this.items.map((unit) => 
      unit.items.filter( lesson => !!lesson.retake ).length
    ).reduce((a, b) => a + b);
    return count;
  }

  retakeItems() {
    return this.items.filter(
      unit => unit.items.some ( lesson => !!lesson.retake  ) 
    ).map (unit => {
      let temp = { ...unit };
      temp["items"] = unit.items.filter( lesson => !!lesson.retake );
      return temp;
    });
  }
}
