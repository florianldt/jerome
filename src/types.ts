import papagoLocals from './lib/papagoLocals';

type CLIArgs = {
    input: string;
    source: PapagoLocalKeys;
    target: PapagoLocalKeys;
};

type KeyValues = {
    key: string;
    value: string;
}[];

type PapagoLocalKeys = keyof typeof papagoLocals;

type PapagoMessage = {
    result: PapagoResult;
    '@type': string;
    '@service': string;
    '@version': string;
};

type PapagoResult = {
    srcLangType: string;
    tarLangType: string;
    translatedText: string;
    engineType: string;
};

type PapagoOkResponse = {
    message: PapagoMessage;
};

export type {
    CLIArgs,
    KeyValues,
    PapagoLocalKeys,
    PapagoMessage,
    PapagoOkResponse,
    PapagoResult,
};
