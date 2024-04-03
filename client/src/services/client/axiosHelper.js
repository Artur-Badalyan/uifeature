import axios from 'axios';
import onUnauthorized from 'helpers/errorHandlers';
import envSettings from 'config/envSettings.json';

const defaultHeaderHandler = (request) => request;

let service;
if (envSettings.env === 'production') {
    service = axios.create({
        baseURL: `${document.location.origin}/api/`,
        timeout: 60000,
    });
} else {
    service = axios.create({
        baseURL: `http://localhost:3000/api/`,
        timeout: 60000,
    });
}


const apiClient = (method, options) =>
  service.request({
    ...options,
    method,
  });

const setupInterceptors = (reactRouterHistory) => {
  service.interceptors.response.use(
    (response) => response,
    (error) => {
      const errMessage = error.message;
      const userIsNotAuthorized = errMessage === 'Request failed with status code 401';
      if (userIsNotAuthorized) {
        onUnauthorized(error, reactRouterHistory);
        return Promise.reject(error);
      }
      if (error.response &&
          error.response.data &&
          error.response.data.error &&
          (error.response.data.error.message === 'User is not authenticated.' || error.response.data.error.message === 'No auth token' || error.response.data.error.passwordExpired)) {
        onUnauthorized(error, reactRouterHistory);
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );
  service.interceptors.request.use(defaultHeaderHandler);
};

export { apiClient, setupInterceptors };