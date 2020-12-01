module.exports = {
  pageExtensions: ['jsx'],
  target: 'serverless',
  webpack: function (config) {
    config.module.rules.push({test:  /\.md$/, use: 'raw-loader'})
    
    return config
  }
};
