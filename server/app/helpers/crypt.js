import { hash as _hash, compare as _compare } from 'bcrypt';
const saltRounds = 10;

/**
 * Generate a hashed string
 * @param {*} password
 */
export function hash(string) {
    return _hash(string, saltRounds)
        .then(function(hash) {
            return hash;
        });
}

/**
 * Compare a plain text password to a hashed password
 * @param {*} string
 * @param {*} hash
 */
export function compare(string, hash) {
    return _compare(string, hash);
}