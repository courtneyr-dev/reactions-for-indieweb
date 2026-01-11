/**
 * Reactions for IndieWeb - Kind Fields Component
 *
 * Displays kind-specific metadata fields based on the selected post kind.
 *
 * @package ReactionsForIndieWeb
 * @since   1.0.0
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	TextControl,
	TextareaControl,
	SelectControl,
	ToggleControl,
	RangeControl,
	Button,
	Spinner,
	BaseControl,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { useState, useCallback } from '@wordpress/element';
import { search as searchIcon, link as linkIcon } from '@wordpress/icons';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { STORE_NAME } from '../../stores/post-kinds';
import SyndicationControls from './SyndicationControls';

/**
 * Kind Fields Component
 *
 * Renders appropriate metadata fields based on the selected kind.
 *
 * @param {Object} props      Component props.
 * @param {string} props.kind Current kind slug.
 * @return {JSX.Element|null} The fields component or null.
 */
export default function KindFields( { kind } ) {
	switch ( kind ) {
		case 'rsvp':
			return <RSVPFields />;
		case 'checkin':
			return <CheckinFields />;
		case 'listen':
			return <ListenFields />;
		case 'watch':
			return <WatchFields />;
		case 'read':
			return <ReadFields />;
		case 'event':
			return <EventFields />;
		case 'review':
			return <ReviewFields />;
		case 'play':
			return <PlayFields />;
		case 'eat':
			return <EatFields />;
		case 'drink':
			return <DrinkFields />;
		case 'favorite':
			return <FavoriteFields />;
		case 'jam':
			return <JamFields />;
		case 'wish':
			return <WishFields />;
		case 'mood':
			return <MoodFields />;
		case 'acquisition':
			return <AcquisitionFields />;
		case 'recipe':
			return <RecipeFields />;
		case 'reply':
		case 'like':
		case 'repost':
		case 'bookmark':
			return <CitationFields />;
		default:
			return null;
	}
}

/**
 * Citation Fields Component
 *
 * Fields for reply, like, repost, and bookmark kinds.
 *
 * @return {JSX.Element} Citation fields.
 */
function CitationFields() {
	const { citeName, citeUrl, citeAuthor, citeSummary } = useSelect( ( select ) => {
		const getKindMeta = select( STORE_NAME ).getKindMeta;
		return {
			citeName: getKindMeta( 'cite_name' ),
			citeUrl: getKindMeta( 'cite_url' ),
			citeAuthor: getKindMeta( 'cite_author' ),
			citeSummary: getKindMeta( 'cite_summary' ),
		};
	}, [] );

	const { updateKindMeta } = useDispatch( STORE_NAME );

	return (
		<VStack spacing={ 4 } className="reactions-indieweb-kind-fields">
			<TextControl
				label={ __( 'URL', 'reactions-for-indieweb' ) }
				value={ citeUrl }
				onChange={ ( value ) => updateKindMeta( 'cite_url', value ) }
				type="url"
				placeholder="https://"
			/>
			<TextControl
				label={ __( 'Title', 'reactions-for-indieweb' ) }
				value={ citeName }
				onChange={ ( value ) => updateKindMeta( 'cite_name', value ) }
			/>
			<TextControl
				label={ __( 'Author', 'reactions-for-indieweb' ) }
				value={ citeAuthor }
				onChange={ ( value ) => updateKindMeta( 'cite_author', value ) }
			/>
			<TextareaControl
				label={ __( 'Summary', 'reactions-for-indieweb' ) }
				value={ citeSummary }
				onChange={ ( value ) => updateKindMeta( 'cite_summary', value ) }
				rows={ 3 }
			/>
		</VStack>
	);
}

/**
 * RSVP Fields Component
 *
 * @return {JSX.Element} RSVP fields.
 */
function RSVPFields() {
	const { rsvpStatus, citeUrl, citeName } = useSelect( ( select ) => {
		const getKindMeta = select( STORE_NAME ).getKindMeta;
		return {
			rsvpStatus: getKindMeta( 'rsvp_status' ),
			citeUrl: getKindMeta( 'cite_url' ),
			citeName: getKindMeta( 'cite_name' ),
		};
	}, [] );

	const { updateKindMeta } = useDispatch( STORE_NAME );

	return (
		<VStack spacing={ 4 } className="reactions-indieweb-kind-fields">
			<TextControl
				label={ __( 'Event URL', 'reactions-for-indieweb' ) }
				value={ citeUrl }
				onChange={ ( value ) => updateKindMeta( 'cite_url', value ) }
				type="url"
				placeholder="https://"
			/>
			<TextControl
				label={ __( 'Event Name', 'reactions-for-indieweb' ) }
				value={ citeName }
				onChange={ ( value ) => updateKindMeta( 'cite_name', value ) }
			/>
			<SelectControl
				label={ __( 'RSVP Status', 'reactions-for-indieweb' ) }
				value={ rsvpStatus }
				onChange={ ( value ) => updateKindMeta( 'rsvp_status', value ) }
				options={ [
					{ label: __( 'Select status…', 'reactions-for-indieweb' ), value: '' },
					{ label: __( '✅ Yes, attending', 'reactions-for-indieweb' ), value: 'yes' },
					{ label: __( '❌ No, can\'t make it', 'reactions-for-indieweb' ), value: 'no' },
					{ label: __( '🤔 Maybe', 'reactions-for-indieweb' ), value: 'maybe' },
					{ label: __( '👀 Interested', 'reactions-for-indieweb' ), value: 'interested' },
				] }
			/>
		</VStack>
	);
}

/**
 * Checkin Fields Component
 *
 * @return {JSX.Element} Checkin fields.
 */
function CheckinFields() {
	const {
		checkinName,
		checkinAddress,
		checkinLocality,
		checkinRegion,
		checkinCountry,
		geoLatitude,
		geoLongitude,
	} = useSelect( ( select ) => {
		const getKindMeta = select( STORE_NAME ).getKindMeta;
		return {
			checkinName: getKindMeta( 'checkin_name' ),
			checkinAddress: getKindMeta( 'checkin_address' ),
			checkinLocality: getKindMeta( 'checkin_locality' ),
			checkinRegion: getKindMeta( 'checkin_region' ),
			checkinCountry: getKindMeta( 'checkin_country' ),
			geoLatitude: getKindMeta( 'geo_latitude' ),
			geoLongitude: getKindMeta( 'geo_longitude' ),
		};
	}, [] );

	const { updateKindMeta } = useDispatch( STORE_NAME );

	return (
		<VStack spacing={ 4 } className="reactions-indieweb-kind-fields">
			<TextControl
				label={ __( 'Venue Name', 'reactions-for-indieweb' ) }
				value={ checkinName }
				onChange={ ( value ) => updateKindMeta( 'checkin_name', value ) }
			/>
			<TextControl
				label={ __( 'Address', 'reactions-for-indieweb' ) }
				value={ checkinAddress }
				onChange={ ( value ) => updateKindMeta( 'checkin_address', value ) }
			/>
			<HStack>
				<TextControl
					label={ __( 'City', 'reactions-for-indieweb' ) }
					value={ checkinLocality }
					onChange={ ( value ) => updateKindMeta( 'checkin_locality', value ) }
				/>
				<TextControl
					label={ __( 'State/Region', 'reactions-for-indieweb' ) }
					value={ checkinRegion }
					onChange={ ( value ) => updateKindMeta( 'checkin_region', value ) }
				/>
			</HStack>
			<TextControl
				label={ __( 'Country', 'reactions-for-indieweb' ) }
				value={ checkinCountry }
				onChange={ ( value ) => updateKindMeta( 'checkin_country', value ) }
			/>
			<HStack>
				<TextControl
					label={ __( 'Latitude', 'reactions-for-indieweb' ) }
					value={ geoLatitude }
					onChange={ ( value ) => updateKindMeta( 'geo_latitude', parseFloat( value ) || 0 ) }
					type="number"
					step="0.0000001"
				/>
				<TextControl
					label={ __( 'Longitude', 'reactions-for-indieweb' ) }
					value={ geoLongitude }
					onChange={ ( value ) => updateKindMeta( 'geo_longitude', parseFloat( value ) || 0 ) }
					type="number"
					step="0.0000001"
				/>
			</HStack>
			<SyndicationControls kind="checkin" />
		</VStack>
	);
}

