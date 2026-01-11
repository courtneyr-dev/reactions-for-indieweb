/**
 * Wish Card Block - Save Component
 *
 * @package Reactions_For_IndieWeb
 */

import { useBlockProps } from '@wordpress/block-editor';

const TYPE_LABELS = { item: 'Item', experience: 'Experience', book: 'Book', game: 'Game', media: 'Media', travel: 'Travel', other: 'Other' };
const PRIORITY_LABELS = { low: 'Low', medium: 'Medium', high: 'High' };

export default function Save( { attributes } ) {
	const { title, wishType, url, image, imageAlt, price, reason, priority, wishedAt, layout } = attributes;
	const blockProps = useBlockProps.save( { className: `wish-card layout-${ layout } priority-${ priority }` } );

	return (
		<div { ...blockProps }>
			<div className="wish-card-inner h-cite">
				{ image && <div className="wish-image"><img src={ image } alt={ imageAlt || title } className="u-photo" loading="lazy" /></div> }
				<div className="wish-info">
					<div className="wish-header">
						<span className="wish-type-badge">{ TYPE_LABELS[ wishType ] || wishType }</span>
						<span className={ `priority-badge priority-${ priority }` }>{ PRIORITY_LABELS[ priority ] }</span>
					</div>
					{ title && <h3 className="wish-title p-name">{ url ? <a href={ url } className="u-url u-wish-of" target="_blank" rel="noopener noreferrer">{ title }</a> : title }</h3> }
					{ price && <p className="wish-price">{ price }</p> }
					{ reason && <p className="wish-reason p-content">{ reason }</p> }
					{ wishedAt && <time className="wished-at dt-published" dateTime={ new Date( wishedAt ).toISOString() }>{ new Date( wishedAt ).toLocaleString() }</time> }
				</div>
			</div>
		</div>
	);
}
