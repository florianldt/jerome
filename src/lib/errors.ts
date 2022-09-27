/* eslint-disable max-classes-per-file -- Error subclasses only */
class ConfigFileNotFoundError extends Error {
    constructor() {
        super('Config file not found.');
    }
}

class ConfigPropertyNotFoundError extends Error {
    public configPath: string;

    constructor(property: string, configPath: string) {
        super(`Property \`${property}\` not found in the config file.`);
        this.configPath = configPath;
    }
}

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

class InvalidDirectoryError extends Error {
    constructor(path: string) {
        super(`Invalid directory ${path}`);
    }
}

class NothingToTranslateError extends Error {
    constructor() {
        super('Nothing to translate.');
    }
}

class PapagoError extends Error {
    constructor(message: string) {
        super(`PapagoError: ${message}`);
    }
}

export {
    ConfigFileNotFoundError,
    ConfigPropertyNotFoundError,
    FileInvalidExtensionError,
    FileNotExistError,
    InvalidDirectoryError,
    NothingToTranslateError,
    PapagoError,
};
