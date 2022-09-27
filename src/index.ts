#!/usr/bin/env node

import { Command, CommanderError, Option } from 'commander';
import ora from 'ora';
import { resolve } from 'path';

import {
    extractConfig,
    papagoLocals,
    parseFile,
    renderErrorLogs,
    renderFooterLogs,
    renderHeaderLogs,
    testInput,
    testOutput,
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

const outputOption = new Option(
    '-o, --output <path>',
    'the directory to output the translated file',
);

program.addOption(inputOption);
program.addOption(sourceOption);
program.addOption(targetOption);
program.addOption(outputOption);

program.addHelpText(
    'after',
    `
Example calls:
  $ jerome --input ~/Localizable.strings --source ko --target en
  $ jerome -i ~/Localizable.strings -s ko -t en
  $ jerome -i ~/Localizable.strings -s ko -t en -o ~/Desktop/Localizable-en.strings
  $ jerome --help
  $ jerome --version
`,
);

program.exitOverride();

try {
    program.parse();
} catch (e) {
    if (
        e instanceof CommanderError &&
        e.code === 'commander.missingMandatoryOptionValue'
    ) {
        // eslint-disable-next-line no-console
        console.log();
        program.outputHelp();
    }

    process.exit(1);
}

const { input, output, source, target } = program.opts<CLIArgs>();

async function main() {
    const testInputSpinner = ora();
    const translationSpinner = ora();
    const writeSpinner = ora();

    const resolvedInput = resolve(input);

    try {
        const { config, configPath } = extractConfig();

        renderHeaderLogs(
            version,
            configPath,
            resolvedInput,
            output,
            source,
            target,
        );

        testOutput(output);

        testInputSpinner.start(`Testing input file: ${resolvedInput}`);
        testInput(input);
        testInputSpinner.succeed(`Valid input file: ${resolvedInput}`);

        const keyValues = await parseFile(resolvedInput);

        translationSpinner.start(
            `Translating ${papagoLocals[source]}  to ${papagoLocals[target]}`,
        );
        const translations = await translate(config, keyValues, source, target);
        translationSpinner.succeed(
            `Translated ${papagoLocals[source]}  to ${papagoLocals[target]}`,
        );

        writeSpinner.start(`Writing translations`);
        const filePath = writeFile(
            target,
            keyValues,
            translations,
            resolvedInput,
            output,
        );
        writeSpinner.succeed(`Translations available at ${filePath}`);

        renderFooterLogs();
        process.exit(0);
    } catch (e) {
        if (e instanceof ConfigFileNotFoundError) {
            renderHeaderLogs(
                version,
                null,
                resolvedInput,
                undefined,
                source,
                target,
            );
        } else if (e instanceof ConfigPropertyNotFoundError) {
            renderHeaderLogs(
                version,
                e.configPath,
                resolvedInput,
                undefined,
                source,
                target,
            );
        } else if (
            e instanceof FileNotExistError ||
            e instanceof FileInvalidExtensionError
        ) {
            testInputSpinner.fail(`Invalid input file: ${resolvedInput}`);
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
