/**
 * Play Card Block - Edit Component
 *
 * @package Reactions_For_IndieWeb
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	Button,
	DateTimePicker,
	Popover,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { playIcon } from '../shared/icons';
import {
	StarRating,
	CoverImage,
	MediaSearch,
	BlockPlaceholder,
} from '../shared/components';

/**
 * Status options for games.
 */
const STATUS_OPTIONS = [
	{ label: __( 'Playing', 'reactions-for-indieweb' ), value: 'playing' },
	{ label: __( 'Completed', 'reactions-for-indieweb' ), value: 'completed' },
	{ label: __( 'Abandoned', 'reactions-for-indieweb' ), value: 'abandoned' },
	{ label: __( 'Backlog', 'reactions-for-indieweb' ), value: 'backlog' },
	{ label: __( 'Wishlist', 'reactions-for-indieweb' ), value: 'wishlist' },
];

/**
 * Get status badge color class.
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
 * Edit component for the Play Card block.
 *
 * @param {Object} props Block props.
 * @returns {JSX.Element} Block edit component.
 */
export default function Edit( { attributes, setAttributes } ) {
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

	const [ showDatePicker, setShowDatePicker ] = useState( false );
	const [ isSearching, setIsSearching ] = useState( false );

	const blockProps = useBlockProps( {
		className: `play-card layout-${ layout }`,
	} );

	/**
	 * Handle game search result selection
	 */
	const handleSearchSelect = ( item ) => {
		setAttributes( {
			title: item.title || item.name || '',
			cover: item.cover || item.image || item.background_image || '',
			coverAlt: item.title || item.name || '',
			platform: item.platforms ? item.platforms[ 0 ] : '',
			developer: item.developers ? item.developers.join( ', ' ) : '',
			publisher: item.publishers ? item.publishers.join( ', ' ) : '',
			releaseYear: item.year || item.released?.substring( 0, 4 ) || '',
			gameUrl: item.url || '',
			bggId: item.source === 'bgg' ? String( item.id ) : '',
			rawgId: item.source === 'rawg' ? String( item.id ) : '',
		} );
		setIsSearching( false );
	};

	/**
	 * Handle cover image selection
	 */
	const handleImageSelect = ( media ) => {
		setAttributes( {
			cover: media.url,
			coverAlt: media.alt || title,
		} );
	};

	// Show placeholder if no game info
	if ( ! title ) {
		return (
			<div { ...blockProps }>
				<BlockPlaceholder
					icon={ playIcon }
					label={ __( 'Play Card', 'reactions-for-indieweb' ) }
					instructions={ __(
						'Add a game you played. Search for games or enter details manually.',
						'reactions-for-indieweb'
					) }
				>
					{ isSearching ? (
						<div className="search-mode">
							<MediaSearch
								type="game"
								placeholder={ __(
									'Search for a game...',
									'reactions-for-indieweb'
								) }
								onSelect={ handleSearchSelect }
							/>
							<Button
								variant="link"
								onClick={ () => setIsSearching( false ) }
							>
								{ __( 'Enter manually', 'reactions-for-indieweb' ) }
							</Button>
						</div>
					) : (
						<div className="placeholder-actions">
							<Button
								variant="primary"
								onClick={ () => setIsSearching( true ) }
							>
								{ __( 'Search Games', 'reactions-for-indieweb' ) }
							</Button>
							<Button
								variant="secondary"
								onClick={ () => setAttributes( { title: '' } ) }
							>
								{ __( 'Enter Manually', 'reactions-for-indieweb' ) }
							</Button>
						</div>
					) }
				</BlockPlaceholder>
			</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Game Details', 'reactions-for-indieweb' ) }>
					<TextControl
						label={ __( 'Game Title', 'reactions-for-indieweb' ) }
						value={ title || '' }
						onChange={ ( value ) => setAttributes( { title: value } ) }
					/>
					<TextControl
						label={ __( 'Platform', 'reactions-for-indieweb' ) }
						value={ platform || '' }
						onChange={ ( value ) => setAttributes( { platform: value } ) }
						help={ __(
							'e.g., PC, PlayStation 5, Nintendo Switch',
							'reactions-for-indieweb'
						) }
					/>
					<TextControl
						label={ __( 'Developer', 'reactions-for-indieweb' ) }
						value={ developer || '' }
						onChange={ ( value ) => setAttributes( { developer: value } ) }
					/>
					<TextControl
						label={ __( 'Publisher', 'reactions-for-indieweb' ) }
						value={ publisher || '' }
						onChange={ ( value ) => setAttributes( { publisher: value } ) }
					/>
					<TextControl
						label={ __( 'Release Year', 'reactions-for-indieweb' ) }
						value={ releaseYear || '' }
						onChange={ ( value ) => setAttributes( { releaseYear: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Play Info', 'reactions-for-indieweb' ) }>
					<SelectControl
						label={ __( 'Status', 'reactions-for-indieweb' ) }
						value={ status }
						options={ STATUS_OPTIONS }
						onChange={ ( value ) => setAttributes( { status: value } ) }
					/>

					<NumberControl
						label={ __( 'Hours Played', 'reactions-for-indieweb' ) }
						value={ hoursPlayed || 0 }
						onChange={ ( value ) =>
							setAttributes( { hoursPlayed: parseFloat( value ) || 0 } )
						}
						min={ 0 }
						step={ 0.5 }
					/>

					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Rating', 'reactions-for-indieweb' ) }
						</label>
						<StarRating
							value={ rating }
							onChange={ ( value ) => setAttributes( { rating: value } ) }
							max={ 5 }
						/>
					</div>

					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Played At', 'reactions-for-indieweb' ) }
						</label>
						<Button
							variant="secondary"
							onClick={ () => setShowDatePicker( true ) }
						>
							{ playedAt
								? new Date( playedAt ).toLocaleString()
								: __( 'Set date/time', 'reactions-for-indieweb' ) }
						</Button>
						{ showDatePicker && (
							<Popover onClose={ () => setShowDatePicker( false ) }>
								<DateTimePicker
									currentDate={ playedAt }
									onChange={ ( value ) => {
										setAttributes( { playedAt: value } );
										setShowDatePicker( false );
									} }
									is12Hour={ true }
								/>
							</Popover>
						) }
					</div>

					<TextControl
						label={ __( 'Game URL', 'reactions-for-indieweb' ) }
						value={ gameUrl || '' }
						onChange={ ( value ) => setAttributes( { gameUrl: value } ) }
						type="url"
						help={ __(
							'Link to the game page.',
							'reactions-for-indieweb'
						) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Layout', 'reactions-for-indieweb' ) }>
					<SelectControl
						label={ __( 'Layout Style', 'reactions-for-indieweb' ) }
						value={ layout }
						options={ [
							{
								label: __( 'Horizontal', 'reactions-for-indieweb' ),
								value: 'horizontal',
							},
							{
								label: __( 'Vertical', 'reactions-for-indieweb' ),
								value: 'vertical',
							},
							{
								label: __( 'Compact', 'reactions-for-indieweb' ),
								value: 'compact',
							},
						] }
						onChange={ ( value ) => setAttributes( { layout: value } ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Metadata', 'reactions-for-indieweb' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'BoardGameGeek ID', 'reactions-for-indieweb' ) }
						value={ bggId || '' }
						onChange={ ( value ) => setAttributes( { bggId: value } ) }
					/>
					<TextControl
						label={ __( 'RAWG ID', 'reactions-for-indieweb' ) }
						value={ rawgId || '' }
						onChange={ ( value ) => setAttributes( { rawgId: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="play-card-inner h-cite">
					<div className="game-cover">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ handleImageSelect }
								allowedTypes={ [ 'image' ] }
								render={ ( { open } ) => (
									<div onClick={ open } role="button" tabIndex={ 0 }>
										<CoverImage
											src={ cover }
											alt={ coverAlt }
											size="medium"
										/>
									</div>
								) }
							/>
						</MediaUploadCheck>
					</div>

					<div className="game-info">
						<div className="game-header">
							<span
								className={ `status-badge ${ getStatusClass( status ) }` }
							>
								{ STATUS_OPTIONS.find( ( o ) => o.value === status )
									?.label || status }
							</span>
							{ platform && (
								<span className="platform-badge">{ platform }</span>
							) }
						</div>

						<RichText
							tagName="h3"
							className="game-title p-name"
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
							placeholder={ __( 'Game title', 'reactions-for-indieweb' ) }
						/>

						{ developer && (
							<p className="game-developer p-author h-card">
								{ developer }
							</p>
						) }

						{ hoursPlayed > 0 && (
							<p className="hours-played">
								{ hoursPlayed }{ ' ' }
								{ __( 'hours played', 'reactions-for-indieweb' ) }
							</p>
						) }

						{ rating > 0 && (
							<div className="rating-display">
								<StarRating value={ rating } readonly={ true } max={ 5 } />
							</div>
						) }

						<RichText
							tagName="p"
							className="game-review p-content"
							value={ review }
							onChange={ ( value ) => setAttributes( { review: value } ) }
							placeholder={ __(
								'Add your thoughts about this game...',
								'reactions-for-indieweb'
							) }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
