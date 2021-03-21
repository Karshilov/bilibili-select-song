/* eslint-disable global-require */
const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    './src/**/*.tsx',
    './src/**/*.ts',
    './src/**/*.js',
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    tailwindcss('./src/tailwind.config.js'),
    require('autoprefixer'),
    // ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
