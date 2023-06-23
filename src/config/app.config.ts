import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    key: process.env.KEY,
    port: process.env.PORT || 3001
}));
