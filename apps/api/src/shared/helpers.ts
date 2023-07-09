import { resolve } from 'path';
import { HigherOrderTapProxy } from './HigherOrderTapProxy';

/**
 * Call the given Closure with the given value then return the value.
 *
 * @param   {any}  value
 * @param   {function|undefined}  callback
 *
 * @return  {any}
 */
export function tap (
    value: any,
    callback?: (_value: any) => any
): any {
    if (callback === undefined) {
        return new HigherOrderTapProxy(value);
    }

    const result = callback(value);

    if (result !== undefined) {
        return result;
    }

    return value;
}

/**
 * Generate a random string containing the given amount of characters.
 *
 * @param {number} length
 *
 * @return {string}
 */
export function makeId (length = 7): string {
    let result = '';

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    let counter = 0;

    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }

    return result;
}

/**
 * Determine if given string is a valid email address.
 *
 * @param   {string}   email
 *
 * @return  {boolean}
 */
export function isEmail (email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Dynamically import a class from the given path and instantiate it.
 *
 * @param   {string}  cls
 * @param   {any[]}  args
 *
 * @return  {Promise<any>}
 */
export async function makeInstance (cls: string, args: any[]): Promise<any> {
    cls = await import(resolve(`src/${cls}`));

    const stdClass: any = Object.values(cls)[0];

    return new stdClass(...args);
}
