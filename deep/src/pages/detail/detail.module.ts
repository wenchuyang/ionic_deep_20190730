import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPage } from './detail';
import {DirectivesModule} from "../../directives/directives.module";

@NgModule({
  declarations: [
    DetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailPage),
    DirectivesModule,
  ],
})
export class DetailPageModule {}
