import { parse } from 'path';

function getFilePath(
    local: string,
    basePath: string,
    output: string | undefined,
): string {
    const { dir, ext, name } = parse(basePath);
    return `${output || dir}/${name}-${local}${ext}`;
}

export default getFilePath;
