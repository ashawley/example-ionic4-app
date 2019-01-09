import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { LessonComponent } from '../lesson/lesson.component';
import { FilterButtonsComponent } from '../filter-buttons/filter-buttons.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      },
      {
        path: '',
        component: LessonComponent
      }
    ])
  ],
  entryComponents: [LessonComponent,FilterButtonsComponent],
  declarations: [HomePage, LessonComponent,FilterButtonsComponent]
})
export class HomePageModule {}
