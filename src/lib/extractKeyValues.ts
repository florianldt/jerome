import { createReadStream } from 'fs';
import readline from 'readline';

import extractText from './extractText';

import { KeyValues } from '../types';

/* eslint-disable no-continue -- continue is ok here to move to the next iteration early */
async function extractKeyValues(path: string): Promise<KeyValues> {
    const keyValues: KeyValues = [];
    const fileStream = createReadStream(path);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    // eslint-disable-next-line no-restricted-syntax
    for await (const line of rl) {
        if (line.charAt(0) !== '"') {
            continue;
        }

        const splittedLine = line.split(' = ');

        if (splittedLine.length !== 2) {
            continue;
        }

        const [key, value] = splittedLine;
        keyValues.push({
            key: extractText(key),
            value: extractText(value),
        });
    }

    return keyValues;
}
/* eslint-enable no-continue */

export default extractKeyValues;
