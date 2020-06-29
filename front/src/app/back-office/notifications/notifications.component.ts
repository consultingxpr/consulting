import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NotificationService } from './../../services/notification/notification.service';
import { environment } from '../../../environments/environment'
import { AuthService } from 'app/services/auth/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  baseUrl = environment.baseUrl;
  awsUrl = environment.awsUrl;
  userId: string ;
  notifications: any[];
  constructor( private changeDetectorRef: ChangeDetectorRef, private notificationService: NotificationService,
    private authService:AuthService ) {
    this.userId = authService.getIdfromToken() ;
  }

  ngOnInit() {
    this.loadnotification()
  }

  loadnotification() {
    this.notificationService.getNotification(this.userId)
    .subscribe(res => {
      console.log(res);
      this.notifications = res ;
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

}



 /*
  showNotification(from, align){
      const type = ['','info','success','warning','danger'];

      const color = Math.floor((Math.random() * 4) + 1);

      $.notify({
          icon: "notifications",
          message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

      },{
          type: type[color],
          timer: 4000,
          placement: {
              from: from,
              align: align
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
   */