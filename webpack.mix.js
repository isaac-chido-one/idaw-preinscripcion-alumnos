const mix = require('laravel-mix');

mix.js('src/scripts.js', 'src/public/app.js').sass('src/styles.scss', 'src/public/app.css');
mix.copyDirectory('node_modules/bootstrap-icons/font/fonts/', 'src/public/css/fonts/');
mix.options({
    processCssUrls: false
});
mix.copy('node_modules/jquery-form/dist/jquery.form.min.js', 'src/public/js/jquery.form.min.js');
mix.copy('node_modules/bootstrap-notify/bootstrap-notify.min.js', 'src/public/js/bootstrap-notify.min.js');
