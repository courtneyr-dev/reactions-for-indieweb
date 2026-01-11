/**
 * Play Card Block - Save Component
 *
 * @package Reactions_For_IndieWeb
 */

import { useBlockProps } from '@wordpress/block-editor';

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
 * Get status badge class.
 *
 * @param {string} status Status value.
 * @return {string} CSS class.
 */
function getStatusClass( status ) {
	const classes = {
		playing: 'status-playing',
		completed: 'status-completed',
		abandoned: 'status-abandoned',
		backlog: 'status-backlog',
		wishlist: 'status-wishlist',
	};
	return classes[ status ] || 'status-playing';
}

/**
 * Save component for the Play Card block.
 *
 * @param {Object} props Block props.
 * @returns {JSX.Element} Block save component.
 */
export default function Save( { attributes } ) {
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

	/**
	 * Generate stars for rating.
	 */
	const renderStars = () => {
		if ( ! rating || rating <= 0 ) {
			return null;
		}

		return (
			<div
				className="rating-display p-rating"
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
				<span className="rating-value">{ rating }/5</span>
			</div>
		);
	};

	return (
		<div { ...blockProps }>
			<div className="play-card-inner h-cite">
				{ /* Cover image */ }
				{ cover && (
					<div className="game-cover">
						<img
							src={ cover }
							alt={ coverAlt || title }
							className="u-photo"
							loading="lazy"
						/>
					</div>
				) }

				<div className="game-info">
					{ /* Status and platform badges */ }
					<div className="game-header">
						{ status && (
							<span className={ `status-badge ${ getStatusClass( status ) }` }>
								{ STATUS_LABELS[ status ] || status }
							</span>
						) }
						{ platform && <span className="platform-badge">{ platform }</span> }
					</div>

					{ /* Game title */ }
					{ title && (
						<h3 className="game-title p-name">
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

					{ /* Developer */ }
					{ developer && (
						<p className="game-developer">
							<span className="p-author h-card">
								<span className="p-name">{ developer }</span>
							</span>
						</p>
					) }

					{ /* Publisher and year */ }
					{ ( publisher || releaseYear ) && (
						<p className="game-publisher">
							{ publisher }
							{ releaseYear && (
								<span className="release-year"> ({ releaseYear })</span>
							) }
						</p>
					) }

					{ /* Hours played */ }
					{ hoursPlayed > 0 && (
						<p className="hours-played">
							<span className="hours-value">{ hoursPlayed }</span> hours played
						</p>
					) }

					{ /* Rating */ }
					{ renderStars() }

					{ /* Review */ }
					{ review && <p className="game-review p-content">{ review }</p> }

					{ /* Played timestamp */ }
					{ playedAt && (
						<time
							className="played-at dt-published"
							dateTime={ new Date( playedAt ).toISOString() }
						>
							{ new Date( playedAt ).toLocaleString() }
						</time>
					) }
				</div>

				{ /* Hidden microformat data */ }
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
}
