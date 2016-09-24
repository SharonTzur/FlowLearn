import {Component} from "@angular/core";
import {AuthService} from "../../auth/services/auth-service";
import {TranslateService} from "../../translate/translate.service";
import {TranslatePipe} from "../../translate/translate.pipe";

@Component({
    selector: 'app',
    styles: [
        require('./app.scss')
    ],
    template: `
    <app-header
      [authenticated]="auth.authenticated" [displayName]="auth.displayName"
      (signOut)="signOut()"></app-header>
      
      
      
    
    <main class="main"  [ngClass]="currentLang">
      <router-outlet></router-outlet>
    </main>
  `
})

export class AppComponent {
    displayName: string;
    public currentLang: string;
    public translatedText: string;
    public supportedLangs: any[];

    constructor(private auth: AuthService, private _translate: TranslateService) {
    }

    ngOnInit() {
        // standing data
        this.supportedLangs = [
            {display: 'English', value: 'en'},
            {display: 'עברית', value: 'he'},
        ];

        this.selectLang('he');

        this.currentLang = this._translate.currentLang;
    }

    isCurrentLang(lang: string) {
        return lang === this._translate.currentLang;
    }

    selectLang(lang: string) {
        // set default;
        this._translate.use(lang);
        this.refreshText();
    }

    refreshText() {
        this.translatedText = this._translate.instant('hello world');
    }

    signOut(): void {
        this.auth.signOut();
    }
}
