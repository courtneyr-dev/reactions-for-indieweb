/**
 * Jam Card Block
 *
 * @package
 */

import { registerBlockType } from '@wordpress/blocks';
import { jamIcon } from '../shared/icons';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	...metadata,
	icon: jamIcon,
	edit: Edit,
	save: Save,
} );
