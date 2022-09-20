import { existsSync } from 'fs';

import { FileInvalidExtensionError, FileNotExistError } from './errors';
import hasValidExtension from './hasValidExtension';

function testInput(path: string): void {
    if (!existsSync(path)) {
        throw new FileNotExistError();
    }

    if (!hasValidExtension(path)) {
        throw new FileInvalidExtensionError();
    }
}

export default testInput;
