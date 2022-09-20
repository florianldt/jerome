import { existsSync, rmSync } from 'fs';
import { join } from 'path';

import writeFile from './writeFile';

import { KeyValues } from '../types';

describe('writeFile', () => {
    const filePath = '../../examples/Localizable-en.strings';

    function cleanTestFile(): void {
        rmSync(join(__dirname, filePath), { force: true });
    }

    beforeEach(() => {
        cleanTestFile();
    });

    afterAll(() => {
        cleanTestFile();
    });

    test('', () => {
        const keyValues: KeyValues = [
            { key: '8bccc18f', value: '홈' },
            { key: 'f0cc8352', value: '나의 당근' },
            { key: '3f402de0', value: '당근 어플이 살림에 도움이 되시나요?' },
            { key: '0fc01060', value: '아니요' },
            { key: '6788d684', value: '그럼요!' },
        ];
        const translations =
            'Home\n\nMy Carrot\n\nDoes the Carrot App help you keep alive?\n\nNo.\n\nOf course!';
        const path = join(__dirname, '../../examples/Localizable.strings');

        writeFile('en', keyValues, translations, path);

        expect(existsSync(join(__dirname, filePath))).toEqual(true);
    });
});
