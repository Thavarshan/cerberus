import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
    apiKey: process.env.MAIL_API_KEY || 'SG.test',
}));