/**
 * Listen Fields Component
 *
 * @return {JSX.Element} Listen fields.
 */
function ListenFields() {
	const [ searchQuery, setSearchQuery ] = useState( '' );
	const [ urlInput, setUrlInput ] = useState( '' );
	const [ isUrlLoading, setIsUrlLoading ] = useState( false );
	const [ urlError, setUrlError ] = useState( '' );

	const {
		listenTrack,
		listenArtist,
		listenAlbum,
		listenCover,
		listenUrl,
		isLoading,
		apiResults,
	} = useSelect( ( select ) => {
		const getKindMeta = select( STORE_NAME ).getKindMeta;
		const store = select( STORE_NAME );
		return {
			listenTrack: getKindMeta( 'listen_track' ),
			listenArtist: getKindMeta( 'listen_artist' ),
			listenAlbum: getKindMeta( 'listen_album' ),
			listenCover: getKindMeta( 'listen_cover' ),
			listenUrl: getKindMeta( 'listen_url' ),
			isLoading: store.isApiLoading(),
			apiResults: store.getApiLookupType() === 'music' ? store.getApiResults() : [],
		};
	}, [] );

	const { updateKindMeta, performApiLookup, clearApiResults } = useDispatch( STORE_NAME );

	// Check if input looks like a URL.
	const isUrl = useCallback( ( input ) => {
		return /^https?:\/\//i.test( input.trim() );
	}, [] );

	// Handle URL lookup.
	const handleUrlLookup = useCallback( async () => {
		const url = urlInput.trim();
		if ( ! url ) {
			return;
		}

		setIsUrlLoading( true );
		setUrlError( '' );

		try {
			const result = await apiFetch( {
				path: `/reactions-indieweb/v1/lookup/music-url?url=${ encodeURIComponent( url ) }`,
			} );

			// Update metadata from result.
			if ( result.track ) {
				updateKindMeta( 'listen_track', result.track );
			}
			if ( result.artist ) {
				updateKindMeta( 'listen_artist', result.artist );
			}
			if ( result.album ) {
				updateKindMeta( 'listen_album', result.album );
			}
			if ( result.cover ) {
				updateKindMeta( 'listen_cover', result.cover );
			}
			// Store the URL for embedding.
			updateKindMeta( 'listen_url', result.url || url );

			setUrlInput( '' );
		} catch ( error ) {
			setUrlError( error.message || __( 'Could not fetch track info from URL.', 'reactions-for-indieweb' ) );
		} finally {
			setIsUrlLoading( false );
		}
	}, [ urlInput, updateKindMeta ] );

	const handleSearch = useCallback( () => {
		const query = searchQuery.trim();
		if ( ! query ) {
			return;
		}

		// If it looks like a URL, do URL lookup instead.
		if ( isUrl( query ) ) {
			setUrlInput( query );
			setSearchQuery( '' );
			handleUrlLookup();
			return;
		}

		performApiLookup( 'music', query );
	}, [ searchQuery, isUrl, performApiLookup, handleUrlLookup ] );

	const handleSelectResult = useCallback( ( result ) => {
		updateKindMeta( 'listen_track', result.track );
		updateKindMeta( 'listen_artist', result.artist );
		updateKindMeta( 'listen_album', result.album );
		updateKindMeta( 'listen_cover', result.cover );
		updateKindMeta( 'listen_mbid', result.mbid );
		clearApiResults();
		setSearchQuery( '' );
	}, [ updateKindMeta, clearApiResults ] );

	return (
		<VStack spacing={ 4 } className="reactions-indieweb-kind-fields">
			{ /* URL Input for Spotify, Apple Music, etc. */ }
			<BaseControl
				label={ __( 'Paste Music URL', 'reactions-for-indieweb' ) }
				help={ __( 'Spotify, Apple Music, YouTube, SoundCloud', 'reactions-for-indieweb' ) }
			>
				<HStack>
					<TextControl
						value={ urlInput }
						onChange={ setUrlInput }
						placeholder="https://open.spotify.com/track/..."
						onKeyDown={ ( e ) => e.key === 'Enter' && handleUrlLookup() }
					/>
					<Button
						icon={ linkIcon }
						onClick={ handleUrlLookup }
						disabled={ isUrlLoading || ! urlInput.trim() }
						label={ __( 'Fetch', 'reactions-for-indieweb' ) }
					/>
				</HStack>
				{ urlError && (
					<p style={ { color: '#d63638', fontSize: '12px', marginTop: '4px' } }>
						{ urlError }
					</p>
				) }
			</BaseControl>

			{ isUrlLoading && <Spinner /> }

			{ /* Saved URL display */ }
			{ listenUrl && (
				<div
					style={ {
						padding: '8px 12px',
						backgroundColor: '#f0f6fc',
						border: '1px solid #c3c4c7',
						borderRadius: '2px',
						fontSize: '12px',
						wordBreak: 'break-all',
					} }
				>
					<strong>{ __( 'Linked:', 'reactions-for-indieweb' ) }</strong>{ ' ' }
					<a href={ listenUrl } target="_blank" rel="noopener noreferrer">
						{ listenUrl }
					</a>
				</div>
			) }

			{ /* Or search by name */ }
			<BaseControl label={ __( 'Or Search by Name', 'reactions-for-indieweb' ) }>
				<HStack>
					<TextControl
						value={ searchQuery }
						onChange={ setSearchQuery }
						placeholder={ __( 'Track name or artist…', 'reactions-for-indieweb' ) }
						onKeyDown={ ( e ) => e.key === 'Enter' && handleSearch() }
					/>
					<Button
						icon={ searchIcon }
						onClick={ handleSearch }
						disabled={ isLoading }
						label={ __( 'Search', 'reactions-for-indieweb' ) }
					/>
				</HStack>
			</BaseControl>

			{ isLoading && <Spinner /> }

			{ apiResults.length > 0 && (
				<div className="reactions-indieweb-api-results">
					{ apiResults.slice( 0, 5 ).map( ( result, index ) => (
						<Button
							key={ index }
							className="reactions-indieweb-api-result"
							onClick={ () => handleSelectResult( result ) }
						>
							{ result.cover && (
								<img src={ result.cover } alt="" width="40" height="40" />
							) }
							<span>
								<strong>{ result.track }</strong>
								<br />
								{ result.artist } — { result.album }
							</span>
						</Button>
					) ) }
				</div>
			) }

			<TextControl
				label={ __( 'Track', 'reactions-for-indieweb' ) }
				value={ listenTrack }
				onChange={ ( value ) => updateKindMeta( 'listen_track', value ) }
			/>
			<TextControl
				label={ __( 'Artist', 'reactions-for-indieweb' ) }
				value={ listenArtist }
				onChange={ ( value ) => updateKindMeta( 'listen_artist', value ) }
			/>
			<TextControl
				label={ __( 'Album', 'reactions-for-indieweb' ) }
				value={ listenAlbum }
				onChange={ ( value ) => updateKindMeta( 'listen_album', value ) }
			/>
			<TextControl
				label={ __( 'Album Art URL', 'reactions-for-indieweb' ) }
				value={ listenCover }
				onChange={ ( value ) => updateKindMeta( 'listen_cover', value ) }
				type="url"
			/>
			<SyndicationControls kind="listen" />
		</VStack>
	);
}

/**
 * Watch Fields Component
 *
 * @return {JSX.Element} Watch fields.
 */
