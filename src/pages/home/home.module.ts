// Angular Imports
import { NgModule, Component } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

// This Module's Components
import { HomePage } from './home';

@NgModule({
    imports: [
      IonicPageModule.forChild(HomePage)
    ],
    declarations: [
      HomePage,
    ],
    exports: [
      HomePage,
    ]
})
export class HomeModule {

}
