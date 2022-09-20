import { NothingToTranslateError } from './errors';
import extractKeyValues from './extractKeyValues';

import { KeyValues } from '../types';

async function parseFile(path: string): Promise<KeyValues> {
    const keyValues = await extractKeyValues(path);

    if (!keyValues.length) {
        throw new NothingToTranslateError();
    }

    return keyValues;
}

export default parseFile;