function WatchFields() {
	const [ searchQuery, setSearchQuery ] = useState( '' );
	const [ urlInput, setUrlInput ] = useState( '' );
	const [ isUrlLoading, setIsUrlLoading ] = useState( false );
	const [ urlError, setUrlError ] = useState( '' );

	const {
		watchTitle,
		watchYear,
		watchPoster,
		watchStatus,
		watchSpoilers,
		watchUrl,
		isLoading,
		apiResults,
	} = useSelect( ( select ) => {
		const getKindMeta = select( STORE_NAME ).getKindMeta;
		const store = select( STORE_NAME );
		return {
			watchTitle: getKindMeta( 'watch_title' ),
			watchYear: getKindMeta( 'watch_year' ),
			watchPoster: getKindMeta( 'watch_poster' ),
			watchStatus: getKindMeta( 'watch_status' ),
			watchSpoilers: getKindMeta( 'watch_spoilers' ),
			watchUrl: getKindMeta( 'watch_url' ),
			isLoading: store.isApiLoading(),
			apiResults: store.getApiLookupType() === 'movie' ? store.getApiResults() : [],
		};
	}, [] );

	const { updateKindMeta, performApiLookup, clearApiResults } = useDispatch( STORE_NAME );

	// Check if input looks like a URL.
	const isUrl = useCallback( ( input ) => {
		return /^https?:\/\//i.test( input.trim() );
	}, [] );

	// Handle URL lookup for IMDB, TMDB, Trakt, Letterboxd.
	const handleUrlLookup = useCallback( async () => {
		const url = urlInput.trim();
		if ( ! url ) {
			return;
		}

		setIsUrlLoading( true );
		setUrlError( '' );

		try {
			const result = await apiFetch( {
				path: `/reactions-indieweb/v1/lookup/watch-url?url=${ encodeURIComponent( url ) }`,
			} );

			// Update metadata from result.
			if ( result.title ) {
				updateKindMeta( 'watch_title', result.title );
			}
			if ( result.year ) {
				updateKindMeta( 'watch_year', result.year );
			}
			if ( result.poster ) {
				updateKindMeta( 'watch_poster', result.poster );
			}
			if ( result.tmdb_id ) {
				updateKindMeta( 'watch_tmdb_id', result.tmdb_id );
			}
			if ( result.imdb_id ) {
				updateKindMeta( 'watch_imdb_id', result.imdb_id );
			}
			if ( result.trakt_id ) {
				updateKindMeta( 'watch_trakt_id', result.trakt_id );
			}
			// Store the URL for reference.
			updateKindMeta( 'watch_url', url );

			setUrlInput( '' );
		} catch ( error ) {
			setUrlError( error.message || __( 'Could not fetch movie/TV info from URL.', 'reactions-for-indieweb' ) );
		} finally {
			setIsUrlLoading( false );
		}
	}, [ urlInput, updateKindMeta ] );

	const handleSearch = useCallback( () => {
		const query = searchQuery.trim();
		if ( ! query ) {
			return;
		}

		// If it looks like a URL, do URL lookup instead.
		if ( isUrl( query ) ) {
			setUrlInput( query );
			setSearchQuery( '' );
			handleUrlLookup();
			return;
		}

		performApiLookup( 'movie', query );
	}, [ searchQuery, isUrl, performApiLookup, handleUrlLookup ] );

	const handleSelectResult = useCallback( ( result ) => {
		updateKindMeta( 'watch_title', result.title );
		updateKindMeta( 'watch_year', result.year );
		updateKindMeta( 'watch_poster', result.poster );
		updateKindMeta( 'watch_tmdb_id', result.tmdb_id );
		clearApiResults();
		setSearchQuery( '' );
	}, [ updateKindMeta, clearApiResults ] );

	return (
		<VStack spacing={ 4 } className="reactions-indieweb-kind-fields">
			{ /* URL Input for IMDB, TMDB, Trakt, Letterboxd */ }
			<BaseControl
				label={ __( 'Paste Movie/TV URL', 'reactions-for-indieweb' ) }
				help={ __( 'IMDB, TMDB, Trakt, or Letterboxd', 'reactions-for-indieweb' ) }
			>
				<HStack>
					<TextControl
						value={ urlInput }
						onChange={ setUrlInput }
						placeholder="https://www.imdb.com/title/..."
						onKeyDown={ ( e ) => e.key === 'Enter' && handleUrlLookup() }
					/>
					<Button
						icon={ linkIcon }
						onClick={ handleUrlLookup }
						disabled={ isUrlLoading || ! urlInput.trim() }
						label={ __( 'Fetch', 'reactions-for-indieweb' ) }
					/>
				</HStack>
				{ urlError && (
					<p style={ { color: '#d63638', fontSize: '12px', marginTop: '4px' } }>
						{ urlError }
					</p>
				) }
			</BaseControl>

			{ isUrlLoading && <Spinner /> }

			{ /* Saved URL display */ }
			{ watchUrl && (
				<div
					style={ {
						padding: '8px 12px',
						backgroundColor: '#f0f6fc',
						border: '1px solid #c3c4c7',
						borderRadius: '2px',
						fontSize: '12px',
						wordBreak: 'break-all',
					} }
				>
					<strong>{ __( 'Linked:', 'reactions-for-indieweb' ) }</strong>{ ' ' }
					<a href={ watchUrl } target="_blank" rel="noopener noreferrer">
						{ watchUrl }
					</a>
				</div>
			) }

			{ /* Or search by title */ }
			<BaseControl label={ __( 'Or Search by Title', 'reactions-for-indieweb' ) }>
				<HStack>
					<TextControl
						value={ searchQuery }
						onChange={ setSearchQuery }
						placeholder={ __( 'Movie or TV show title…', 'reactions-for-indieweb' ) }
						onKeyDown={ ( e ) => e.key === 'Enter' && handleSearch() }
					/>
					<Button
						icon={ searchIcon }
						onClick={ handleSearch }
						disabled={ isLoading }
						label={ __( 'Search', 'reactions-for-indieweb' ) }
					/>
				</HStack>
			</BaseControl>

			{ isLoading && <Spinner /> }

			{ apiResults.length > 0 && (
				<div className="reactions-indieweb-api-results">
					{ apiResults.slice( 0, 5 ).map( ( result, index ) => (
						<Button
							key={ index }
							className="reactions-indieweb-api-result"
							onClick={ () => handleSelectResult( result ) }
						>
							{ result.poster && (
								<img src={ result.poster } alt="" width="30" height="45" />
							) }
							<span>
								<strong>{ result.title }</strong> ({ result.year })
							</span>
						</Button>
					) ) }
				</div>
			) }

			<TextControl
				label={ __( 'Title', 'reactions-for-indieweb' ) }
				value={ watchTitle }
				onChange={ ( value ) => updateKindMeta( 'watch_title', value ) }
			/>
			<TextControl
				label={ __( 'Year', 'reactions-for-indieweb' ) }
				value={ watchYear }
				onChange={ ( value ) => updateKindMeta( 'watch_year', value ) }
			/>
			<SelectControl
				label={ __( 'Status', 'reactions-for-indieweb' ) }
				value={ watchStatus }
				onChange={ ( value ) => updateKindMeta( 'watch_status', value ) }
				options={ [
					{ label: __( 'Watched', 'reactions-for-indieweb' ), value: 'watched' },
					{ label: __( 'Currently Watching', 'reactions-for-indieweb' ), value: 'watching' },
					{ label: __( 'Abandoned', 'reactions-for-indieweb' ), value: 'abandoned' },
				] }
			/>
			<ToggleControl
				label={ __( 'Contains spoilers', 'reactions-for-indieweb' ) }
				checked={ watchSpoilers }
				onChange={ ( value ) => updateKindMeta( 'watch_spoilers', value ) }
			/>
			<TextControl
				label={ __( 'Poster URL', 'reactions-for-indieweb' ) }
				value={ watchPoster }
				onChange={ ( value ) => updateKindMeta( 'watch_poster', value ) }
				type="url"
			/>
			<SyndicationControls kind="watch" />
		</VStack>
	);
}

/**
 * Read Fields Component
 *
 * @return {JSX.Element} Read fields.
 */
