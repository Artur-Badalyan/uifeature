import { getUsers, getUser, updateFirebaseToken } from '#app/controllers/users.js';
import { verifyLoginToken } from '#app/helpers/validateToken.js';

export default (app) => {
    app.route('/users').get(getUsers);
    app.route('/users/:id').get(getUser);
    app.route('/users/:id/firebase/token').put(updateFirebaseToken);
};