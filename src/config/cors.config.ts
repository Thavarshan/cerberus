const whiteList = [
    'http://localhost:3000',
    process.env.WEB_URL
];

export const corsConfig = {
    origin: (origin: any, callback: any) => {
        if (whiteList.indexOf(origin) !== -1) {
            console.log('Allowed CORs for:', origin);

            callback(null, true);
        } else {
            console.log('Blocked CORs for:', origin);

            callback(new Error('Not allowed by CORs'));
        }
    },

    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization, X-Formlink-Header',
    methods: 'GET,PUT,POST,PATCH,DELETE,UPDATE,OPTIONS',
    credentials: true,
};