function ReadFields() {
	const [ searchQuery, setSearchQuery ] = useState( '' );

	const {
		readTitle,
		readAuthor,
		readIsbn,
		readCover,
		readStatus,
		readProgress,
		readPages,
		isLoading,
		apiResults,
	} = useSelect( ( select ) => {
		const getKindMeta = select( STORE_NAME ).getKindMeta;
		const store = select( STORE_NAME );
		return {
			readTitle: getKindMeta( 'read_title' ),
			readAuthor: getKindMeta( 'read_author' ),
			readIsbn: getKindMeta( 'read_isbn' ),
			readCover: getKindMeta( 'read_cover' ),
			readStatus: getKindMeta( 'read_status' ),
			readProgress: getKindMeta( 'read_progress' ),
			readPages: getKindMeta( 'read_pages' ),
			isLoading: store.isApiLoading(),
			apiResults: store.getApiLookupType() === 'book' ? store.getApiResults() : [],
		};
	}, [] );

	const { updateKindMeta, performApiLookup, clearApiResults } = useDispatch( STORE_NAME );

	const handleSearch = useCallback( () => {
		if ( searchQuery.trim() ) {
			performApiLookup( 'book', searchQuery );
		}
	}, [ searchQuery, performApiLookup ] );

	const handleSelectResult = useCallback( ( result ) => {
		updateKindMeta( 'read_title', result.title );
		updateKindMeta( 'read_author', result.author );
		updateKindMeta( 'read_isbn', result.isbn );
		updateKindMeta( 'read_cover', result.cover );
		updateKindMeta( 'read_pages', result.pages || 0 );
		clearApiResults();
		setSearchQuery( '' );
	}, [ updateKindMeta, clearApiResults ] );

	return (
		<VStack spacing={ 4 } className="reactions-indieweb-kind-fields">
			<BaseControl label={ __( 'Search Books', 'reactions-for-indieweb' ) }>
				<HStack>
					<TextControl
						value={ searchQuery }
						onChange={ setSearchQuery }
						placeholder={ __( 'Title or ISBN…', 'reactions-for-indieweb' ) }
						onKeyDown={ ( e ) => e.key === 'Enter' && handleSearch() }
					/>
					<Button
						icon={ searchIcon }
						onClick={ handleSearch }
						disabled={ isLoading }
						label={ __( 'Search', 'reactions-for-indieweb' ) }
					/>
				</HStack>
			</BaseControl>

			{ isLoading && <Spinner /> }

			{ apiResults.length > 0 && (
				<div className="reactions-indieweb-api-results">
					{ apiResults.slice( 0, 5 ).map( ( result, index ) => (
						<Button
							key={ index }
							className="reactions-indieweb-api-result"
							onClick={ () => handleSelectResult( result ) }
						>
							{ result.cover && (
								<img src={ result.cover } alt="" width="30" height="45" />
							) }
							<span>
								<strong>{ result.title }</strong>
								<br />
								{ result.author }
							</span>
						</Button>
					) ) }
				</div>
			) }

			<TextControl
				label={ __( 'Title', 'reactions-for-indieweb' ) }
				value={ readTitle }
				onChange={ ( value ) => updateKindMeta( 'read_title', value ) }
			/>
			<TextControl
				label={ __( 'Author', 'reactions-for-indieweb' ) }
				value={ readAuthor }
				onChange={ ( value ) => updateKindMeta( 'read_author', value ) }
			/>
			<TextControl
				label={ __( 'ISBN', 'reactions-for-indieweb' ) }
				value={ readIsbn }
				onChange={ ( value ) => updateKindMeta( 'read_isbn', value ) }
			/>
			<SelectControl
				label={ __( 'Status', 'reactions-for-indieweb' ) }
				value={ readStatus }
				onChange={ ( value ) => updateKindMeta( 'read_status', value ) }
				options={ [
					{ label: __( 'To Read', 'reactions-for-indieweb' ), value: 'to-read' },
					{ label: __( 'Currently Reading', 'reactions-for-indieweb' ), value: 'reading' },
					{ label: __( 'Finished', 'reactions-for-indieweb' ), value: 'finished' },
					{ label: __( 'Abandoned', 'reactions-for-indieweb' ), value: 'abandoned' },
				] }
			/>
			<HStack>
				<TextControl
					label={ __( 'Current Page', 'reactions-for-indieweb' ) }
					value={ readProgress }
					onChange={ ( value ) => updateKindMeta( 'read_progress', parseInt( value, 10 ) || 0 ) }
					type="number"
					min="0"
				/>
				<TextControl
					label={ __( 'Total Pages', 'reactions-for-indieweb' ) }
					value={ readPages }
					onChange={ ( value ) => updateKindMeta( 'read_pages', parseInt( value, 10 ) || 0 ) }
					type="number"
					min="0"
				/>
			</HStack>
			<TextControl
				label={ __( 'Cover URL', 'reactions-for-indieweb' ) }
				value={ readCover }
				onChange={ ( value ) => updateKindMeta( 'read_cover', value ) }
				type="url"
			/>
		</VStack>
	);
}

/**
 * Event Fields Component
 *
 * @return {JSX.Element} Event fields.
 */
function EventFields() {
	const { eventStart, eventEnd, eventLocation, eventUrl } = useSelect( ( select ) => {
		const getKindMeta = select( STORE_NAME ).getKindMeta;
		return {
			eventStart: getKindMeta( 'event_start' ),
			eventEnd: getKindMeta( 'event_end' ),
			eventLocation: getKindMeta( 'event_location' ),
			eventUrl: getKindMeta( 'event_url' ),
		};
	}, [] );

	const { updateKindMeta } = useDispatch( STORE_NAME );

	return (
		<VStack spacing={ 4 } className="reactions-indieweb-kind-fields">
			<TextControl
				label={ __( 'Start Date/Time', 'reactions-for-indieweb' ) }
				value={ eventStart }
				onChange={ ( value ) => updateKindMeta( 'event_start', value ) }
				type="datetime-local"
			/>
			<TextControl
				label={ __( 'End Date/Time', 'reactions-for-indieweb' ) }
				value={ eventEnd }
				onChange={ ( value ) => updateKindMeta( 'event_end', value ) }
				type="datetime-local"
			/>
			<TextControl
				label={ __( 'Location', 'reactions-for-indieweb' ) }
				value={ eventLocation }
				onChange={ ( value ) => updateKindMeta( 'event_location', value ) }
			/>
			<TextControl
				label={ __( 'Event URL', 'reactions-for-indieweb' ) }
				value={ eventUrl }
				onChange={ ( value ) => updateKindMeta( 'event_url', value ) }
				type="url"
				placeholder="https://"
			/>
		</VStack>
	);
}

/**
 * Review Fields Component
 *
 * @return {JSX.Element} Review fields.
 */
function ReviewFields() {
	const { reviewRating, reviewBest, reviewItemName, reviewItemUrl } = useSelect( ( select ) => {
		const getKindMeta = select( STORE_NAME ).getKindMeta;
		return {
			reviewRating: getKindMeta( 'review_rating' ),
			reviewBest: getKindMeta( 'review_best' ) || 5,
			reviewItemName: getKindMeta( 'review_item_name' ),
			reviewItemUrl: getKindMeta( 'review_item_url' ),
		};
	}, [] );

	const { updateKindMeta } = useDispatch( STORE_NAME );

	// Generate star display.
	const rating = parseFloat( reviewRating ) || 0;
	const best = parseInt( reviewBest, 10 ) || 5;
	const stars = [];
	for ( let i = 1; i <= best; i++ ) {
		if ( i <= rating ) {
			stars.push( '★' );
		} else if ( i - 0.5 === rating ) {
			stars.push( '½' );
		} else {
			stars.push( '☆' );
		}
	}

	return (
		<VStack spacing={ 4 } className="reactions-indieweb-kind-fields">
			<TextControl
				label={ __( 'Item Name', 'reactions-for-indieweb' ) }
				value={ reviewItemName }
				onChange={ ( value ) => updateKindMeta( 'review_item_name', value ) }
			/>
			<TextControl
				label={ __( 'Item URL', 'reactions-for-indieweb' ) }
				value={ reviewItemUrl }
				onChange={ ( value ) => updateKindMeta( 'review_item_url', value ) }
				type="url"
				placeholder="https://"
			/>
			<BaseControl label={ __( 'Rating', 'reactions-for-indieweb' ) }>
				<div className="reactions-indieweb-star-rating">
					<span className="reactions-indieweb-stars" aria-hidden="true">
						{ stars.join( '' ) }
					</span>
					<RangeControl
						value={ rating }
						onChange={ ( value ) => updateKindMeta( 'review_rating', value ) }
						min={ 0 }
						max={ best }
						step={ 0.5 }
						withInputField={ true }
					/>
				</div>
			</BaseControl>
			<TextControl
				label={ __( 'Maximum Rating', 'reactions-for-indieweb' ) }
				value={ reviewBest }
				onChange={ ( value ) => updateKindMeta( 'review_best', parseInt( value, 10 ) || 5 ) }
				type="number"
				min="1"
				max="10"
			/>

			<style>{ `
				.reactions-indieweb-star-rating .reactions-indieweb-stars {
					font-size: 24px;
					color: #f5a623;
					margin-bottom: 8px;
					display: block;
				}

				.reactions-indieweb-api-results {
					display: flex;
					flex-direction: column;
					gap: 4px;
					max-height: 200px;
					overflow-y: auto;
					border: 1px solid #ddd;
					border-radius: 4px;
					padding: 4px;
				}

				.reactions-indieweb-api-result {
					display: flex;
					align-items: center;
					gap: 8px;
					padding: 8px;
					text-align: left;
					width: 100%;
					justify-content: flex-start;
				}

				.reactions-indieweb-api-result img {
					flex-shrink: 0;
					object-fit: cover;
				}

				.reactions-indieweb-api-result span {
					overflow: hidden;
					text-overflow: ellipsis;
				}
			` }</style>
		</VStack>
	);
}

