#!/usr/bin/env node

import { Command, Option } from 'commander';
import ora from 'ora';

import {
    extractConfig,
    papagoLocals,
    parseFile,
    renderErrorLogs,
    renderFooterLogs,
    renderHeaderLogs,
    testInput,
    translate,
    writeFile,
} from './lib';
import {
    ConfigFileNotFoundError,
    ConfigPropertyNotFoundError,
    FileInvalidExtensionError,
    FileNotExistError,
    PapagoError,
} from './lib/errors';
import version from './version';

import { CLIArgs } from './types';

const program = new Command();

program
    .name('jerome')
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
    const testInputSpinner = ora();
    const translationSpinner = ora();
    const writeSpinner = ora();

    try {
        const { config, configPath } = extractConfig();

        renderHeaderLogs(version, configPath, input, source, target);

        testInputSpinner.start(`Testing input file: ${input}`);
        testInput(input);
        testInputSpinner.succeed(`Valid input file: ${input}`);

        const keyValues = await parseFile(input);

        translationSpinner.start(
            `Translating ${papagoLocals[source]}  to ${papagoLocals[target]}`,
        );
        const translations = await translate(config, keyValues, source, target);
        translationSpinner.succeed(
            `Translated ${papagoLocals[source]}  to ${papagoLocals[target]}`,
        );

        writeSpinner.start(`Writing translations`);
        const filePath = writeFile(target, keyValues, translations, input);
        writeSpinner.succeed(`Translations available at ${filePath}`);

        renderFooterLogs();
        process.exit(0);
    } catch (e) {
        if (e instanceof ConfigFileNotFoundError) {
            renderHeaderLogs(version, null, input, source, target);
        } else if (e instanceof ConfigPropertyNotFoundError) {
            renderHeaderLogs(version, e.configPath, input, source, target);
        } else if (
            e instanceof FileNotExistError ||
            e instanceof FileInvalidExtensionError
        ) {
            testInputSpinner.fail(`Invalid input file: ${input}`);
        } else if (e instanceof PapagoError) {
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
