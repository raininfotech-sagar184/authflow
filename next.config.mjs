/** @type {import('next').NextConfig} */
const nextConfig = {

    env:{
        // ADMFLDR: process.env.ADMFLDR,
        // SITENAME: process.env.SITENAME,
        PAGE: "10",
        API_ENDPOINT: process.env.API_ENDPOINT,
        // TESTNET: process.env.TESTNET,
        // EXPLORER_URL: process.env.EXPLORER_URL,
        FRONT_URL: process.env.FRONT_URL,
        FILTER_MONTH: "36",
        // IMAGE_PREVIEW: process.env.IMAGE_PREVIEW,
        // SITE_KEY: process.env.SITE_KEY,
        // SECRET_KEY: process.env.SECRET_KEY,
    }
};

export default nextConfig;
