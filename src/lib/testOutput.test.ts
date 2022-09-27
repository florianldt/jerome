import { join } from 'path';

import { InvalidDirectoryError } from './errors';
import testOutput from './testOutput';

describe('testOutput', () => {
    test('should throw Invalid directory error', () => {
        expect(() =>
            testOutput(join(__dirname, '../../invalidDirectory')),
        ).toThrowError(InvalidDirectoryError);
    });

    test('should be a valid output', () => {
        expect(() =>
            testOutput(join(__dirname, '../../examples')),
        ).not.toThrowError();
    });
});
