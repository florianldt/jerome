import { writeFileSync } from 'fs';

import getFilePath from './getFilePath';

import { KeyValues } from '../types';

function writeFile(
    local: string,
    keyValues: KeyValues,
    translations: string,
    path: string,
    output: string | undefined,
): string {
    const header = `/* 
  Localizable-${local}.strings

  Auto-translated by Jerome on ${new Date().toUTCString()}.
*/

`;

    let content = header;
    const translationsArray = translations.split('\n\n');

    for (let i = 0; i < keyValues.length; i += 1) {
        const { key } = keyValues[i];
        const value = translationsArray[i];
        content += `"${key}" = "${value}";\n`;
    }

    const filePath = getFilePath(local, path, output);

    writeFileSync(filePath, content);

    return filePath;
}

export default writeFile;
