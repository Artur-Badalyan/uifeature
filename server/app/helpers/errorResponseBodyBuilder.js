import { format } from 'util';
import CONSTANTS from '#app/constants/Constants.js';

export function couldNotGet(modelName, value = '') {
    return errorBuilder(CONSTANTS.ErrorMessages.COULD_NOT_GET, modelName, value);
}

export function couldNotAdd(modelName, value = '') {
    return errorBuilder(CONSTANTS.ErrorMessages.COULD_NOT_ADD, modelName, value);
}

export function couldNotUpdate(modelName, value = '') {
    return errorBuilder(CONSTANTS.ErrorMessages.COULD_NOT_UPDATE, modelName, value);
}

export function couldNotDelete(modelName, value = '') {
    return errorBuilder(CONSTANTS.ErrorMessages.COULD_NOT_DELETE, modelName, value);
}

export function alreadyExists(modelName, value = '') {
    return errorBuilder(CONSTANTS.ErrorMessages.ALREADY_EXISTS, value, modelName);
}

export function doesNotExist(modelName, value = '') {
    return errorBuilder(CONSTANTS.ErrorMessages.DOES_NOT_EXSTS, modelName, value);
}

export function addErrorMsg(msg) {
    return errorBuilder(msg, '', '');
}

export function internalServerError(modelName, value = '') {
    return errorBuilder('', modelName, value);
}

const errorBuilder = (errorTypeMsg, modelName, value = '') => {
    return {
        success: false,
        message: `${format(errorTypeMsg, modelName, value)}`
    };
};