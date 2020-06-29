import { NotificationService } from './../../../services/notification/notification.service';
import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Howl, Howler } from 'howler';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import * as io from 'socket.io-client'
import { environment } from '../../../../environments/environment'
import { UserService } from 'app/services/user/user.service';
declare var $: any;

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    sound = new Howl({
        src: ['../../../../assets/audio/light.mp3']
    });
    notifications: any[];
    unseen_notifications: number;
    baseUrl = environment.baseUrl;
    awsUrl = environment.awsUrl;
    private listTitles: any[];
    public image: string;
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    public userId: string;
    isAdmin: boolean = false;
    constructor(
        location: Location,
        private element: ElementRef,
        private router: Router,
        private authservice: AuthService,
        private changeDetectorRef: ChangeDetectorRef,
        private userService: UserService,
        private notificationService: NotificationService
    ) {
        this.location = location;
        this.sidebarVisible = false;
        this.userId = authservice.getIdfromToken();
        this.userService.getOneUser(this.userId).subscribe(res => {
            this.image = res.image;
        }, err => {
            console.log(err);
        });
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            const $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
        this.loadnotification(true);
        if (this.isNotMobileMenu()) {
            const socket = io.connect(this.baseUrl);
            socket.on(this.userId, function (message) {
                this.loadnotification(false);
            }.bind(this));
        }
    }

    isNotMobileMenu() {
        if ($(window).width() > 991) {
            return true;
        }
        return false;
    };

    loadnotification(oninit: boolean) {
        this.notificationService.getNotification(this.userId)
            .subscribe(res => {
                console.log(res);
                this.notifications = res;
                this.unseen_notifications = this.count_unseen_notifications(res);
                if (oninit === false) {
                    this.showNotification(res[0]);
                    this.sound.play();
                }
            }, err => {
                console.log(err);
            });
        this.changeDetectorRef.detectChanges();
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };

    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        var display;
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(2);
        }
        titlee = titlee.split('/').pop();

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        switch (titlee) {
            case 'user-profile': {
                display = 'Votre profil';
                break;
            }
        }
        return display;
    }

    onLogoutClick() {
        this.authservice.logout();
    }

    count_unseen_notifications(notifications): number {
        let count = 0;
        for (let i = 0; i < notifications.length; ++i) {
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
                    return 'Il y a ' + diff + ' ' + times[t - 1][0] + (diff === 1 && t !== 6 ? '' : 's')
                }
            }
        }
        diff = Math.round(diff / +(times[6][1]));
        return 'Il y a ' + diff + ' an' + (diff === 1 ? '' : 's')

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

    notifRedirect(notif) {
        console.log(notif);
        if (notif.link.params)
            this.router.navigate([notif.link.url], { queryParams: { [notif.link.params]: notif.link.paramsValue } });
        else
            this.router.navigate([notif.link.url]);
    }

}
