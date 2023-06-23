import { ConnectOptions } from 'mongoose';

export type Config = {
    uri: string;
    options: ConnectOptions;
};
