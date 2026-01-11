/**
 * Acquisition Card Block - Save Component
 *
 * @package Reactions_For_IndieWeb
 */

import { useBlockProps } from '@wordpress/block-editor';

const TYPE_LABELS = { purchase: 'Purchase', gift: 'Gift', found: 'Found', won: 'Won', trade: 'Trade', free: 'Free', other: 'Other' };

export default function Save( { attributes } ) {
	const { title, acquisitionType, cost, where, whereUrl, photo, photoAlt, notes, acquiredAt, layout } = attributes;
	const blockProps = useBlockProps.save( { className: `acquisition-card layout-${ layout }` } );

	return (
		<div { ...blockProps }>
			<div className="acquisition-card-inner h-cite">
				{ photo && <div className="acquisition-photo"><img src={ photo } alt={ photoAlt || title } className="u-photo" loading="lazy" /></div> }
				<div className="acquisition-info">
					<span className="acquisition-type-badge">{ TYPE_LABELS[ acquisitionType ] || acquisitionType }</span>
					{ title && <h3 className="acquisition-title p-name">{ whereUrl ? <a href={ whereUrl } className="u-url" target="_blank" rel="noopener noreferrer">{ title }</a> : title }</h3> }
					{ cost && <p className="acquisition-cost">{ cost }</p> }
					{ where && <p className="acquisition-where p-location">from { where }</p> }
					{ notes && <p className="acquisition-notes p-content">{ notes }</p> }
					{ acquiredAt && <time className="acquired-at dt-published" dateTime={ new Date( acquiredAt ).toISOString() }>{ new Date( acquiredAt ).toLocaleString() }</time> }
				</div>
				<data className="u-acquired" value={ title || '' } hidden />
			</div>
		</div>
	);
}
