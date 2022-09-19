import extractText from './extractText';

describe('extractText', () => {
    test('should extract the text surrounded by double quotes', () => {
        expect(extractText('"Hello"')).toEqual('Hello');
    });

    test('should return the initial string as no double quotes are present', () => {
        expect(extractText('Hello')).toEqual('Hello');
        expect(extractText('|Hello|')).toEqual('|Hello|');
    });
});
