/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://findinvestors.pk',
  generateRobotsTxt: true,
  exclude: ['/apply/thank-you'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/', disallow: ['/api', '/apply/thank-you'] }],
  },
};
