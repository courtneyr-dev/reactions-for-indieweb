<?php
/**
 * Test the main plugin class.
 *
 * @package PostKindsForIndieWeb
 */

namespace PostKindsForIndieWeb\Tests\Unit;

use WP_UnitTestCase;

/**
 * Test the main plugin functionality.
 */
class PluginTest extends WP_UnitTestCase {

	/**
	 * Test that WordPress is properly loaded.
	 */
	public function test_wordpress_is_loaded() {
		$this->assertTrue( function_exists( 'add_action' ) );
	}

	/**
	 * Test that the plugin is loaded.
	 */
	public function test_plugin_is_loaded() {
		$this->assertTrue( defined( 'POST_KINDS_INDIEWEB_VERSION' ) );
	}

	/**
	 * Test that the plugin version is set.
	 */
	public function test_plugin_version() {
		$this->assertEquals( '1.0.0', POST_KINDS_INDIEWEB_VERSION );
	}

	/**
	 * Test that the kind taxonomy is registered.
	 */
	public function test_kind_taxonomy_exists() {
		$this->assertTrue( taxonomy_exists( 'kind' ) );
	}

	/**
	 * Test that the plugin namespace is correct.
	 */
	public function test_plugin_namespace() {
		$this->assertTrue( class_exists( 'PostKindsForIndieWeb\Plugin' ) );
	}
}
