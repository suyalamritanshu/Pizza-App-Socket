"use strict";

// webpack.mix.js
var mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js/app.js').sass('resources/scss/app.scss', 'public/css/app.css');
mix.babelConfig({
  "plugins": ["@babel/plugin-proposal-class-properties"]
});
//# sourceMappingURL=webpack.mix.dev.js.map
