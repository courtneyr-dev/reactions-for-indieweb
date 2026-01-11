/**
 * Play Card Block
 *
 * @package Reactions_For_IndieWeb
 */

import { registerBlockType } from '@wordpress/blocks';
import { playIcon } from '../shared/icons';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

/**
 * Register the Play Card block.
 */
registerBlockType( metadata.name, {
	...metadata,
	icon: playIcon,
	edit: Edit,
	save: Save,
} );
