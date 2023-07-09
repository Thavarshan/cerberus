import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DynamicModule } from '@nestjs/common';
export declare class OrmModule {
    static forRoot(): DynamicModule;
    protected static configureOrm(overrides?: {
        [key: string]: any;
    }): TypeOrmModuleOptions;
}
//# sourceMappingURL=orm.provider.d.ts.map