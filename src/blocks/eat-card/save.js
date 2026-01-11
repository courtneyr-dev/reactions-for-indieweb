/**
 * Eat Card Block - Save Component
 *
 * @package Reactions_For_IndieWeb
 */

import { useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const {
		name,
		restaurant,
		cuisine,
		photo,
		photoAlt,
		rating,
		ateAt,
		notes,
		restaurantUrl,
		locality,
		layout,
	} = attributes;

	const blockProps = useBlockProps.save( { className: `eat-card layout-${ layout }` } );

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
			<div className="eat-card-inner h-food">
				{ photo && (
					<div className="food-photo">
						<img src={ photo } alt={ photoAlt || name } className="u-photo" loading="lazy" />
					</div>
				) }
				<div className="food-info">
					{ cuisine && <span className="cuisine-badge">{ cuisine }</span> }
					{ name && (
						<h3 className="food-name p-name">
							{ restaurantUrl ? (
								<a href={ restaurantUrl } className="u-url" target="_blank" rel="noopener noreferrer">{ name }</a>
							) : name }
						</h3>
					) }
					{ restaurant && (
						<p className="restaurant-name p-location h-card">
							<span className="p-name">{ restaurant }</span>
							{ locality && <span className="p-locality">, { locality }</span> }
						</p>
					) }
					{ renderStars() }
					{ notes && <p className="food-notes p-content">{ notes }</p> }
					{ ateAt && (
						<time className="ate-at dt-published" dateTime={ new Date( ateAt ).toISOString() }>
							{ new Date( ateAt ).toLocaleString() }
						</time>
					) }
				</div>
				<data className="u-ate" value={ name || '' } hidden />
			</div>
		</div>
	);
}