/**
 * Play Fields Component
 *
 * Fields for game logging with BGG/RAWG lookup.
 *
 * @return {JSX.Element} Play fields.
 */
function PlayFields() {
	const [ searchQuery, setSearchQuery ] = useState( '' );
	const [ searchSource, setSearchSource ] = useState( 'bgg' );
	const [ gameType, setGameType ] = useState( 'boardgame' );
	const [ isSearching, setIsSearching ] = useState( false );
	const [ searchResults, setSearchResults ] = useState( [] );
	const [ searchError, setSearchError ] = useState( '' );

	const {
		playTitle,
		playPlatform,
		playStatus,
		playHours,
		playCover,
		playRating,
		playBggId,
		playRawgId,
		playSteamId,
	} = useSelect( ( select ) => {
		const getKindMeta = select( STORE_NAME ).getKindMeta;
		return {
			playTitle: getKindMeta( 'play_title' ),
			playPlatform: getKindMeta( 'play_platform' ),
			playStatus: getKindMeta( 'play_status' ),
			playHours: getKindMeta( 'play_hours' ),
			playCover: getKindMeta( 'play_cover' ),
			playRating: getKindMeta( 'play_rating' ),
			playBggId: getKindMeta( 'play_bgg_id' ),
			playRawgId: getKindMeta( 'play_rawg_id' ),
			playSteamId: getKindMeta( 'play_steam_id' ),
		};
	}, [] );

	const { updateKindMeta } = useDispatch( STORE_NAME );

	const handleSearch = useCallback( async () => {
		const query = searchQuery.trim();
		if ( ! query ) {
			return;
		}

		setIsSearching( true );
		setSearchError( '' );
		setSearchResults( [] );

		try {
			const params = new URLSearchParams( {
				q: query,
				source: searchSource,
			} );

			if ( searchSource === 'bgg' ) {
				params.set( 'type', gameType );
			}

			const results = await apiFetch( {
				path: `/reactions-indieweb/v1/lookup/game?${ params.toString() }`,
			} );

			setSearchResults( results || [] );
		} catch ( error ) {
			setSearchError( error.message || __( 'Search failed.', 'reactions-for-indieweb' ) );
		} finally {
			setIsSearching( false );
		}
	}, [ searchQuery, searchSource, gameType ] );

	const handleSelectResult = useCallback( async ( result ) => {
		// For BGG, fetch full details.
		if ( result.source === 'bgg' && result.id ) {
			setIsSearching( true );
			try {
				const details = await apiFetch( {
					path: `/reactions-indieweb/v1/lookup/game?source=bgg&id=${ result.id }`,
				} );

				updateKindMeta( 'play_title', details.title || result.title );
				updateKindMeta( 'play_cover', details.cover || '' );
				updateKindMeta( 'play_bgg_id', String( details.id || result.id ) );
				updateKindMeta( 'play_rawg_id', '' );
			} catch {
				// Fallback to search result data.
				updateKindMeta( 'play_title', result.title );
				updateKindMeta( 'play_bgg_id', String( result.id ) );
				updateKindMeta( 'play_rawg_id', '' );
			} finally {
				setIsSearching( false );
			}
		} else {
			// RAWG result.
			updateKindMeta( 'play_title', result.name || result.title );
			updateKindMeta( 'play_cover', result.cover || '' );
			updateKindMeta( 'play_rawg_id', String( result.id ) );
			updateKindMeta( 'play_bgg_id', '' );

			// Set platform from first platform if available.
			if ( result.platforms && result.platforms.length > 0 ) {
				updateKindMeta( 'play_platform', result.platforms[ 0 ] );
			}
		}

		setSearchResults( [] );
		setSearchQuery( '' );
	}, [ updateKindMeta ] );

	const platformOptions = [
		{ label: __( 'Select Platform', 'reactions-for-indieweb' ), value: '' },
		{ label: 'PC', value: 'PC' },
		{ label: 'PlayStation 5', value: 'PlayStation 5' },
		{ label: 'PlayStation 4', value: 'PlayStation 4' },
		{ label: 'Xbox Series X/S', value: 'Xbox Series X/S' },
		{ label: 'Xbox One', value: 'Xbox One' },
		{ label: 'Nintendo Switch', value: 'Nintendo Switch' },
		{ label: 'iOS', value: 'iOS' },
		{ label: 'Android', value: 'Android' },
		{ label: 'macOS', value: 'macOS' },
		{ label: 'Board Game', value: 'Board Game' },
		{ label: 'Card Game', value: 'Card Game' },
		{ label: 'Tabletop RPG', value: 'Tabletop RPG' },
		{ label: __( 'Other', 'reactions-for-indieweb' ), value: 'Other' },
	];

	const statusOptions = [
		{ label: __( 'Playing', 'reactions-for-indieweb' ), value: 'playing' },
		{ label: __( 'Completed', 'reactions-for-indieweb' ), value: 'completed' },
		{ label: __( 'Abandoned', 'reactions-for-indieweb' ), value: 'abandoned' },
		{ label: __( 'Backlog', 'reactions-for-indieweb' ), value: 'backlog' },
	];

	const sourceOptions = [
		{ label: __( 'BGG: Board Games', 'reactions-for-indieweb' ), value: 'bgg-board' },
		{ label: __( 'BGG: Video Games', 'reactions-for-indieweb' ), value: 'bgg-video' },
		{ label: __( 'RAWG: Video Games', 'reactions-for-indieweb' ), value: 'rawg' },
	];

	const handleSourceChange = ( value ) => {
		if ( value === 'bgg-board' ) {
			setSearchSource( 'bgg' );
			setGameType( 'boardgame' );
		} else if ( value === 'bgg-video' ) {
			setSearchSource( 'bgg' );
			setGameType( 'videogame' );
		} else {
			setSearchSource( 'rawg' );
			setGameType( 'videogame' );
		}
	};

	const getCurrentSourceValue = () => {
		if ( searchSource === 'rawg' ) {
			return 'rawg';
		}
		return gameType === 'videogame' ? 'bgg-video' : 'bgg-board';
	};

	return (
		<VStack spacing={ 4 } className="reactions-indieweb-kind-fields">
			{ /* Search Section */ }
			<BaseControl label={ __( 'Search for Game', 'reactions-for-indieweb' ) }>
				<VStack spacing={ 2 }>
					<SelectControl
						value={ getCurrentSourceValue() }
						options={ sourceOptions }
						onChange={ handleSourceChange }
						__nextHasNoMarginBottom
					/>
					<HStack>
						<TextControl
							value={ searchQuery }
							onChange={ setSearchQuery }
							placeholder={ __( 'Game title...', 'reactions-for-indieweb' ) }
							onKeyDown={ ( e ) => e.key === 'Enter' && handleSearch() }
						/>
						<Button
							icon={ searchIcon }
							onClick={ handleSearch }
							disabled={ isSearching }
							label={ __( 'Search', 'reactions-for-indieweb' ) }
						/>
					</HStack>
				</VStack>
			</BaseControl>

			{ isSearching && <Spinner /> }

			{ searchError && (
				<p style={ { color: '#d63638', fontSize: '12px' } }>{ searchError }</p>
			) }

			{ searchResults.length > 0 && (
				<div className="reactions-indieweb-api-results">
					{ searchResults.slice( 0, 8 ).map( ( result, index ) => (
						<Button
							key={ index }
							className="reactions-indieweb-api-result"
							onClick={ () => handleSelectResult( result ) }
						>
							{ result.cover && (
								<img src={ result.cover } alt="" width="40" height="40" />
							) }
							<span>
								<strong>{ result.name || result.title }</strong>
								{ result.year && <> ({ result.year })</> }
								{ result.platforms && result.platforms.length > 0 && (
									<>
										<br />
										<small>{ result.platforms.slice( 0, 3 ).join( ', ' ) }</small>
									</>
								) }
							</span>
						</Button>
					) ) }
				</div>
			) }

			{ /* Cover Preview */ }
			{ playCover && (
				<div style={ { textAlign: 'center' } }>
					<img
						src={ playCover }
						alt={ playTitle }
						style={ { maxWidth: '150px', maxHeight: '200px', borderRadius: '4px' } }
					/>
				</div>
			) }

			{ /* Game Details */ }
			<TextControl
				label={ __( 'Game Title', 'reactions-for-indieweb' ) }
				value={ playTitle }
				onChange={ ( value ) => updateKindMeta( 'play_title', value ) }
			/>

			<SelectControl
				label={ __( 'Platform', 'reactions-for-indieweb' ) }
				value={ playPlatform }
				options={ platformOptions }
				onChange={ ( value ) => updateKindMeta( 'play_platform', value ) }
			/>

			<SelectControl
				label={ __( 'Status', 'reactions-for-indieweb' ) }
				value={ playStatus || 'playing' }
				options={ statusOptions }
				onChange={ ( value ) => updateKindMeta( 'play_status', value ) }
			/>

			<TextControl
				label={ __( 'Hours Played', 'reactions-for-indieweb' ) }
				type="number"
				min="0"
				step="0.5"
				value={ playHours || '' }
				onChange={ ( value ) => updateKindMeta( 'play_hours', parseFloat( value ) || 0 ) }
			/>

			<RangeControl
				label={ __( 'Rating', 'reactions-for-indieweb' ) }
				value={ playRating || 0 }
				onChange={ ( value ) => updateKindMeta( 'play_rating', value ) }
				min={ 0 }
				max={ 5 }
				step={ 0.5 }
				withInputField
				renderTooltipContent={ ( value ) => `${ value } / 5` }
			/>

			<TextControl
				label={ __( 'Cover Image URL', 'reactions-for-indieweb' ) }
				type="url"
				value={ playCover }
				onChange={ ( value ) => updateKindMeta( 'play_cover', value ) }
				placeholder="https://"
			/>

			{ /* ID Fields (collapsible/advanced) */ }
			<details style={ { fontSize: '12px' } }>
				<summary style={ { cursor: 'pointer', marginBottom: '8px' } }>
					{ __( 'Advanced: Game IDs', 'reactions-for-indieweb' ) }
				</summary>
				<VStack spacing={ 2 }>
					<TextControl
						label={ __( 'BoardGameGeek ID', 'reactions-for-indieweb' ) }
						value={ playBggId }
						onChange={ ( value ) => updateKindMeta( 'play_bgg_id', value ) }
					/>
					<TextControl
						label={ __( 'RAWG ID', 'reactions-for-indieweb' ) }
						value={ playRawgId }
						onChange={ ( value ) => updateKindMeta( 'play_rawg_id', value ) }
					/>
					<TextControl
						label={ __( 'Steam App ID', 'reactions-for-indieweb' ) }
						value={ playSteamId }
						onChange={ ( value ) => updateKindMeta( 'play_steam_id', value ) }
					/>
				</VStack>
			</details>
		</VStack>
	);
}

