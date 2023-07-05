import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { info } from 'console';
import { LoggerService } from '@/logger/services/logger.service';
import corsConfig from '@/config/cors.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap () {
    const app = await NestFactory.create(AppModule);

    app.enableShutdownHooks();

    app.useGlobalPipes(new ValidationPipe({
        disableErrorMessages: false,
    }));

    app.enableCors(corsConfig);

    app.useLogger(new LoggerService());

    const config = app.get(ConfigService);

    const port = config.get<number>('app.port') || 3000;

    await app.listen(port);

    info(`App URL accessible on http://localhost:${port}`);
}

bootstrap();
