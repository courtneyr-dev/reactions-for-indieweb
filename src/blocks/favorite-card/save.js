/**
 * Favorite Card Block - Save Component
 *
 * @package Reactions_For_IndieWeb
 */

import { useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { title, url, description, image, imageAlt, author, favoritedAt, layout } = attributes;
	const blockProps = useBlockProps.save( { className: `favorite-card layout-${ layout }` } );

	return (
		<div { ...blockProps }>
			<div className="favorite-card-inner h-cite">
				{ image && <div className="favorite-image"><img src={ image } alt={ imageAlt || title } className="u-photo" loading="lazy" /></div> }
				<div className="favorite-info">
					<span className="favorite-badge">★ Favorited</span>
					{ title && <h3 className="favorite-title p-name">{ url ? <a href={ url } className="u-url u-favorite-of" target="_blank" rel="noopener noreferrer">{ title }</a> : title }</h3> }
					{ author && <p className="favorite-author p-author h-card"><span className="p-name">{ author }</span></p> }
					{ description && <p className="favorite-description p-content">{ description }</p> }
					{ favoritedAt && <time className="favorited-at dt-published" dateTime={ new Date( favoritedAt ).toISOString() }>{ new Date( favoritedAt ).toLocaleString() }</time> }
				</div>
			</div>
		</div>
	);
}
