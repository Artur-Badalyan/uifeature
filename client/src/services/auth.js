import { post, get, put } from 'services/client';
import { apiEndpoints } from 'config';

// const isLoggedIn = () => localStorage.getItem(lsConstants.CURRENT_USER) ? JSON.parse(localStorage.getItem(lsConstants.CURRENT_USER)) : false;

const logOut = () => {
    console.log('logout')
}

export default {
  login: async () => {
    const options = { url: apiEndpoints.defaultCategories };
    return get(options);
  },
//   forgotPassword: (email) => {
//     const options = {
//       url: apiEndpoints.resetPassword,
//       data : {
//         email
//       }
//     };
//     return post(options);
//   },
//   checkResetToken: (token) => {
//     const options = { url: apiEndpoints.checkResetToken.replace(':token', token) };
//     return get(options);
//   },
//   resetPassword: async (data) => {
//     const options = { url: apiEndpoints.resetPassword, data};
//     return put(options);
//   },
//   changePassword: async (data) => {
//     const options = { url: apiEndpoints.changePassword, data};
//     return put(options);
//   },
}
