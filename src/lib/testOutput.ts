import { existsSync } from 'fs';

import { InvalidDirectoryError } from './errors';

function testOutput(path: string | undefined): void {
    if (!path) {
        return;
    }

    if (!existsSync(path)) {
        throw new InvalidDirectoryError(path);
    }
}

export default testOutput;
