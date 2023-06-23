import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { info } from 'console';
import { tap } from '@/shared/helpers';
import { LoggerService } from '@/logger/services/logger.service';
import { corsConfig } from '@/config/cors.config';

/**
 * Bootstrap the application.
 *
 * @return  {Promise<void>}
 */
async function bootstrap () {
    const PORT = process.env.PORT || 3000; // Port has to be 3001 since 3000 is used by the frontend

    const app = tap(await NestFactory.create(AppModule), (
        app: INestApplication
    ): void => {
        app.enableShutdownHooks();

        app.useGlobalPipes(new ValidationPipe({
            disableErrorMessages: false,
        }));

        app.enableCors(corsConfig);

        app.useLogger(new LoggerService());
    });

    await app.listen(PORT);

    info(`App URL accessible on http://localhost:${PORT}`);
}

bootstrap();
