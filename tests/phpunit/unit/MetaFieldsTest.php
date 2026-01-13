<?php
/**
 * Test the Meta Fields class.
 *
 * @package PostKindsForIndieWeb
 */

namespace PostKindsForIndieWeb\Tests\Unit;

use WP_UnitTestCase;
use PostKindsForIndieWeb\Meta_Fields;

/**
 * Test the Meta_Fields class functionality.
 */
class MetaFieldsTest extends WP_UnitTestCase {

	/**
	 * Test that the meta prefix is correct.
	 */
	public function test_meta_prefix() {
		$this->assertEquals( '_postkind_', Meta_Fields::PREFIX );
	}

	/**
	 * Test that meta fields are registered.
	 */
	public function test_meta_fields_registered() {
		// Create a test post.
		$post_id = $this->factory->post->create();

		// Check that we can save and retrieve a meta value.
		$meta_key = Meta_Fields::PREFIX . 'cite_url';
		update_post_meta( $post_id, $meta_key, 'https://example.com' );

		$this->assertEquals( 'https://example.com', get_post_meta( $post_id, $meta_key, true ) );
	}

	/**
	 * Test the get_fields method returns an array.
	 */
	public function test_get_fields_returns_array() {
		$fields = Meta_Fields::get_fields();
		$this->assertIsArray( $fields );
		$this->assertNotEmpty( $fields );
	}

	/**
	 * Test that common fields exist.
	 */
	public function test_common_fields_exist() {
		$fields = Meta_Fields::get_fields();

		// Check for common meta keys.
		$expected_keys = array(
			'cite_url',
			'cite_name',
			'cite_author',
		);

		foreach ( $expected_keys as $key ) {
			$this->assertArrayHasKey( $key, $fields, "Field '{$key}' should exist" );
		}
	}
}
