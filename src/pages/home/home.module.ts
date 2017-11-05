// Angular Imports
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Component } from '@angular/core';

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
