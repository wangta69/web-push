import { Component, AfterViewInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './pushNotification.service';

const VAPID_PUBLIC = 'BLFfErGp4NfSrqmEdSkWacLoiEQ2ihfUAkwW6GW1rQFj0OkDcnIivTJd2KNL0UtG8KdNCQCa0-r9OBYsxV7aqFs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    title = 'angular-push-notifications';
    constructor(swPush: SwPush, pushService: PushNotificationService) {
        console.log('swPush', swPush, swPush.isEnabled);
        if (swPush.isEnabled) {
          swPush
            .requestSubscription({
              serverPublicKey: VAPID_PUBLIC,
            })
            .then(subscription => {
                console.log(subscription); // {endpoint, xpirationTime, options}
              // send subscription to the server
                pushService.sendSubscriptionToTheServer(subscription).subscribe();
            })
            .catch(console.error);
        }
    }

    public ngAfterViewInit(): void {
      // if (this.swUpdate.isEnabled) {
      //   this.swUpdate.available
      //     .subscribe(() => {
      //       this.swUpdate
      //         .activateUpdate()
      //         .then(() => {
      //           window.location.reload();
      //         });
      //     });
      // }
    }
}
