// Angular Imports
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

// This Module's Components
import { ProductComponent } from './product.component';

@NgModule({
    imports: [
      IonicPageModule.forChild(ProductComponent)
    ],
    declarations: [
        ProductComponent,
    ],
    exports: [
        ProductComponent,
    ]
})
export class ProductModule {

}
