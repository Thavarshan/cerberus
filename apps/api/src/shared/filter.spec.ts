import { Filter } from './filter';

describe('Filter', () => {
    it('should filter object elements according to given array of keys', async () => {
        const result = Filter.getQueryFilters(
            { email: 'john@example.com' },
            ['email']
        );

        expect(result).toEqual({
            email: 'john@example.com'
        });
    });
});
