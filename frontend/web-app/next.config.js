/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        domains: [
            'cdn.pixabay.com',
            'media.istockphoto.com'
        ]
    },
    output: 'standalone'
}

module.exports = nextConfig
