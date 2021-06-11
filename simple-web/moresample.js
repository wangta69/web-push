if ('serviceWorker' in navigator)
{
  //브라우저에 Service Worker를 등록
  // navigator.serviceWorker.register('/pwa-examples/js13kpwa/sw.js');
  navigator.serviceWorker.register('service-worker.js', { })
 //  navigator.serviceWorker.register('service-worker.js', { scope: '/'})
    .then(function(registration) {
       console.log('[ServiceWorker] Success: ', registration.scope);
       console.log(registration);
    }).catch(function(err) {
       console.log('[ServiceWorker] Fail: ', err);
    });
}

navigator.serviceWorker.register('service-worker.js')
.then(function(registration) {
  return registration.pushManager.getSubscription()
  .then(async function(subscription) {
      console.log('registration > subscription', subscription)
      // registration part
  });
})
.then(function(subscription) {
    console.log('subscription 2', subscription);
    // subscription part
});

//
// function testNotify() {
//     console.log(navigator.serviceWorker.controller);
//     // navigator.serviceWorker.controller.postMessage({'hello': 'world'});
//     var notification = new Notification('hello | world');
// //     navigator.serviceWorker.controller.notifyMe();
// }


function notifyMe() {
    console.log('Notification.permission', Notification.permission);
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
        alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
    // Let's check whether notification permissions have already been granted
    // If it's okay let's create a notification
        // var notification = new Notification('Hi there!');
        console.log("adfadfadsf");
        randomNotification();
    } else if (Notification.permission !== 'denied') {
        // Otherwise, we need to ask the user for permission
        console.log('333333333333333333');
        Notification.requestPermission().then(function (permission) {
            console.log('permission', permission);
            // If the user accepts, let's create a notification
            // if (permission === 'granted') {
            //     randomNotification();
            // // var notification = new Notification('Hi there!');
            // }
        });
    }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}

function randomNotification() {
    console.log('randomNotification start');
    // var randomItem = Math.floor(Math.random()*games.length);
    var notifTitle = 'Welcome Title';
    var notifBody = 'Created by pondol';
    var notifImg = '/img/top_logo2.png';
    var options = {
        body: notifBody,
        icon: notifImg
    };
    var notif = new Notification(notifTitle, options);
    // setTimeout(randomNotification, 30000);
}

// notifyMe();