/**
 * Eat Fields Component
 *
 * Fields for food/meal logging.
 *
 * @return {JSX.Element} Eat fields.
 */
function EatFields() {
	const { eatName, eatType, eatRestaurant, eatPhoto, eatRating } = useSelect( ( select ) => {
		const getKindMeta = select( STORE_NAME ).getKindMeta;
		return {
			eatName: getKindMeta( 'eat_name' ),
			eatType: getKindMeta( 'eat_type' ),
			eatRestaurant: getKindMeta( 'eat_restaurant' ),
			eatPhoto: getKindMeta( 'eat_photo' ),
			eatRating: getKindMeta( 'eat_rating' ),
		};
	}, [] );

	const { updateKindMeta } = useDispatch( STORE_NAME );

	const typeOptions = [
		{ label: __( 'Select type...', 'reactions-for-indieweb' ), value: '' },
		{ label: __( 'Breakfast', 'reactions-for-indieweb' ), value: 'breakfast' },
		{ label: __( 'Lunch', 'reactions-for-indieweb' ), value: 'lunch' },
		{ label: __( 'Dinner', 'reactions-for-indieweb' ), value: 'dinner' },
		{ label: __( 'Snack', 'reactions-for-indieweb' ), value: 'snack' },
		{ label: __( 'Dessert', 'reactions-for-indieweb' ), value: 'dessert' },
	];

	return (
		<VStack spacing={ 4 } className="reactions-indieweb-kind-fields">
			<TextControl
				label={ __( 'Food/Meal', 'reactions-for-indieweb' ) }
				value={ eatName }
				onChange={ ( value ) => updateKindMeta( 'eat_name', value ) }
				placeholder={ __( 'What did you eat?', 'reactions-for-indieweb' ) }
			/>
			<SelectControl
				label={ __( 'Meal Type', 'reactions-for-indieweb' ) }
				value={ eatType }
				options={ typeOptions }
				onChange={ ( value ) => updateKindMeta( 'eat_type', value ) }
			/>
			<TextControl
				label={ __( 'Restaurant/Location', 'reactions-for-indieweb' ) }
				value={ eatRestaurant }
				onChange={ ( value ) => updateKindMeta( 'eat_restaurant', value ) }
			/>
			<RangeControl
				label={ __( 'Rating', 'reactions-for-indieweb' ) }
				value={ eatRating || 0 }
				onChange={ ( value ) => updateKindMeta( 'eat_rating', value ) }
				min={ 0 }
				max={ 5 }
				step={ 0.5 }
				withInputField
			/>
			<TextControl
				label={ __( 'Photo URL', 'reactions-for-indieweb' ) }
				type="url"
				value={ eatPhoto }
				onChange={ ( value ) => updateKindMeta( 'eat_photo', value ) }
				placeholder="https://"
			/>
		</VStack>
	);
}

/**
 * Drink Fields Component
 *
 * Fields for beverage logging.
 *
 * @return {JSX.Element} Drink fields.
 */
