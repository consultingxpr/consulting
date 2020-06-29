import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {Router, ActivatedRoute } from '@angular/router';

import * as decode from 'jwt-decode';
import { NotificationService } from './../../../services/notification/notification.service';
import { environment } from '../../../../environments/environment'
import * as io from 'socket.io-client'
import {Howl, Howler} from 'howler';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { UserService } from 'app/services/user/user.service';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'bar_chart', class: '' },
    { path: '/formulaire', title: 'formulaire',  icon: 'bar_chart', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon: 'group', class: '' },
    { path: '/table-list', title: 'Table List',  icon: 'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon: 'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon: 'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon: 'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon: 'notifications', class: '' },
    { path: '/groupes', title: 'Groupes',  icon: 'groupes', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('indicatorRotate', [
      state('RPcollapsed', style({transform: 'rotate(0deg)'})),
      state('Paramexpanded', style({transform: 'rotate(90deg)'})),
      state('Paramcollapsed', style({transform: 'rotate(0deg)'})),
      state('RPexpanded', style({transform: 'rotate(90deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class SidebarComponent implements OnInit {
  RPexpanded: boolean = false;
  Paramexpanded:boolean=false;
  isAdmin:boolean=false;
  sound = new Howl({
    src: ['../../../../assets/audio/light.mp3']
  });
  notifications: any[];
  unseen_notifications = 0;
  userId: string ;
  menuItems: any[];
  permissions: any[];
  image: string ;
  awsUrl = environment.awsUrl;
  baseUrl = environment.baseUrl;
  constructor(public authservice: AuthService,

              private router : Router,
              private changeDetectorRef: ChangeDetectorRef,
              private userService:UserService,
              private notificationService:NotificationService) {

                
                if(this.authservice.getUserType())
                {
                  this.isAdmin=true;
                }else{
                  this.isAdmin=false;
                }
    this.userId = authservice.getIdfromToken() ;
    
    userService.getOneUser(this.userId).subscribe(res => {
      this.image = res.image;
    }, err => {
      console.log(err);
    });

  }

  ngOnInit() {

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.loadnotification(true);
    
        if (this.isMobileMenu()) {
          const socket = io.connect(this.baseUrl);
          socket.on(this.userId, function (message) {
            this.loadnotification(false);
          }.bind(this));
        }
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;

  };

  loadnotification(oninit: boolean){
    this.notificationService.getNotification(this.userId)
    .subscribe(res => {
      console.log(res);
      this.notifications = res ;
      this.unseen_notifications = this.count_unseen_notifications(res);
      if(oninit === false){
        this.showNotification(res[0]);
        this.sound.play();
        }
    }, err => {
      console.log(err);
    });
    this.changeDetectorRef.detectChanges();
  }

  timeAgo(date) {
    const NOW = new Date()
    const times = [['seconde', 1],
                   ['minute', 60],
                   ['heure', 3600],
                   ['jour', 86400],
                   ['semaine', 604800],
                   ['moi', 2592000],
                   ['an', 31536000]];
    let diff = Math.round(((new Date(NOW)).valueOf() - (new Date(date)).valueOf()) / 1000);
    for (let t = 0; t < times.length; t++) {
        if (diff < times[t][1]) {
            if (t === 0) {
                return 'à l\'instant'
            } else {
                diff = Math.round(diff / +(times[t - 1][1]));
                return'Il y a ' + diff + ' ' + times[t - 1][0] + (diff === 1 && t !== 6 ? '' : 's')
            }
        }
    }
    diff = Math.round(diff / +(times[6][1]));
    return'Il y a ' + diff + ' an' + (diff === 1 ? '' : 's')

  }

count_unseen_notifications(notifications): number {
  let count = 0;
  for(let i = 0; i < notifications.length; ++i){
      for (let k in notifications[i].read_by) {
          if ((Object as any).values(notifications[i].read_by[k]).indexOf(this.userId) >= 0) {
              count++;
          }
      }
  }
  return notifications.length - count;
}

notification_seen() {
  if (this.unseen_notifications > 0) {
  this.notificationService.seennotification(this.userId)
  .subscribe(res => {
      console.log(res);
      this.unseen_notifications = 0;
  }, err => {
      console.log(err);
  });
  }
}
onLogoutClick() {
  this.authservice.logout();
}


  showNotification(notification) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    $.notify({
        icon: 'notifications',
        message: notification.title + ' - ' + notification.message + '</br>' + this.timeAgo(notification.createdAt)

    }, {
        type: 'info',
        timer: 4000,
        placement: {
            from: 'bottom',
            align: 'left'
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}
}
