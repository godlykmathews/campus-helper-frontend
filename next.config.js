// Ensure .env is loaded first and overrides other env files
require('dotenv').config({ path: '.env', override: true });

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...existing config...
};

module.exports = nextConfig;