function DrinkFields() {
	const { drinkName, drinkType, drinkBrewery, drinkPhoto, drinkRating } = useSelect( ( select ) => {
		const getKindMeta = select( STORE_NAME ).getKindMeta;
		return {
			drinkName: getKindMeta( 'drink_name' ),
			drinkType: getKindMeta( 'drink_type' ),
			drinkBrewery: getKindMeta( 'drink_brewery' ),
			drinkPhoto: getKindMeta( 'drink_photo' ),
			drinkRating: getKindMeta( 'drink_rating' ),
		};
	}, [] );

	const { updateKindMeta } = useDispatch( STORE_NAME );

	const typeOptions = [
		{ label: __( 'Select type...', 'reactions-for-indieweb' ), value: '' },
		{ label: __( 'Coffee', 'reactions-for-indieweb' ), value: 'coffee' },
		{ label: __( 'Tea', 'reactions-for-indieweb' ), value: 'tea' },
		{ label: __( 'Beer', 'reactions-for-indieweb' ), value: 'beer' },
		{ label: __( 'Wine', 'reactions-for-indieweb' ), value: 'wine' },
		{ label: __( 'Cocktail', 'reactions-for-indieweb' ), value: 'cocktail' },
		{ label: __( 'Spirit', 'reactions-for-indieweb' ), value: 'spirit' },
		{ label: __( 'Soda', 'reactions-for-indieweb' ), value: 'soda' },
		{ label: __( 'Juice', 'reactions-for-indieweb' ), value: 'juice' },
		{ label: __( 'Water', 'reactions-for-indieweb' ), value: 'water' },
		{ label: __( 'Other', 'reactions-for-indieweb' ), value: 'other' },
	];

	return (
		<VStack spacing={ 4 } className="reactions-indieweb-kind-fields">
			<TextControl
				label={ __( 'Drink Name', 'reactions-for-indieweb' ) }
				value={ drinkName }
				onChange={ ( value ) => updateKindMeta( 'drink_name', value ) }
				placeholder={ __( 'What are you drinking?', 'reactions-for-indieweb' ) }
			/>
			<SelectControl
				label={ __( 'Type', 'reactions-for-indieweb' ) }
				value={ drinkType }
				options={ typeOptions }
				onChange={ ( value ) => updateKindMeta( 'drink_type', value ) }
			/>
			<TextControl
				label={ __( 'Brewery/Brand', 'reactions-for-indieweb' ) }
				value={ drinkBrewery }
				onChange={ ( value ) => updateKindMeta( 'drink_brewery', value ) }
			/>
			<RangeControl
				label={ __( 'Rating', 'reactions-for-indieweb' ) }
				value={ drinkRating || 0 }
				onChange={ ( value ) => updateKindMeta( 'drink_rating', value ) }
				min={ 0 }
				max={ 5 }
				step={ 0.5 }
				withInputField
			/>
			<TextControl
				label={ __( 'Photo URL', 'reactions-for-indieweb' ) }
				type="url"
				value={ drinkPhoto }
				onChange={ ( value ) => updateKindMeta( 'drink_photo', value ) }
				placeholder="https://"
			/>
		</VStack>
	);
}

/**
 * Favorite Fields Component
 *
 * Fields for starring/saving items.
 *
 * @return {JSX.Element} Favorite fields.
 */
function FavoriteFields() {
	const { favoriteName, favoriteUrl, favoriteRating } = useSelect( ( select ) => {
		const getKindMeta = select( STORE_NAME ).getKindMeta;
		return {
			favoriteName: getKindMeta( 'favorite_name' ),
			favoriteUrl: getKindMeta( 'favorite_url' ),
			favoriteRating: getKindMeta( 'favorite_rating' ),
		};
	}, [] );

	const { updateKindMeta } = useDispatch( STORE_NAME );

	return (
		<VStack spacing={ 4 } className="reactions-indieweb-kind-fields">
			<TextControl
				label={ __( 'Name/Title', 'reactions-for-indieweb' ) }
				value={ favoriteName }
				onChange={ ( value ) => updateKindMeta( 'favorite_name', value ) }
			/>
			<TextControl
				label={ __( 'URL', 'reactions-for-indieweb' ) }
				type="url"
				value={ favoriteUrl }
				onChange={ ( value ) => updateKindMeta( 'favorite_url', value ) }
				placeholder="https://"
			/>
			<RangeControl
				label={ __( 'Rating', 'reactions-for-indieweb' ) }
				value={ favoriteRating || 0 }
				onChange={ ( value ) => updateKindMeta( 'favorite_rating', value ) }
				min={ 0 }
				max={ 5 }
				step={ 0.5 }
				withInputField
			/>
		</VStack>
	);
}

/**
 * Jam Fields Component
 *
 * Fields for "this is my jam" music highlights.
 *
 * @return {JSX.Element} Jam fields.
 */
function JamFields() {
	const { jamTrack, jamArtist, jamAlbum, jamUrl, jamCover } = useSelect( ( select ) => {
		const getKindMeta = select( STORE_NAME ).getKindMeta;
		return {
			jamTrack: getKindMeta( 'jam_track' ),
			jamArtist: getKindMeta( 'jam_artist' ),
			jamAlbum: getKindMeta( 'jam_album' ),
			jamUrl: getKindMeta( 'jam_url' ),
			jamCover: getKindMeta( 'jam_cover' ),
		};
	}, [] );

	const { updateKindMeta } = useDispatch( STORE_NAME );

	return (
		<VStack spacing={ 4 } className="reactions-indieweb-kind-fields">
			{ jamCover && (
				<div style={ { textAlign: 'center' } }>
					<img
						src={ jamCover }
						alt={ jamTrack }
						style={ { maxWidth: '120px', borderRadius: '4px' } }
					/>
				</div>
			) }
			<TextControl
				label={ __( 'Track', 'reactions-for-indieweb' ) }
				value={ jamTrack }
				onChange={ ( value ) => updateKindMeta( 'jam_track', value ) }
			/>
			<TextControl
				label={ __( 'Artist', 'reactions-for-indieweb' ) }
				value={ jamArtist }
				onChange={ ( value ) => updateKindMeta( 'jam_artist', value ) }
			/>
			<TextControl
				label={ __( 'Album', 'reactions-for-indieweb' ) }
				value={ jamAlbum }
				onChange={ ( value ) => updateKindMeta( 'jam_album', value ) }
			/>
			<TextControl
				label={ __( 'Link', 'reactions-for-indieweb' ) }
				type="url"
				value={ jamUrl }
				onChange={ ( value ) => updateKindMeta( 'jam_url', value ) }
				placeholder="https://open.spotify.com/..."
			/>
			<TextControl
				label={ __( 'Cover Image URL', 'reactions-for-indieweb' ) }
				type="url"
				value={ jamCover }
				onChange={ ( value ) => updateKindMeta( 'jam_cover', value ) }
				placeholder="https://"
			/>
		</VStack>
	);
}

/**
 * Wish Fields Component
 *
 * Fields for wishlist items.
 *
 * @return {JSX.Element} Wish fields.
 */
function WishFields() {
	const { wishName, wishUrl, wishType, wishPriority, wishPhoto } = useSelect( ( select ) => {
		const getKindMeta = select( STORE_NAME ).getKindMeta;
		return {
			wishName: getKindMeta( 'wish_name' ),
			wishUrl: getKindMeta( 'wish_url' ),
			wishType: getKindMeta( 'wish_type' ),
			wishPriority: getKindMeta( 'wish_priority' ),
			wishPhoto: getKindMeta( 'wish_photo' ),
		};
	}, [] );

	const { updateKindMeta } = useDispatch( STORE_NAME );

	const typeOptions = [
		{ label: __( 'Select type...', 'reactions-for-indieweb' ), value: '' },
		{ label: __( 'Book', 'reactions-for-indieweb' ), value: 'book' },
		{ label: __( 'Movie/Show', 'reactions-for-indieweb' ), value: 'movie' },
		{ label: __( 'Game', 'reactions-for-indieweb' ), value: 'game' },
		{ label: __( 'Music', 'reactions-for-indieweb' ), value: 'music' },
		{ label: __( 'Product', 'reactions-for-indieweb' ), value: 'product' },
		{ label: __( 'Experience', 'reactions-for-indieweb' ), value: 'experience' },
		{ label: __( 'Other', 'reactions-for-indieweb' ), value: 'other' },
	];

	const priorityOptions = [
		{ label: __( 'Low', 'reactions-for-indieweb' ), value: 'low' },
		{ label: __( 'Medium', 'reactions-for-indieweb' ), value: 'medium' },
		{ label: __( 'High', 'reactions-for-indieweb' ), value: 'high' },
	];

	return (
		<VStack spacing={ 4 } className="reactions-indieweb-kind-fields">
			<TextControl
				label={ __( 'Item Name', 'reactions-for-indieweb' ) }
				value={ wishName }
				onChange={ ( value ) => updateKindMeta( 'wish_name', value ) }
				placeholder={ __( 'What do you wish for?', 'reactions-for-indieweb' ) }
			/>
			<TextControl
				label={ __( 'URL', 'reactions-for-indieweb' ) }
				type="url"
				value={ wishUrl }
				onChange={ ( value ) => updateKindMeta( 'wish_url', value ) }
				placeholder="https://"
			/>
			<SelectControl
				label={ __( 'Type', 'reactions-for-indieweb' ) }
				value={ wishType }
				options={ typeOptions }
				onChange={ ( value ) => updateKindMeta( 'wish_type', value ) }
			/>
			<SelectControl
				label={ __( 'Priority', 'reactions-for-indieweb' ) }
				value={ wishPriority || 'medium' }
				options={ priorityOptions }
				onChange={ ( value ) => updateKindMeta( 'wish_priority', value ) }
			/>
			<TextControl
				label={ __( 'Photo URL', 'reactions-for-indieweb' ) }
				type="url"
				value={ wishPhoto }
				onChange={ ( value ) => updateKindMeta( 'wish_photo', value ) }
				placeholder="https://"
			/>
		</VStack>
	);
}

