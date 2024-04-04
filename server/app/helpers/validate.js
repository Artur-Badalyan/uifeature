import AJV from 'ajv';
import ajvFormats from 'ajv-formats';
import ajvKeywords from 'ajv-keywords';

/**
 * Validator ext methods
 */
export function isSchemeValidSync(scheme, data) {
    const ajv = new AJV({ coerceTypes: true, useDefaults: true });
    ajvFormats(ajv);
    ajvKeywords(ajv);
    const validate = ajv.compile(scheme);
    validate.isValid = validate(data);
    validate.data = data;
    return validate;
}