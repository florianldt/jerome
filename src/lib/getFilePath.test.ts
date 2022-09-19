import { dirname, join } from 'path';

import getFilePath from './getFilePath';

describe('getFilePath', () => {
    test('should return the formatted file path', () => {
        const path = join(__dirname, '../../examples/Localizable.strings');

        expect(getFilePath('en', path)).toEqual(
            `${dirname(path)}/Localizable-en.strings`,
        );
    });
});
