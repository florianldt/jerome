type KeyValues = {
    key: string;
    value: string;
}[];

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

export type { KeyValues, PapagoMessage, PapagoOkResponse, PapagoResult };
