import { existsSync } from 'fs';

import extractKeyValues from './extractKeyValues';
import hasValidExtension from './hasValidExtension';

import { KeyValues } from '../types';

async function parseFile(path: string): Promise<KeyValues> {
    if (!existsSync(path)) {
        throw new Error('File does not exist.');
    }

    if (!hasValidExtension(path)) {
        throw new Error('File does not have a valid extension name.');
    }

    const keyValues = await extractKeyValues(path);

    if (!keyValues.length) {
        throw Error('Nothing to translate.');
    }

    return keyValues;
}

export default parseFile;
