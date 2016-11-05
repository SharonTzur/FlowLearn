import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {UserService} from "./services/user-service";



const routes: Routes = [
];

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule
         ],
    providers: [
        UserService
    ]
})

export class UserModule {
}

export {UserService};
