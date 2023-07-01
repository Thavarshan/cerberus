import { registerAs } from '@nestjs/config';

const mailConfig = registerAs('mail', () => ({
    apiKey: process.env.MAIL_API_KEY || 'SG.test',
}));

export { mailConfig };
