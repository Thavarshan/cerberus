import { tap } from './helpers';

describe('Helpers', () => {
    it('should return modified value', async () => {
        const value = 'abc';
        const result = tap(value, (value) => {
            return `${value}.efg`;
        });

        expect(result).toBe('abc.efg');
    });

    it('should return original value', async () => {
        const value = 'abc';
        const result = tap(value);

        expect(result.target).toBe(value);
    });
});
