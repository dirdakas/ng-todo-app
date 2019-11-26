import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Subscription } from 'rxjs';
import {
  tap,
  filter,
  map
} from 'rxjs/operators';

import { IUserData } from './../../models/user-data.model';
import { UserService } from './../../services/user/user.service';
import { IMenu } from './../../models/menu.model';
import { FULL_MENU } from './../../constants/full-menu.constant';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.sass']
})
export class MainNavComponent implements OnInit, OnDestroy {
  currentUser: IUserData = null;
  isHandset: boolean = false;
  topLevelActiveRouter: string = '';

  filteredMenu: IMenu[] = FULL_MENU;

  private handsetSub: Subscription;
  private routerEventsSub: Subscription;
  private userSub: Subscription;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
  ) { }

  // @TODO: maybe use some ( xxx | async) pipe?
  ngOnInit(): void {
    this.setRouterEventsWatcher();
    this.setIsHandsetWatcher();
    this.setUserWatcher();
  }

  onNavigateTo(routerLink: string): void {
    this.router.navigateByUrl(routerLink);
  }

  onLogout(): void {
    this.userService.setUserData(null);
  }

  ngOnDestroy(): void {
    this.handsetSub.unsubscribe();
    this.routerEventsSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  private setIsHandsetWatcher(): void {
    this.handsetSub = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        tap((isHandset: boolean) => {
          this.isHandset = isHandset;
        })
      )
      .subscribe();
  }

  private setRouterEventsWatcher(): void {
    this.routerEventsSub = this.router
      .events
      .pipe(
        filter((routeEvent: Event) => routeEvent instanceof NavigationEnd),
        tap((routeEvent: NavigationEnd) => {
          this.topLevelActiveRouter = routeEvent.url;
        })
      )
      .subscribe();
  }

  private setUserWatcher(): void {
    this.userSub = this.userService
      .userData$
      .pipe(
        tap((userData: IUserData) => {
          this.currentUser = Object.assign({}, userData);
        })
      )
      .subscribe();
  }
}
