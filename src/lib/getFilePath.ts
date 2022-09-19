import { parse } from 'path';

function getFilePath(local: string, basePath: string): string {
    const { dir, ext, name } = parse(basePath);
    return `${dir}/${name}-${local}${ext}`;
}

export default getFilePath;
