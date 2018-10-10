<?php
/**
 * The template for displaying the front page
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$data = Timber::get_context();
$post = new TimberPost();
$data['post'] = $post;
Timber::render( array( 'front-page.twig' ), $data );