/**
 * Jam Card Block - Save Component
 *
 * @package Reactions_For_IndieWeb
 */

import { useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { title, artist, album, cover, coverAlt, url, note, jammedAt, layout } = attributes;
	const blockProps = useBlockProps.save( { className: `jam-card layout-${ layout }` } );

	return (
		<div { ...blockProps }>
			<div className="jam-card-inner h-cite">
				{ cover && <div className="jam-cover"><img src={ cover } alt={ coverAlt || `${ title } by ${ artist }` } className="u-photo" loading="lazy" /></div> }
				<div className="jam-info">
					<span className="jam-badge">🎵 Now Playing</span>
					{ title && <h3 className="jam-title p-name">{ url ? <a href={ url } className="u-url u-jam-of" target="_blank" rel="noopener noreferrer">{ title }</a> : title }</h3> }
					{ artist && <p className="jam-artist p-author h-card"><span className="p-name">{ artist }</span></p> }
					{ album && <p className="jam-album">{ album }</p> }
					{ note && <p className="jam-note p-content">{ note }</p> }
					{ jammedAt && <time className="jammed-at dt-published" dateTime={ new Date( jammedAt ).toISOString() }>{ new Date( jammedAt ).toLocaleString() }</time> }
				</div>
			</div>
		</div>
	);
}
