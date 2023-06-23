import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    uri: process.env.DB_URI || 'mongodb://localhost/bitmenu',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}));
