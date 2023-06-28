import { registerAs } from '@nestjs/config';

export default registerAs('logger', () => ({
    filename: 'logs/cerberus.log',
    handleExceptions: true
}));
