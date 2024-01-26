/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gni-templates.s3.us-east-1.amazonaws.com", // Match the S3 bucket hostname
        port: "",
        pathname: "/mooza/vanity/**", // Match the path prefix for your S3 files
      },
    ],
  },
};

module.exports = nextConfig;
