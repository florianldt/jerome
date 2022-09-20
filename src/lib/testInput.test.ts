import { join } from 'path';

import { FileInvalidExtensionError, FileNotExistError } from './errors';
import testInput from './testInput';

describe('testInput', () => {
    test('should throw File does not exist error', () => {
        expect(() =>
            testInput(
                join(__dirname, '../../examples/Localizable-wrong.strings'),
            ),
        ).toThrowError(FileNotExistError);
    });

    test('should throw File does not have a valid extention name error', () => {
        expect(() =>
            testInput(join(__dirname, '../../examples/Localizable.badExt')),
        ).toThrowError(FileInvalidExtensionError);
    });
});
