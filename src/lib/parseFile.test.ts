import { join } from 'path';

import parseFile from './parseFile';

import { KeyValues } from '../types';

describe('parseFile', () => {
    test('should throw File does not exist error', async () => {
        await expect(
            parseFile(
                join(__dirname, '../../examples/Localizable-wrong.strings'),
            ),
        ).rejects.toThrowError('File does not exist.');
    });

    test('should throw File does not have a valid extention name error', async () => {
        await expect(
            parseFile(join(__dirname, '../../examples/Localizable.badExt')),
        ).rejects.toThrowError('File does not have a valid extension name.');
    });

    test('should throw Nothing to translate error', async () => {
        await expect(
            parseFile(
                join(__dirname, '../../examples/Localizable-empty.strings'),
            ),
        ).rejects.toThrowError('Nothing to translate.');
    });

    test('should return a 5 items array', async () => {
        const result: KeyValues = [
            { key: '8bccc18f', value: '홈' },
            { key: 'f0cc8352', value: '나의 당근' },
            { key: '3f402de0', value: '당근 어플이 살림에 도움이 되시나요?' },
            { key: '0fc01060', value: '아니요' },
            { key: '6788d684', value: '그럼요!' },
        ];
        expect(
            await parseFile(
                join(__dirname, '../../examples/Localizable.strings'),
            ),
        ).toEqual(result);
    });
});
