import { postLogin, postLoginGuest, register, registerGuest, activate } from '#app/controllers/auth.js';

export default (app) => {
    app.route('/auth/login').post(postLogin);
    app.route('/auth/login/guest').post(postLoginGuest);
    app.route('/auth/register').post(register);
    app.route('/auth/register/guest').post(registerGuest);
    app.route('/auth/activate/:link').get(activate);
};