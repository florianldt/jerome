import { cosmiconfigSync } from 'cosmiconfig';

import { ConfigFileNotFoundError, ConfigPropertyNotFoundError } from './errors';

import { Config } from '../types';

type Result = {
    config: Config;
    configPath: string;
};

function extractConfig(): Result {
    const config = cosmiconfigSync('jerome').search();

    if (!config) {
        throw new ConfigFileNotFoundError();
    }

    const castedConfig = config.config as Config;

    if (!castedConfig.X_NAVER_CLIENT_ID) {
        throw new ConfigPropertyNotFoundError(
            'X_NAVER_CLIENT_ID',
            config.filepath,
        );
    }

    if (!castedConfig.X_NAVER_CLIENT_SECRET) {
        throw new ConfigPropertyNotFoundError(
            'X_NAVER_CLIENT_SECRET',
            config.filepath,
        );
    }

    return { config: config.config, configPath: config.filepath };
}

export default extractConfig;
