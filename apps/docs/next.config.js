const withNextra = require('nextra')({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
    reactStrictMode: true,
});

module.exports = withNextra();
