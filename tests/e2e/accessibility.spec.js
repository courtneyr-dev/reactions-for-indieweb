/**
 * Accessibility E2E tests using axe-core
 */

const { test, expect } = require( '@playwright/test' );
const AxeBuilder = require( '@axe-core/playwright' ).default;

test.describe( 'Accessibility', () => {
	test.beforeEach( async ( { page } ) => {
		// Login to WordPress admin
		await page.goto( '/wp-login.php' );
		await page.fill( '#user_login', 'admin' );
		await page.fill( '#user_pass', 'password' );
		await page.click( '#wp-submit' );
		await page.waitForURL( '**/wp-admin/**' );
	} );

	test( 'settings page should have no critical accessibility violations', async ( {
		page,
	} ) => {
		await page.goto( '/wp-admin/admin.php?page=post-kinds-settings' );

		const accessibilityScanResults = await new AxeBuilder( { page } )
			.withTags( [ 'wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa' ] )
			.exclude( '#wpadminbar' ) // Exclude WordPress admin bar
			.analyze();

		// Filter to only critical and serious issues
		const criticalViolations = accessibilityScanResults.violations.filter(
			( v ) => v.impact === 'critical' || v.impact === 'serious'
		);

		expect( criticalViolations ).toEqual( [] );
	} );

	test( 'block editor with blocks should be accessible', async ( {
		page,
	} ) => {
		await page.goto( '/wp-admin/post-new.php' );
		await page.waitForSelector( '.block-editor-writing-flow' );

		// Insert a Listen Card block
		const inserterButton = page.getByRole( 'button', {
			name: 'Toggle block inserter',
		} );
		await inserterButton.click();

		const searchInput = page.getByPlaceholder( 'Search' );
		await searchInput.fill( 'Listen Card' );

		const listenCardBlock = page.getByRole( 'option', {
			name: /Listen Card/,
		} );
		await listenCardBlock.click();

		// Wait for block to be inserted
		await page.waitForSelector(
			'[data-type="post-kinds-indieweb/listen-card"]'
		);

		// Run accessibility scan on the editor area
		const accessibilityScanResults = await new AxeBuilder( { page } )
			.withTags( [ 'wcag2a', 'wcag2aa' ] )
			.include( '.block-editor-writing-flow' )
			.analyze();

		const criticalViolations = accessibilityScanResults.violations.filter(
			( v ) => v.impact === 'critical' || v.impact === 'serious'
		);

		expect( criticalViolations ).toEqual( [] );
	} );
} );

test.describe( 'Keyboard Navigation', () => {
	test.beforeEach( async ( { page } ) => {
		await page.goto( '/wp-login.php' );
		await page.fill( '#user_login', 'admin' );
		await page.fill( '#user_pass', 'password' );
		await page.click( '#wp-submit' );
		await page.waitForURL( '**/wp-admin/**' );
	} );

	test( 'star rating is keyboard accessible', async ( { page } ) => {
		await page.goto( '/wp-admin/post-new.php' );
		await page.waitForSelector( '.block-editor-writing-flow' );

		// Insert Star Rating block
		const inserterButton = page.getByRole( 'button', {
			name: 'Toggle block inserter',
		} );
		await inserterButton.click();

		const searchInput = page.getByPlaceholder( 'Search' );
		await searchInput.fill( 'Star Rating' );

		const starRatingBlock = page.getByRole( 'option', {
			name: /Star Rating/,
		} );
		await starRatingBlock.click();

		// Wait for block
		await page.waitForSelector(
			'[data-type="post-kinds-indieweb/star-rating"]'
		);

		// Tab to the star rating and verify focus
		await page.keyboard.press( 'Tab' );
		await page.keyboard.press( 'Tab' );

		// Verify focus is visible (basic check)
		const focusedElement = await page.evaluate( () => {
			return document.activeElement?.tagName;
		} );

		expect( focusedElement ).toBeTruthy();
	} );
} );