/**
 * Mood Fields Component
 *
 * Fields for emotional state logging.
 *
 * @return {JSX.Element} Mood fields.
 */
function MoodFields() {
	const { moodEmoji, moodLabel, moodRating } = useSelect( ( select ) => {
		const getKindMeta = select( STORE_NAME ).getKindMeta;
		return {
			moodEmoji: getKindMeta( 'mood_emoji' ),
			moodLabel: getKindMeta( 'mood_label' ),
			moodRating: getKindMeta( 'mood_rating' ),
		};
	}, [] );

	const { updateKindMeta } = useDispatch( STORE_NAME );

	const ratingOptions = [
		{ label: __( 'Select level...', 'reactions-for-indieweb' ), value: '' },
		{ label: '1 - ' + __( 'Low', 'reactions-for-indieweb' ), value: '1' },
		{ label: '2', value: '2' },
		{ label: '3 - ' + __( 'Neutral', 'reactions-for-indieweb' ), value: '3' },
		{ label: '4', value: '4' },
		{ label: '5 - ' + __( 'High', 'reactions-for-indieweb' ), value: '5' },
	];

	return (
		<VStack spacing={ 4 } className="reactions-indieweb-kind-fields">
			{ moodEmoji && (
				<div style={ { fontSize: '48px', textAlign: 'center' } }>{ moodEmoji }</div>
			) }
			<TextControl
				label={ __( 'Mood Emoji', 'reactions-for-indieweb' ) }
				value={ moodEmoji }
				onChange={ ( value ) => updateKindMeta( 'mood_emoji', value ) }
				placeholder="😊"
				maxLength={ 10 }
			/>
			<TextControl
				label={ __( 'Mood Label', 'reactions-for-indieweb' ) }
				value={ moodLabel }
				onChange={ ( value ) => updateKindMeta( 'mood_label', value ) }
				placeholder={ __( 'How are you feeling?', 'reactions-for-indieweb' ) }
			/>
			<SelectControl
				label={ __( 'Level (1-5)', 'reactions-for-indieweb' ) }
				value={ moodRating ? String( moodRating ) : '' }
				options={ ratingOptions }
				onChange={ ( value ) => updateKindMeta( 'mood_rating', parseInt( value ) || 0 ) }
			/>
		</VStack>
	);
}

/**
 * Acquisition Fields Component
 *
 * Fields for items acquired/purchased.
 *
 * @return {JSX.Element} Acquisition fields.
 */
function AcquisitionFields() {
	const { acquisitionName, acquisitionUrl, acquisitionPrice, acquisitionPhoto, acquisitionRating } = useSelect( ( select ) => {
		const getKindMeta = select( STORE_NAME ).getKindMeta;
		return {
			acquisitionName: getKindMeta( 'acquisition_name' ),
			acquisitionUrl: getKindMeta( 'acquisition_url' ),
			acquisitionPrice: getKindMeta( 'acquisition_price' ),
			acquisitionPhoto: getKindMeta( 'acquisition_photo' ),
			acquisitionRating: getKindMeta( 'acquisition_rating' ),
		};
	}, [] );

	const { updateKindMeta } = useDispatch( STORE_NAME );

	return (
		<VStack spacing={ 4 } className="reactions-indieweb-kind-fields">
			{ acquisitionPhoto && (
				<div style={ { textAlign: 'center' } }>
					<img
						src={ acquisitionPhoto }
						alt={ acquisitionName }
						style={ { maxWidth: '150px', borderRadius: '4px' } }
					/>
				</div>
			) }
			<TextControl
				label={ __( 'Item Name', 'reactions-for-indieweb' ) }
				value={ acquisitionName }
				onChange={ ( value ) => updateKindMeta( 'acquisition_name', value ) }
				placeholder={ __( 'What did you get?', 'reactions-for-indieweb' ) }
			/>
			<TextControl
				label={ __( 'URL', 'reactions-for-indieweb' ) }
				type="url"
				value={ acquisitionUrl }
				onChange={ ( value ) => updateKindMeta( 'acquisition_url', value ) }
				placeholder="https://"
			/>
			<TextControl
				label={ __( 'Price', 'reactions-for-indieweb' ) }
				value={ acquisitionPrice }
				onChange={ ( value ) => updateKindMeta( 'acquisition_price', value ) }
				placeholder="$0.00"
			/>
			<RangeControl
				label={ __( 'Rating', 'reactions-for-indieweb' ) }
				value={ acquisitionRating || 0 }
				onChange={ ( value ) => updateKindMeta( 'acquisition_rating', value ) }
				min={ 0 }
				max={ 5 }
				step={ 0.5 }
				withInputField
			/>
			<TextControl
				label={ __( 'Photo URL', 'reactions-for-indieweb' ) }
				type="url"
				value={ acquisitionPhoto }
				onChange={ ( value ) => updateKindMeta( 'acquisition_photo', value ) }
				placeholder="https://"
			/>
		</VStack>
	);
}

/**
 * Recipe Fields Component
 *
 * Fields for recipe posts (integrates with WP Recipe Maker).
 *
 * @return {JSX.Element} Recipe fields.
 */
function RecipeFields() {
	const { recipeName, recipeYield, recipeDuration, recipeUrl } = useSelect( ( select ) => {
		const getKindMeta = select( STORE_NAME ).getKindMeta;
		return {
			recipeName: getKindMeta( 'recipe_name' ),
			recipeYield: getKindMeta( 'recipe_yield' ),
			recipeDuration: getKindMeta( 'recipe_duration' ),
			recipeUrl: getKindMeta( 'recipe_url' ),
		};
	}, [] );

	const { updateKindMeta } = useDispatch( STORE_NAME );

	return (
		<VStack spacing={ 4 } className="reactions-indieweb-kind-fields">
			<p className="description" style={ { margin: 0, fontSize: '12px', color: '#757575' } }>
				{ __( 'For full recipe features, use WP Recipe Maker blocks.', 'reactions-for-indieweb' ) }
			</p>
			<TextControl
				label={ __( 'Recipe Name', 'reactions-for-indieweb' ) }
				value={ recipeName }
				onChange={ ( value ) => updateKindMeta( 'recipe_name', value ) }
			/>
			<TextControl
				label={ __( 'Yield/Servings', 'reactions-for-indieweb' ) }
				value={ recipeYield }
				onChange={ ( value ) => updateKindMeta( 'recipe_yield', value ) }
				placeholder={ __( '4 servings', 'reactions-for-indieweb' ) }
			/>
			<TextControl
				label={ __( 'Total Time', 'reactions-for-indieweb' ) }
				value={ recipeDuration }
				onChange={ ( value ) => updateKindMeta( 'recipe_duration', value ) }
				placeholder={ __( 'PT1H30M (ISO 8601)', 'reactions-for-indieweb' ) }
				help={ __( 'Format: PT1H30M = 1 hour 30 minutes', 'reactions-for-indieweb' ) }
			/>
			<TextControl
				label={ __( 'Recipe Source URL', 'reactions-for-indieweb' ) }
				type="url"
				value={ recipeUrl }
				onChange={ ( value ) => updateKindMeta( 'recipe_url', value ) }
				placeholder="https://"
			/>
		</VStack>
	);
}
