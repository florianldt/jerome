import { existsSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

import writeFile from './writeFile';

import { KeyValues } from '../types';

describe('writeFile', () => {
    const autoFilePath = '../../examples/Localizable-en.strings';
    const customDirPath = '../../examples/custom';
    const customFilePath = `${customDirPath}/Localizable-en.strings`;

    function createCustomDir(): void {
        if (!existsSync(join(__dirname, customDirPath))) {
            mkdirSync(join(__dirname, customDirPath));
        }
    }

    function cleanTestFiles(): void {
        rmSync(join(__dirname, autoFilePath), { force: true });
        rmSync(join(__dirname, customDirPath), {
            force: true,
            recursive: true,
        });
    }

    beforeEach(() => {
        cleanTestFiles();
    });

    afterAll(() => {
        cleanTestFiles();
    });

    test(`should write a file 'examples/Localizable-en.strings'`, () => {
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

        writeFile('en', keyValues, translations, path, undefined);

        expect(existsSync(join(__dirname, autoFilePath))).toEqual(true);
    });

    test(`should write a file 'examples/custom/Localizable-en.strings'`, () => {
        createCustomDir();

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

        writeFile(
            'en',
            keyValues,
            translations,
            path,
            join(__dirname, customDirPath),
        );

        expect(existsSync(join(__dirname, customFilePath))).toEqual(true);
    });
});
