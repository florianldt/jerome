import { dirname, join } from 'path';

import getFilePath from './getFilePath';

describe('getFilePath', () => {
    test('should return the formatted file path', () => {
        const path = join(__dirname, '../../examples/Localizable.strings');

        expect(getFilePath('en', path, undefined)).toEqual(
            `${dirname(path)}/Localizable-en.strings`,
        );
    });

    test('should return the formatted custom file path', () => {
        const path = join(__dirname, '../../examples/Localizable.strings');
        const customPath = join(__dirname, '../../examples/custom');

        expect(getFilePath('en', path, customPath)).toEqual(
            `${customPath}/Localizable-en.strings`,
        );
    });
});
