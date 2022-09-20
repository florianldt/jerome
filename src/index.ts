import { AxiosError } from 'axios';
import chalk from 'chalk';
import { Command, Option } from 'commander';
import ora from 'ora';

import {
    papagoLocals,
    parseFile,
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

/* eslint-disable no-console */
async function run() {
    console.log('       _                               ');
    console.log('      | |                              ');
    console.log('      | | ___ _ __ ___  _ __ ___   ___ ');
    console.log("  _   | |/ _ \\ '__/ _ \\| '_ ` _ \\ / _ \\");
    console.log(' | |__| |  __/ | | (_) | | | | | |  __/');
    console.log(`  \\____/ \\___|_|  \\___/|_| |_| |_|\\___| v${version}`);

    console.log();
    console.log(`${chalk.bold('Input:')} ${input}`);
    console.log(`${chalk.bold('Source:')} ${source}`);
    console.log(`${chalk.bold('Target:')} ${target}`);
    console.log();

    const testInputSpinner = ora(`Testing input file: ${input}`);
    const translationSpinner = ora(
        `Translating ${papagoLocals[source]}  to ${papagoLocals[target]}`,
    );
    const writeSpinner = ora(`Writing translation`);

    try {
        testInputSpinner.start();
        testInput(input);
        testInputSpinner.succeed(`Valid input file: ${input}`);

        const keyValues = await parseFile(input);

        translationSpinner.start();
        const translations = await translate(keyValues, source, target);
        translationSpinner.succeed(
            `Translated ${papagoLocals[source]}  to ${papagoLocals[target]}`,
        );

        writeSpinner.start();
        const filePath = writeFile(target, keyValues, translations, input);
        writeSpinner.succeed(`Translation available at ${filePath}`);
    } catch (e) {
        if (
            e instanceof FileNotExistError ||
            e instanceof FileInvalidExtensionError
        ) {
            testInputSpinner.fail(`Invalid input file: ${input}`);
        }

        if (e instanceof AxiosError) {
            translationSpinner.fail(
                `Failed to translate ${papagoLocals[source]}  to ${papagoLocals[target]}`,
            );
        }

        console.log();
        console.log(chalk.bold.red(e instanceof Error ? e.message : e));
        process.exit(1);
    }
}

run();
