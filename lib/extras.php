<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package _s
 */

/**
 *
 * Remove the <p> tags around images
 *
 */
function _s_filter_ptags_on_images($content){
    return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
}
add_filter('the_content', '_s_filter_ptags_on_images');
/**
 *
 * Enable SVG Support
 *
 */
function _s_allow_svg_upload($mimes) {
	$mimes['svg'] = 'image/svg+xml';
		return $mimes;
	}
add_filter('upload_mimes', '_s_allow_svg_upload');
/**
*
* Filter Yoast SEO's settings, so it is below custom metaboxes.
* https://wordpress.org/support/topic/plugin-wordpress-seo-by-yoast-position-seo-meta-box-priority-above-custom-meta-boxes/
*
*/
add_filter( 'wpseo_metabox_prio', function() { return 'low';});
/**
 * TypeKit Fonts
 *
 * https://wptheming.com/2013/02/typekit-code-snippet/
 */