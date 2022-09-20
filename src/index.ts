import { AxiosError } from 'axios';
import { Command, Option } from 'commander';
import ora from 'ora';

import {
    papagoLocals,
    parseFile,
    renderErrorLogs,
    renderFooterLogs,
    renderHeaderLogs,
    testInput,
    translate,
    writeFile,
} from './lib';
import { FileInvalidExtensionError, FileNotExistError } from './lib/errors';
import version from './version';

import { CLIArgs } from './types';

const program = new Command();

program
    .name('Jerome')
    .description('Auto localization for iOS.')
    .version(version, '-v, --version');

const inputOption = new Option(
    '-i, --input <path>',
    'the base .strings file to translate',
).makeOptionMandatory();

const sourceOption = new Option(
    '-s, --source <local>',
    'the local of the base .strings file',
)
    .choices(Object.keys(papagoLocals))
    .makeOptionMandatory();

const targetOption = new Option(
    '-t, --target <local>',
    'the local to translate to',
)
    .choices(Object.keys(papagoLocals))
    .makeOptionMandatory();

program.addOption(inputOption);
program.addOption(sourceOption);
program.addOption(targetOption);

program.parse();

const { input, source, target } = program.opts<CLIArgs>();

async function main() {
    renderHeaderLogs(version, input, source, target);

    const testInputSpinner = ora();
    const translationSpinner = ora();
    const writeSpinner = ora();

    try {
        testInputSpinner.start(`Testing input file: ${input}`);
        testInput(input);
        testInputSpinner.succeed(`Valid input file: ${input}`);

        const keyValues = await parseFile(input);

        translationSpinner.start(
            `Translating ${papagoLocals[source]}  to ${papagoLocals[target]}`,
        );
        const translations = await translate(keyValues, source, target);
        translationSpinner.succeed(
            `Translated ${papagoLocals[source]}  to ${papagoLocals[target]}`,
        );

        writeSpinner.start(`Writing translations`);
        const filePath = writeFile(target, keyValues, translations, input);
        writeSpinner.succeed(`Translations available at ${filePath}`);

        renderFooterLogs();
        process.exit(0);
    } catch (e) {
        if (
            e instanceof FileNotExistError ||
            e instanceof FileInvalidExtensionError
        ) {
            testInputSpinner.fail(`Invalid input file: ${input}`);
        } else if (e instanceof AxiosError) {
            translationSpinner.fail(
                `Failed to translate ${papagoLocals[source]}  to ${papagoLocals[target]}`,
            );
        }

        renderErrorLogs(e);
        renderFooterLogs();
        process.exit(1);
    }
}

main();
