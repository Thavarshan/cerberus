/**
 * Call the given Closure with the given value then return the value.
 *
 * @param   {any}       value
 * @param   {Function}  callback
 *
 * @return  {any}
 */
export function tap (
    value: any,
    callback: (value: any) => void | undefined
): any {
    if (callback === undefined) {
        return value;
    }

    callback(value);

    return value;
}
