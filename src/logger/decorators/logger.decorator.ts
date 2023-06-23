import { Inject } from '@nestjs/common';

export const prefixesForLoggers: string[] = new Array<string>();

export const Logger = (prefix: string) => {
    if (!prefixesForLoggers.includes(prefix)) {
        prefixesForLoggers.push(prefix);
    }

    return Inject(`LoggerService${prefix}`);
};
