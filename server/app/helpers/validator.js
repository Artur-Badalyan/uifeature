import { ResponseError } from './ResponseError';

const validate = (schema, data) => {
    const {error, value} = schema.validate(data);
    if(error) {
        throw new ResponseError(error.message, 400);
    }
    return value;
};

export default {validate};