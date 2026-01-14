/**
 * Jest configuration for Post Kinds for IndieWeb
 *
 * @see https://jestjs.io/docs/configuration
 */

const defaultConfig = require( '@wordpress/scripts/config/jest-unit.config' );

module.exports = {
	...defaultConfig,
	testEnvironment: 'jsdom',
	roots: [ '<rootDir>/src/', '<rootDir>/tests/js/' ],
	testMatch: [
		'**/__tests__/**/*.[jt]s?(x)',
		'**/?(*.)+(spec|test).[jt]s?(x)',
	],
	moduleNameMapper: {
		...defaultConfig.moduleNameMapper,
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	setupFilesAfterEnv: [
		'<rootDir>/tests/js/setup.js',
	],
	collectCoverageFrom: [
		'src/**/*.{js,jsx,ts,tsx}',
		'!src/**/*.d.ts',
		'!src/**/index.{js,ts}',
		'!**/node_modules/**',
	],
	coverageThreshold: {
		global: {
			branches: 60,
			functions: 60,
			lines: 60,
			statements: 60,
		},
	},
	coverageReporters: [ 'text', 'lcov', 'html' ],
	coverageDirectory: 'coverage/js',
	testPathIgnorePatterns: [
		'/node_modules/',
		'/build/',
		'/vendor/',
	],
	transformIgnorePatterns: [
		'/node_modules/(?!(@wordpress|parsel-js|is-plain-obj|dot-prop)/)',
	],
	globals: {
		wp: {},
		ajaxurl: '/wp-admin/admin-ajax.php',
	},
};
