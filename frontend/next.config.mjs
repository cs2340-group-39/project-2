const nextConfig = {
    /* config options here */
    async redirects() {
        return [
            {
                source: "/",
                destination: "/users/login",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
