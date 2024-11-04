<?php
/**
 * Plugin Name: Cookies Consent Banner
 * Plugin URI: https://example.com/plugins/cookies-consent-banner/
 * Description: A customizable cookies consent banner for WordPress sites.
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://example.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: cookies-consent-banner
 * Domain Path: /languages
 */

defined('ABSPATH') or die('Direct script access disallowed.');

function ccb_enqueue_scripts() {
    $asset_file = include(plugin_dir_path(__FILE__) . 'build/index.asset.php');

    wp_enqueue_script(
        'cookies-consent-banner',
        plugins_url('build/index.js', __FILE__),
        $asset_file['dependencies'],
        $asset_file['version'],
        true
    );

    wp_enqueue_style(
        'cookies-consent-banner',
        plugins_url('build/index.css', __FILE__),
        array(),
        $asset_file['version']
    );
}
add_action('wp_enqueue_scripts', 'ccb_enqueue_scripts');

function ccb_render_banner() {
    echo '<div id="cookies-consent-banner"></div>';
}
add_action('wp_footer', 'ccb_render_banner');