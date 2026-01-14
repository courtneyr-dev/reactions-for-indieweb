/**
 * Favorite Card Block
 *
 * @package
 */

import { registerBlockType } from '@wordpress/blocks';
import { favoriteIcon } from '../shared/icons';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	...metadata,
	icon: favoriteIcon,
	edit: Edit,
	save: Save,
} );
