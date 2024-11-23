/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  basePath: '/fib', 
  trailingSlash: true
}

module.exports = nextConfig