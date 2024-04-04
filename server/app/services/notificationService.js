import admin, { credential as _credential } from 'firebase-admin';
import settings from 'settings';
const { firebase: { key } } = settings;
import { users as Users } from 'models';
const serviceAccount = require(key);

class NotificationService {

    constructor() {
        this.adminApp = admin;
        this.adminApp.initializeApp({
            credential: _credential.cert(serviceAccount),
        });
    }

    async sendFCMNotification(title, body, registrationTokens, userId) {
        return new Promise(async (resolve, reject) => {
            console.log("\n\n...sendFCMNotification")
            const message = {
                notification: {
                    title: title,
                    body: body
                },
                tokens: registrationTokens,
            };
            try {
                const res = await this.adminApp.messaging().send({
                    webpush: {
                        notification: {
                            ...message.notification,
                            requireInteraction: message.requireInteraction ?? false,
                            actions: [{ title: 'Open', action: 'open' }],
                            data: { link: message.link },
                        },
                    },
                    token: registrationTokens,
                });
                resolve(res);
            } catch(err) {
                if (userId) {
                    await Users.update({ firebaseToken: null }, { where: { id: userId } });
                }
                console.log("\n\n\n Could not sent push notification. Error\n ", err, "\n\n")
            }
        });
    }
}

export default new NotificationService();