/* eslint-disable max-classes-per-file -- Error subclasses only */
class FileNotExistError extends Error {
    constructor() {
        super('File does not exist.');
    }
}

class FileInvalidExtensionError extends Error {
    constructor() {
        super('File does not have a valid extension name.');
    }
}

class NothingToTranslateError extends Error {
    constructor() {
        super('Nothing to translate.');
    }
}

export {
    FileInvalidExtensionError,
    FileNotExistError,
    NothingToTranslateError,
};