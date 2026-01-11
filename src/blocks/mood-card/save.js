/**
 * Mood Card Block - Save Component
 *
 * @package Reactions_For_IndieWeb
 */

import { useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { mood, emoji, note, intensity, moodAt, layout } = attributes;
	const blockProps = useBlockProps.save( { className: `mood-card layout-${ layout }` } );

	return (
		<div { ...blockProps }>
			<div className="mood-card-inner h-entry">
				<div className="mood-emoji-display">
					<span className="emoji-large" role="img" aria-label={ mood || 'mood' }>{ emoji || '😊' }</span>
					<div className="intensity-dots" aria-label={ `Intensity: ${ intensity } out of 5` }>
						{ Array.from( { length: 5 }, ( _, i ) => <span key={ i } className={ `dot ${ i < intensity ? 'filled' : '' }` } /> ) }
					</div>
				</div>
				<div className="mood-info">
					{ mood && <h3 className="mood-text p-name">{ mood }</h3> }
					{ note && <p className="mood-note p-content">{ note }</p> }
					{ moodAt && <time className="mood-at dt-published" dateTime={ new Date( moodAt ).toISOString() }>{ new Date( moodAt ).toLocaleString() }</time> }
				</div>
			</div>
		</div>
	);
}
