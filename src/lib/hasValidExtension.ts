import { extname } from 'path';

function hasValidExtension(path: string): boolean {
    return extname(path) === '.strings';
}

export default hasValidExtension;
