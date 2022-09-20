import chalk from 'chalk';

import { PapagoLocalKeys } from '../types';

/* eslint-disable no-console */
function renderHeaderLogs(
    version: string,
    configPath: string | null,
    input: string,
    source: PapagoLocalKeys,
    target: PapagoLocalKeys,
): void {
    console.log('       _                               ');
    console.log('      | |                              ');
    console.log('      | | ___ _ __ ___  _ __ ___   ___ ');
    console.log("  _   | |/ _ \\ '__/ _ \\| '_ ` _ \\ / _ \\");
    console.log(' | |__| |  __/ | | (_) | | | | | |  __/');
    console.log(`  \\____/ \\___|_|  \\___/|_| |_| |_|\\___| v${version}`);

    console.log();
    console.log(`${chalk.bold('Config:')} ${configPath ?? ''}`);
    console.log(`${chalk.bold('Input:')} ${input}`);
    console.log(`${chalk.bold('Source:')} ${source}`);
    console.log(`${chalk.bold('Target:')} ${target}`);
    console.log();
}

function renderFooterLogs(): void {
    console.log();
}

function renderErrorLogs(e: unknown): void {
    console.log();
    console.log(chalk.bold.red(e instanceof Error ? e.message : e));
}

export { renderErrorLogs, renderFooterLogs, renderHeaderLogs };
