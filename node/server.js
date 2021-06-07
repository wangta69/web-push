const express = require('express')
const webpush = require('web-push')
const cors = require('cors')
const bodyParser = require('body-parser')

// const app = express()
// app.use(cors())
// app.use(bodyParser.json())


const PUBLIC_VAPID = 'BLFfErGp4NfSrqmEdSkWacLoiEQ2ihfUAkwW6GW1rQFj0OkDcnIivTJd2KNL0UtG8KdNCQCa0-r9OBYsxV7aqFs'
const PRIVATE_VAPID = '48ejva55CCiM5omPLqf30BiDEnYEs4WF1NmoWMxBvk8'

const fakeDatabase = []

const app = express()

app.use(cors())
app.use(bodyParser.json())

webpush.setVapidDetails('mailto:y.h.ryu@tipszone.co.kr', PUBLIC_VAPID, PRIVATE_VAPID)

app.post('/subscription', (req, res) => {
  const subscription = req.body;
  console.log(subscription);

//   {
//   endpoint: 'https://fcm.googleapis.com/fcm/send/c55x3zAoprA:---------------------',
//   expirationTime: null,
//   keys: {
//     p256dh: '---------------------------',
//     auth: '--------------------------------'
//   }
// }

  fakeDatabase.push(subscription)
})

// app.get('/subscription', (req, res) => {
//   const subscription = req.body
//   fakeDatabase.push(subscription)
// })
app.post('/sendNotification', (req, res) => {
  const notificationPayload = {
    notification: {
      title: 'New Notification',
      body: 'This is the body of the notification',
      icon: 'assets/icons/icon-512x512.png',
    },
  }

  const promises = []
  fakeDatabase.forEach(subscription => {
    promises.push(
      webpush.sendNotification(
        subscription,
        JSON.stringify(notificationPayload)
      )
    )
  })
  Promise.all(promises).then(() => res.sendStatus(200))
})
//
// app.get('/sendNotification', (req, res) => {
//   const notificationPayload = {
//     notification: {
//       title: 'New Notification',
//       body: 'This is the body of the notification',
//       icon: 'assets/icons/icon-512x512.png',
//     },
//   }
//
//   const promises = []
//   fakeDatabase.forEach(subscription => {
//     promises.push(
//       webpush.sendNotification(
//         subscription,
//         JSON.stringify(notificationPayload)
//       )
//     )
//   })
//   Promise.all(promises).then(() => res.sendStatus(200))
// })


app.listen(3000, () => {
  console.log('Server started on port 3000')
})
