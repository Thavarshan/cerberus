import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    name: process.env.APP_NAME || 'Cerberus',
    key: process.env.KEY,
    port: process.env.PORT || 3000
}));
