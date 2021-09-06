const mix = require('laravel-mix');
require('dotenv').config();
const app_url = process.env.APP_URL;
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.config.webpackConfig.output = {
    // chunkFilename: 'js/build_component/[name].[chunkhash:8].js',
    chunkFilename: 'js/build_component/[name].js?id=[chunkhash]',
    // publicPath: '/public/', //For server
    publicPath: app_url + '/public/',
    // publicPath: app_url,
};
mix.js('resources/js/app.js', 'public/js/app.js')
    .scripts([
        'resources/js/role_permission.js',
        'resources/js/shatcholib.js',
        'resources/js/custom.js',
        'resources/js/custom_m.js',
        'resources/js/navigation_message.js',
        'resources/js/jacos_nav_lib.js',
        'resources/js/jacos_nav_do.js',
        'resources/js/hidekeyboard.js',
        'resources/js/handy.js',
        'resources/js/voice.js',
    ], 'public/js/all_custom_js.js')
    .scripts([
        'resources/js/online_js/jquery-ui.js',
        'resources/js/online_js/Chart.min.js',
        'resources/js/online_js/shards-dashboards.1.1.0.min.js',
        'resources/js/online_js/jquery.sharrre.min.js',
        'resources/js/online_js/extras.1.1.0.min.js',
        'resources/js/online_js/select2.min.js',
        'resources/js/online_js/mustache.min.js',
        'resources/js/online_js/anno.js',
        'resources/js/online_js/tippy_popper.min.js',
        'resources/js/online_js/tippy-bundle.iife.min.js',
        'resources/js/online_js/multifreezer.js',
        'resources/js/online_js/wurfl.js',
    ], 'public/js/all_online_js.js')
    .sass('resources/sass/app.scss', 'public/css/app.css')
    .styles([
        'resources/css/jacos_nav.css',
        'resources/css/custom.css',
        'resources/css/custom_style.css'
    ], 'public/css/all_custom_css.css')
    .styles([
        'resources/css/online_css/flag-icon.css',
        'resources/css/online_css/jquery-ui.css',
        'resources/css/online_css/shards-dashboards.1.1.0.min.css',
        'resources/css/online_css/extras.1.1.0.min.css',
        'resources/css/online_css/select2.min.css',
        'resources/css/online_css/anno.css',
        'resources/css/online_css/backdrop.css',
        'resources/css/online_css/multifreezer.css',
    ], 'public/css/all_online_css.css')
    .version();