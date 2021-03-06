import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  styles: [
    require('./app-header.scss')
  ],
  template: `
    <header class="header">
      <div class="g-row">
        <div class="g-col">
          <h1 class="header__title">
          <!--{{ 'flow learn' | translate }}-->
          Flow Learn
          </h1>
    
          <ul class="header__links">
          <li *ngIf="authenticated">
          <!--{{ 'hello' | translate }}-->
          hello,
          , {{displayName}}</li>
            <li *ngIf="authenticated"><a class="header__link" (click)="signOut.emit()" href="#">
            <!--{{ 'sign out' | translate }}-->
            Sign Out
            </a></li>          </ul>
        </div>
      </div>
    </header>
  `
})

export class AppHeaderComponent {
  @Input() authenticated: boolean;
  @Input() displayName: string;
  @Output() signOut = new EventEmitter(false);
}
