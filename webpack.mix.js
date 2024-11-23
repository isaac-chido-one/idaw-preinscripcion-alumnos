const mix = require('laravel-mix');

mix.js('src/scripts.js', 'src/public/app.js').sass('src/styles.scss', 'src/public/app.css');
mix.copyDirectory('node_modules/bootstrap-icons/font/fonts/', 'src/public/fonts/');
mix.options({
    processCssUrls: false
});
