function extractText(str: string) {
    const matches = str.match(/"(.*?)"/);
    return matches ? matches[1] : str;
}

export default extractText;
