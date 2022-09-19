import { Command, Option } from 'commander';

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

async function run() {
    try {
        const keyValues = await parseFile(input);
        const translations = await translate(keyValues, source, target);
        writeFile(target, keyValues, translations, input);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
    }
}

run();
