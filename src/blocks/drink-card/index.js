/**
 * Drink Card Block
 *
 * @package Reactions_For_IndieWeb
 */

import { registerBlockType } from '@wordpress/blocks';
import { drinkIcon } from '../shared/icons';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	...metadata,
	icon: drinkIcon,
	edit: Edit,
	save: Save,
} );
