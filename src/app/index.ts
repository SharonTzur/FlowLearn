import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AuthModule} from '../auth';
import {FirebaseModule} from '../firebase';
import {TasksModule} from '../tasks';

import {AppComponent} from './components/app';
import {AppHeaderComponent} from './components/app-header';
import {TRANSLATION_PROVIDERS} from "../translate/translations";
import {TranslateService} from "../translate/translate.service";
import {TranslatePipe} from "../translate/translate.pipe";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent,
        AppHeaderComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([], {useHash: false}),
        AuthModule,
        FirebaseModule,
        TasksModule
    ],
    providers: [
        TRANSLATION_PROVIDERS, TranslateService
    ]
})

export class AppModule {
}
