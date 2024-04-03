export const cx = (...classNames) => classNames.filter(Boolean).join(' ');

export function firstLetterUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}