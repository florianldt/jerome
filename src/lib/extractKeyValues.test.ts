import { join } from 'path';

import extractKeyValues from './extractKeyValues';

import { KeyValues } from '../types';

describe('extractKeyValues', () => {
    test('should return empty array as the file is empty', async () => {
        await expect(
            extractKeyValues(
                join(__dirname, '../../examples/Localizable-empty.strings'),
            ),
        ).resolves.toEqual([]);
    });

    test('should return a 5 items array', async () => {
        const result: KeyValues = [
            { key: '8bccc18f', value: '홈' },
            { key: 'f0cc8352', value: '나의 당근' },
            { key: '3f402de0', value: '당근 어플이 살림에 도움이 되시나요?' },
            { key: '0fc01060', value: '아니요' },
            { key: '6788d684', value: '그럼요!' },
        ];
        await expect(
            extractKeyValues(
                join(__dirname, '../../examples/Localizable.strings'),
            ),
        ).resolves.toEqual(result);
    });
});
