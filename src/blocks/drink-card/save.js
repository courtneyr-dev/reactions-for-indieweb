/**
 * Drink Card Block - Save Component
 *
 * @package Reactions_For_IndieWeb
 */

import { useBlockProps } from '@wordpress/block-editor';

const DRINK_LABELS = {
	coffee: 'Coffee', tea: 'Tea', beer: 'Beer', wine: 'Wine',
	cocktail: 'Cocktail', juice: 'Juice', soda: 'Soda',
	smoothie: 'Smoothie', water: 'Water', other: 'Drink',
};

export default function Save( { attributes } ) {
	const { name, drinkType, brand, photo, photoAlt, rating, drankAt, notes, venue, venueUrl, layout } = attributes;
	const blockProps = useBlockProps.save( { className: `drink-card layout-${ layout }` } );

	const renderStars = () => {
		if ( ! rating || rating <= 0 ) return null;
		return (
			<div className="rating-display p-rating" aria-label={ `Rating: ${ rating } out of 5` }>
				{ Array.from( { length: 5 }, ( _, i ) => (
					<span key={ i } className={ `star ${ i < rating ? 'filled' : '' }` }>★</span>
				) ) }
				<span className="rating-value">{ rating }/5</span>
			</div>
		);
	};

	return (
		<div { ...blockProps }>
			<div className="drink-card-inner h-food">
				{ photo && <div className="drink-photo"><img src={ photo } alt={ photoAlt || name } className="u-photo" loading="lazy" /></div> }
				<div className="drink-info">
					<span className="drink-type-badge">{ DRINK_LABELS[ drinkType ] || drinkType }</span>
					{ name && <h3 className="drink-name p-name">{ venueUrl ? <a href={ venueUrl } className="u-url" target="_blank" rel="noopener noreferrer">{ name }</a> : name }</h3> }
					{ brand && <p className="drink-brand p-author h-card"><span className="p-name">{ brand }</span></p> }
					{ venue && <p className="drink-venue p-location">{ venue }</p> }
					{ renderStars() }
					{ notes && <p className="drink-notes p-content">{ notes }</p> }
					{ drankAt && <time className="drank-at dt-published" dateTime={ new Date( drankAt ).toISOString() }>{ new Date( drankAt ).toLocaleString() }</time> }
				</div>
				<data className="u-drank" value={ name || '' } hidden />
			</div>
		</div>
	);
}
