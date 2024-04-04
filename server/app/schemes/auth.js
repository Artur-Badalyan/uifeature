'use strict';

import CONSTANTS from '#app/constants/Constants.js';

export const postLogin = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' }
    },
    required: ['email', 'password']
};

export const postReset = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' }
    },
    required: ['email']
};

export const userToken = {
    type: 'object',
    properties: {
        type: {
            type: 'string',
            enum: [
                CONSTANTS.JSON_TOKEN_TYPES.USER_AUTH,
                CONSTANTS.JSON_TOKEN_TYPES.USER_REGISTER
            ]
        },
        user: {
            type: 'object',
            properties: {
                id: { type: 'integer' }
            },
            required: ['id']
        },
        iat: { type: 'integer' },
        exp: { type: 'integer' },
        iss: { type: 'string' }
    },
    required: ['type', 'user', 'iat', 'exp', 'iss']
};

export default {
    postLogin,
    postReset,
    userToken
}