import axios from 'axios';

import { buildTextPackets, requestsBuilder, translate } from './translate';

import { Config, KeyValues } from '../types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const dummyConfig: Config = {
    X_NAVER_CLIENT_ID: '',
    X_NAVER_CLIENT_SECRET: '',
};

describe('buildTextPackets', () => {
    test('should return empty array as keyValues is empty', () => {
        expect(buildTextPackets([])).toEqual([]);
    });

    test('should return an array with one item as the number of characters is lower than 5000', () => {
        const keyValues: KeyValues = [
            { key: '8bccc18f', value: '홈' },
            { key: 'f0cc8352', value: '나의 당근' },
            { key: '3f402de0', value: '당근 어플이 살림에 도움이 되시나요?' },
            { key: '0fc01060', value: '아니요' },
            { key: '6788d684', value: '그럼요!' },
        ];
        const result = [
            `${keyValues[0].value}\n\n${keyValues[1].value}\n\n${keyValues[2].value}\n\n${keyValues[3].value}\n\n${keyValues[4].value}`,
        ];
        expect(buildTextPackets(keyValues)).toEqual(result);
    });

    test('should return an array with one item as the number of characters equals 5000', () => {
        const keyValues: KeyValues = [
            { key: '8bccc18f', value: '홈' },
            { key: 'f0cc8352', value: '홈'.repeat(4997) },
        ];
        const result = [`${keyValues[0].value}\n\n${keyValues[1].value}`];
        expect(buildTextPackets(keyValues)).toEqual(result);
    });

    test('should return an array with three items as the number of characters exceeds 5000', () => {
        const keyValues: KeyValues = [
            { key: '8bccc18f', value: '홈' },
            { key: 'f0cc8352', value: '홈'.repeat(5000) },
            { key: 'f0cc8352', value: '홈' },
        ];
        const result = [
            keyValues[0].value,
            keyValues[1].value,
            keyValues[2].value,
        ];
        expect(buildTextPackets(keyValues)).toEqual(result);
    });
});

describe('requestsBuilder', () => {
    test('should return empty array as packets is empty', () => {
        expect(requestsBuilder(dummyConfig, [], 'ko', 'en')).toEqual([]);
    });

    test('should return 3 requests', () => {
        expect(
            requestsBuilder(dummyConfig, ['홈', '홈', '홈'], 'ko', 'en').length,
        ).toEqual(3);
    });
});

describe('translate', () => {
    const data = {
        message: {
            result: {
                srcLangType: 'en',
                tarLangType: 'ko',
                translatedText:
                    'Home\n\nMy Carrot\n\nDoes the Carrot App help you keep alive?\n\nNo.\n\nOf course!',
                engineType: 'PRETRANS',
                pivot: null,
                dict: null,
                tarDict: null,
            },
            '@type': 'response',
            '@service': 'naverservice.nmt.proxy',
            '@version': '1.0.0',
        },
    };
    test('should return empty array as packets is empty', async () => {
        const keyValues: KeyValues = [
            { key: '8bccc18f', value: '홈' },
            { key: 'f0cc8352', value: '나의 당근' },
            { key: '3f402de0', value: '당근 어플이 살림에 도움이 되시나요?' },
            { key: '0fc01060', value: '아니요' },
            { key: '6788d684', value: '그럼요!' },
        ];
        mockedAxios.post.mockResolvedValue({ data });
        await expect(
            translate(dummyConfig, keyValues, 'ko', 'en'),
        ).resolves.toEqual(
            'Home\n\nMy Carrot\n\nDoes the Carrot App help you keep alive?\n\nNo.\n\nOf course!',
        );
    });
});
