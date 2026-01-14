/**
 * Eat Card Block
 *
 * @package
 */

import { registerBlockType } from '@wordpress/blocks';
import { eatIcon } from '../shared/icons';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	...metadata,
	icon: eatIcon,
	edit: Edit,
	save: Save,
} );
