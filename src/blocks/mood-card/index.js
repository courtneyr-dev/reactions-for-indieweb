/**
 * Mood Card Block
 *
 * @package
 */

import { registerBlockType } from '@wordpress/blocks';
import { moodIcon } from '../shared/icons';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	...metadata,
	icon: moodIcon,
	edit: Edit,
	save: Save,
} );
