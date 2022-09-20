import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import { stringify } from 'qs';

import { KeyValues, PapagoOkResponse } from '../types';

dotenv.config();

function buildTextPackets(keyValues: KeyValues): string[] {
    const max = 5000;
    const packets: string[] = [];

    let currentString = '';

    if (!keyValues.length) {
        return packets;
    }

    for (let i = 0; i < keyValues.length; i += 1) {
        const { value } = keyValues[i];
        const charCount = value.length;

        if (!currentString.length) {
            currentString = value;
        } else if (currentString.length + charCount + 2 <= max) {
            currentString += `\n\n${keyValues[i].value}`;
        } else {
            packets.push(currentString);
            currentString = keyValues[i].value;
        }
    }

    if (currentString.length) {
        packets.push(currentString);
    }

    return packets;
}

function requestsBuilder(
    packets: string[],
    baseLocal: string,
    toLocal: string,
): Promise<AxiosResponse<PapagoOkResponse>>[] {
    const baseUrl = 'https://openapi.naver.com/v1/papago/n2mt';
    const headers: AxiosRequestHeaders = {
        'X-Naver-Client-Id': process.env.X_NAVER_CLIENT_ID ?? '',
        'X-Naver-Client-Secret': process.env.X_NAVER_CLIENT_SECRET ?? '',
    };

    const requests: Promise<AxiosResponse>[] = [];

    if (!packets.length) {
        return requests;
    }

    for (let i = 0; i < packets.length; i += 1) {
        const data = {
            source: baseLocal,
            target: toLocal,
            text: packets[i],
        };
        requests.push(
            axios.post<PapagoOkResponse>(baseUrl, stringify(data), { headers }),
        );
    }

    return requests;
}

async function translate(
    keyValues: KeyValues,
    baseLocal: string,
    toLocals: string,
): Promise<string> {
    const packets = buildTextPackets(keyValues);
    const requests = requestsBuilder(packets, baseLocal, toLocals);

    return Promise.all(requests)
        .then((responses) => {
            const translations = responses
                .map(({ data }) => data.message.result.translatedText)
                .join('\n\n');
            return Promise.resolve(translations);
        })
        .catch((e) => Promise.reject(e));
}

export { buildTextPackets, requestsBuilder, translate };
