"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const common_1 = require("@nestjs/common");
const console_1 = require("console");
const logger_service_1 = require("./logger/services/logger.service");
const cors_config_1 = __importDefault(require("./config/cors.config"));
const config_1 = require("@nestjs/config");
const app_enum_1 = require("./app/enums/app.enum");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableShutdownHooks();
    app.useGlobalPipes(new common_1.ValidationPipe({
        disableErrorMessages: false,
    }));
    app.enableCors(cors_config_1.default);
    app.useLogger(new logger_service_1.LoggerService());
    const config = app.get(config_1.ConfigService);
    const port = config.get('app.port') || app_enum_1.App.PORT;
    await app.listen(port);
    (0, console_1.info)(`App URL accessible on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map