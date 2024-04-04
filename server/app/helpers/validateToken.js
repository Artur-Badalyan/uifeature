import jsonwebtoken from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import CONSTANTS from '#app/constants/Constants.js';
import { loginSecretKey } from '#app/settings.js';

const { verify } = jsonwebtoken;

const verifyToken = async (request, response, next, token, secret) => {
    try {
        if(!token) {
            return response.status(401).send({message: 'Unauthorized'});
        }
        const verified = await verify(token, secret);
        request.user = verified;
        const decodedToken = await jwtDecode(token, loginSecretKey);
        request.guid = decodedToken.guid;
        next();
    } catch(err) {
        response.status(401).send();
    }
};

export async function verifyLoginToken(request, response, next) {
    try {
        const token = request.header(CONSTANTS.AUTHORIZATION).split(CONSTANTS.BEARER)[1];
        verifyToken(request, response, next, token, loginSecretKey);
    } catch(err) {
        return response.status(401).send({message: 'Unauthorized'});
    }
}