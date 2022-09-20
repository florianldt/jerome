import chalk from 'chalk';
import { Command, Option } from 'commander';
import { join } from 'path';

import { papagoLocals, parseFile, translate, writeFile } from './lib';
import version from './version';

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
    .choices(papagoLocals)
    .makeOptionMandatory();

const targetOption = new Option(
    '-t, --target <local>',
    'the local to translate to',
)
    .choices(papagoLocals)
    .makeOptionMandatory();

program.addOption(inputOption);
program.addOption(sourceOption);
program.addOption(targetOption);

program.parse();

const { input, source, target } = program.opts();

/* eslint-disable no-console */
async function run() {
    try {
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

        const keyValues = await parseFile(input);

        const translations = await translate(keyValues, source, target);
        const filePath = writeFile(target, keyValues, translations, input);

        console.log(
            chalk.green(
                `Successfully translated from '${source}' to '${target}' at ${join(
                    __dirname,
                    filePath,
                )}`,
            ),
        );
    } catch (e) {
        console.log(chalk.bold.red(e));
    }
}

run();
