/**
 * Play Card Block
 *
 * @package
 */

import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { playIcon } from '../shared/icons';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

/**
 * Status labels for display.
 */
const STATUS_LABELS = {
	playing: 'Playing',
	completed: 'Completed',
	abandoned: 'Abandoned',
	backlog: 'Backlog',
	wishlist: 'Wishlist',
};

/**
 * Deprecated v1 save function - includes developer, publisher, releaseYear
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {JSX.Element} Block save element.
 */
const v1Save = ( { attributes } ) => {
	const {
		title,
		platform,
		cover,
		coverAlt,
		status,
		hoursPlayed,
		rating,
		playedAt,
		review,
		gameUrl,
		bggId,
		rawgId,
		developer,
		publisher,
		releaseYear,
		layout,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `play-card layout-${ layout }`,
	} );

	const renderStars = () => {
		if ( ! rating || rating <= 0 ) {
			return null;
		}
		return (
			<div
				className="reactions-card__rating p-rating"
				aria-label={ `Rating: ${ rating } out of 5 stars` }
			>
				{ Array.from( { length: 5 }, ( _, i ) => (
					<span
						key={ i }
						className={ `star ${ i < rating ? 'filled' : '' }` }
						aria-hidden="true"
					>
						★
					</span>
				) ) }
				<span className="reactions-card__rating-value">
					{ rating }/5
				</span>
			</div>
		);
	};

	return (
		<div { ...blockProps }>
			<div className="reactions-card h-cite">
				{ cover && (
					<div className="reactions-card__media">
						<img
							src={ cover }
							alt={ coverAlt || title }
							className="reactions-card__image u-photo"
							loading="lazy"
						/>
					</div>
				) }
				<div className="reactions-card__content">
					<div className="reactions-card__badges">
						{ status && (
							<span
								className={ `reactions-card__badge reactions-card__badge--${ status }` }
							>
								{ STATUS_LABELS[ status ] || status }
							</span>
						) }
						{ platform && (
							<span className="reactions-card__badge">
								{ platform }
							</span>
						) }
					</div>
					{ title && (
						<h3 className="reactions-card__title p-name">
							{ gameUrl ? (
								<a
									href={ gameUrl }
									className="u-url"
									target="_blank"
									rel="noopener noreferrer"
								>
									{ title }
								</a>
							) : (
								title
							) }
						</h3>
					) }
					{ developer && (
						<p className="reactions-card__subtitle">
							<span className="p-author h-card">
								<span className="p-name">{ developer }</span>
							</span>
						</p>
					) }
					{ ( publisher || releaseYear ) && (
						<p className="reactions-card__meta">
							{ publisher }
							{ releaseYear && <span> ({ releaseYear })</span> }
						</p>
					) }
					{ hoursPlayed > 0 && (
						<p className="reactions-card__meta">
							<strong>{ hoursPlayed }</strong> hours played
						</p>
					) }
					{ renderStars() }
					{ review && (
						<p className="reactions-card__notes p-content">
							{ review }
						</p>
					) }
					{ playedAt && (
						<time
							className="reactions-card__timestamp dt-published"
							dateTime={ new Date( playedAt ).toISOString() }
						>
							{ new Date( playedAt ).toLocaleString() }
						</time>
					) }
				</div>
				<data className="u-play-of" value={ gameUrl || '' } hidden />
				{ bggId && (
					<data
						className="u-uid"
						value={ `https://boardgamegeek.com/boardgame/${ bggId }` }
						hidden
					/>
				) }
				{ rawgId && (
					<data
						className="u-uid"
						value={ `https://rawg.io/games/${ rawgId }` }
						hidden
					/>
				) }
			</div>
		</div>
	);
};

/**
 * Deprecated versions
 */
const deprecated = [
	{
		// v1: includes developer, publisher, releaseYear
		attributes: {
			...metadata.attributes,
			developer: { type: 'string' },
			publisher: { type: 'string' },
			releaseYear: { type: 'string' },
		},
		save: v1Save,
		migrate( attributes ) {
			// Remove deprecated attributes, keep the rest
			const { developer, publisher, releaseYear, ...rest } = attributes;
			return rest;
		},
	},
];

/**
 * Register the Play Card block.
 */
registerBlockType( metadata.name, {
	...metadata,
	icon: playIcon,
	edit: Edit,
	save: Save,
	deprecated,
} );
