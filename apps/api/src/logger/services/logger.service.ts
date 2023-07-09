/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Injectable,
    LoggerService as BaseLoggerService,
    Scope
} from '@nestjs/common';

@Injectable({
    scope: Scope.TRANSIENT,
})
export class LoggerService implements BaseLoggerService {
    /**
     * The prefix for the current logger instance.
     *
     * @var {string}
     */
    protected prefix?: string;

    /**
     * Valid and allowable levels for logging messages.
     *
     * @var {string[]}
     */
    protected levels: string[] = [
        'log',
        'info',
        'warn',
        'error'
    ];

    /**
     * Write a 'log' level log.
     *
     * @param {string} message
     * @param {any[]} optionalParams
     *
     * @return {void}
     */
    public log (message: string, ...optionalParams: any[]): void {
        this.performLog(message, 'log');
    }

    /**
     * Write an 'error' level log.
     *
     * @param {string} message
     * @param {any[]} optionalParams
     *
     * @return {void}
     */
    public error (message: string, ...optionalParams: any[]): void {
        this.performLog(message, 'error');
    }

    /**
     * Write a 'warn' level log.
     *
     * @param {string} message
     * @param {any[]} optionalParams
     *
     * @return {void}
     */
    public warn (message: string, ...optionalParams: any[]): void {
        this.performLog(message, 'warn');
    }

    /**
     * Write a 'debug' level log.
     *
     * @param {string} message
     * @param {any[]} optionalParams
     *
     * @return {void}
     */
    public debug?(message: string, ...optionalParams: any[]): void {
        this.performLog(message, 'debug');
    }

    /**
     * Write a 'verbose' level log.
     *
     * @param {string} message
     * @param {any[]} optionalParams
     *
     * @return {void}
     */
    public verbose?(message: string, ...optionalParams: any[]): void {
        //
    }

    /**
     * Perform the actual looging.
     *
     * @param   {string}  message
     * @param   {string}  level
     *
     * @return  {void}
     */
    protected performLog (message: string, level: string): void {
        if (!this.levels.includes(level)) {
            throw new Error(`Invalid log level [${level}] set.`);
        }

        let formattedMessage = message;

        if (this.prefix) {
            formattedMessage = `[${this.prefix}] ${message}`;
        }

        console[level](formattedMessage);
    }

    /**
     * Set the prefix for the current logger instance.
     *
     * @param   {string}  prefix
     *
     * @return  {void}
     */
    public setPrefix (prefix: string): void {
        this.prefix = prefix;
    }
}
