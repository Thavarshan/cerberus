import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
    logo: <span>Cerberus API | Documentation</span>,

    useNextSeoProps () {
        return {
            titleTemplate: '%s | Cerberus'
        };
    },

    project: {
        link: 'https://github.com/Thavarshan/cerberus',
    },

    // chat: {
    //     link: 'https://discord.com',
    // },

    docsRepositoryBase: 'https://github.com/Thavarshan/cerberus',

    footer: {
        text: `© ${new Date().getFullYear()} Cerberus`,
    },
};

export default config;
