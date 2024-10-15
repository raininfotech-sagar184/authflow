/** @type {import('next').NextConfig} */
const nextConfig = {

    env:{
        ADMFLDR: process.env.ADMFLDR,
        // SITENAME: process.env.SITENAME,
        PAGE: "10",
        API_ENDPOINT: process.env.API_ENDPOINT,
        // TESTNET: process.env.TESTNET,
        // EXPLORER_URL: process.env.EXPLORER_URL,
        FRONT_URL: process.env.FRONT_URL,
        IMG_URL: process.env.IMG_URL,
        FILTER_MONTH: "36",
        // IMAGE_PREVIEW: process.env.IMAGE_PREVIEW,
        SITE_KEY: process.env.SITE_KEY,
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
        EMAIL: process.env.EMAIL,
        EMAIL_NAME: process.env.EMAIL_NAME,
        // SECRET_KEY: process.env.SECRET_KEY,
    }
};

export default nextConfig;
