var webPush = require('web-push');

const vapidKeys = {
    "publicKey":"BH791EdxMJVEroPY7hGfVlBN-UWQcmBakrqqum8nu-F1nT9FgTaGs_4iv2pUD56KUdUayJ-HR5wVN4pPPdwVf6I",
    "privateKey":"aQSO-ip3kXhMFLaLBIuXx_lYyr7ipxoByZPAvWbuPxg"
};

webPush.setVapidDetails(
    'mailto:ziyanassegaf20@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var PushSubscription = {
    "endpoint":"https://fcm.googleapis.com/fcm/send/eiTUAOtlnHA:APA91bHUnYFPgyCFhVKVDNPU6S3U76UuLN-VubSmzrGBoFygoXC2y7544TVgTKqA8EbYQW5qhs4U60P9oSDrYXwvaV_3_xDesHxi5Rf76OALIBZ2U2XMVU_rbdEhoy-gR-7aCp18q1hH",
    "keys": {
        "p256dh":" BEI2lDeAh4DxCCKm8jzTyp2Wflh0UKySbZobnbkUQ4LSjTdgfzk39PA2WfAXrkHc4S6y9MlpqwgBEevgw8DD87I=",
        "auth":"Db+lzTGMFlbYYLYsX5devw=="
    }
};

var payload = "Selamat! aplikasi sudah bisa menerima push notifikasi";
var options = {
    gcmAPIKey: '286784193057',
    TTL: 60
};
webPush.sendNotification(
    PushSubscription,
    payload,
    options
);