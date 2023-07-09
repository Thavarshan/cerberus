import { LoggerService as BaseLoggerService } from '@nestjs/common';
export declare class LoggerService implements BaseLoggerService {
    protected prefix?: string;
    protected levels: string[];
    log(message: string, ...optionalParams: any[]): void;
    error(message: string, ...optionalParams: any[]): void;
    warn(message: string, ...optionalParams: any[]): void;
    debug?(message: string, ...optionalParams: any[]): void;
    verbose?(message: string, ...optionalParams: any[]): void;
    protected performLog(message: string, level: string): void;
    setPrefix(prefix: string): void;
}
//# sourceMappingURL=logger.service.d.ts.map