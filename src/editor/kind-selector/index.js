/**
 * Reactions for IndieWeb - Kind Selector Sidebar Panel
 *
 * Main sidebar panel component for selecting post kinds and managing
 * kind-specific metadata in the block editor.
 *
 * @package
 * @since   1.0.0
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useCallback } from '@wordpress/element';
import { PluginDocumentSettingPanel, store as editorStore } from '@wordpress/editor';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { STORE_NAME } from '../stores/post-kinds';
import KindGrid from './components/KindGrid';
import KindFields from './components/KindFields';
import AutoDetectionNotice from './components/AutoDetectionNotice';
import { kindIcons } from './icons';

/**
 * Block names that indicate specific kinds.
 *
 * @type {Object}
 */
/**
 * Map block names to kind slugs (for auto-detection).
 *
 * @type {Object}
 */
const BLOCK_KIND_MAP = {
	'indieblocks/reply': 'reply',
	'indieblocks/like': 'like',
	'indieblocks/repost': 'repost',
	'indieblocks/bookmark': 'bookmark',
	'core/gallery': 'photo',
	'core/image': 'photo',
	'core/video': 'video',
	'core/audio': 'listen',
};

/**
 * Map kind slugs to their corresponding card block names.
 * When a kind is selected, we auto-insert this block if not present.
 *
 * @type {Object}
 */
const KIND_CARD_BLOCK_MAP = {
	listen: 'reactions-indieweb/listen-card',
	watch: 'reactions-indieweb/watch-card',
	read: 'reactions-indieweb/read-card',
	checkin: 'reactions-indieweb/checkin-card',
	rsvp: 'reactions-indieweb/rsvp-card',
	play: 'reactions-indieweb/play-card',
	eat: 'reactions-indieweb/eat-card',
	drink: 'reactions-indieweb/drink-card',
	favorite: 'reactions-indieweb/favorite-card',
	jam: 'reactions-indieweb/jam-card',
	wish: 'reactions-indieweb/wish-card',
	mood: 'reactions-indieweb/mood-card',
	acquisition: 'reactions-indieweb/acquisition-card',
};

/**
 * Detect kind from post content and blocks.
 *
 * @param {Array}  blockList Post blocks.
 * @param {string} title     Post title.
 * @return {string|null} Detected kind or null.
 */
function detectKindFromContent( blockList, title ) {
	// Check for IndieBlocks blocks first.
	for ( const block of blockList ) {
		if ( BLOCK_KIND_MAP[ block.name ] ) {
			return BLOCK_KIND_MAP[ block.name ];
		}

		// Check inner blocks recursively.
		if ( block.innerBlocks && block.innerBlocks.length > 0 ) {
			const innerKind = detectKindFromContent( block.innerBlocks, title );
			if ( innerKind ) {
				return innerKind;
			}
		}
	}

	// Check for media-heavy posts.
	const hasGallery = blockList.some( ( b ) => b.name === 'core/gallery' );
	const imageCount = blockList.filter( ( b ) => b.name === 'core/image' ).length;
	const hasVideo = blockList.some( ( b ) => b.name === 'core/video' );

	if ( hasGallery || imageCount >= 3 ) {
		return 'photo';
	}

	if ( hasVideo ) {
		return 'video';
	}

	// Determine article vs note based on title.
	if ( title && title.trim().length > 0 ) {
		return 'article';
	}

	return 'note';
}

/**
 * Kind Selector Panel Component
 *
 * Renders the sidebar panel for selecting and configuring post kinds.
 *
 * @return {JSX.Element} The panel component.
 */
export default function KindSelectorPanel() {
	const {
		selectedKind,
		autoDetectedKind,
		isAutoDetectionEnabled,
		availableKinds,
		isInitialized,
		postTitle,
		blocks,
	} = useSelect( ( select ) => {
		const kindsStore = select( STORE_NAME );
		const editor = select( editorStore );
		const blockEditor = select( blockEditorStore );

		return {
			selectedKind: kindsStore.getSelectedKind(),
			autoDetectedKind: kindsStore.getAutoDetectedKind(),
			isAutoDetectionEnabled: kindsStore.isAutoDetectionEnabled(),
			availableKinds: kindsStore.getAvailableKinds(),
			isInitialized: kindsStore.isInitialized(),
			postTitle: editor.getEditedPostAttribute( 'title' ),
			blocks: blockEditor.getBlocks(),
		};
	}, [] );

	const {
		initialize,
		setAutoDetectedKind,
		updatePostKind,
		disableAutoDetection,
	} = useDispatch( STORE_NAME );

	const { insertBlocks } = useDispatch( blockEditorStore );

	/**
	 * Check if a card block for the given kind already exists in the post.
	 *
	 * @param {string} kind Kind slug.
	 * @return {boolean} True if card block exists.
	 */
	const hasCardBlockForKind = useCallback( ( kind ) => {
		const blockName = KIND_CARD_BLOCK_MAP[ kind ];
		if ( ! blockName ) {
			return true; // No card block defined for this kind
		}

		// Check if any block matches the card block name
		const checkBlocks = ( blockList ) => {
			for ( const block of blockList ) {
				if ( block.name === blockName ) {
					return true;
				}
				// Check inner blocks recursively
				if ( block.innerBlocks && block.innerBlocks.length > 0 ) {
					if ( checkBlocks( block.innerBlocks ) ) {
						return true;
					}
				}
			}
			return false;
		};

		return checkBlocks( blocks );
	}, [ blocks ] );

	/**
	 * Insert card block for the given kind at the beginning of the post.
	 *
	 * @param {string} kind Kind slug.
	 */
	const insertCardBlock = useCallback( ( kind ) => {
		const blockName = KIND_CARD_BLOCK_MAP[ kind ];
		if ( ! blockName ) {
			return; // No card block defined for this kind
		}

		// Don't insert if block already exists
		if ( hasCardBlockForKind( kind ) ) {
			return;
		}

		// Create and insert the block at the beginning
		const newBlock = createBlock( blockName );
		insertBlocks( newBlock, 0 );
	}, [ hasCardBlockForKind, insertBlocks ] );

	// Initialize store on mount.
	useEffect( () => {
		if ( ! isInitialized ) {
			initialize();
		}
	}, [ isInitialized, initialize ] );

	// Auto-detect kind based on content.
	useEffect( () => {
		if ( ! isAutoDetectionEnabled || selectedKind ) {
			return;
		}

		const detectedKind = detectKindFromContent( blocks, postTitle );
		setAutoDetectedKind( detectedKind );
	}, [ blocks, postTitle, isAutoDetectionEnabled, selectedKind, setAutoDetectedKind ] );

	/**
	 * Handle kind selection.
	 *
	 * @param {string} kind Kind slug.
	 */
	function handleKindSelect( kind ) {
		updatePostKind( kind );
		disableAutoDetection();

		// Auto-insert the corresponding card block if not already present
		insertCardBlock( kind );
	}

	/**
	 * Handle accepting auto-detected kind.
	 */
	function handleAcceptAutoDetected() {
		if ( autoDetectedKind ) {
			updatePostKind( autoDetectedKind );
			disableAutoDetection();

			// Auto-insert the corresponding card block if not already present
			insertCardBlock( autoDetectedKind );
		}
	}

	// Get the current kind (selected or auto-detected).
	const currentKind = selectedKind || autoDetectedKind || 'note';
	const currentKindData = availableKinds.find( ( k ) => k.slug === currentKind );

	// Get icon for current kind.
	const KindIcon = kindIcons[ currentKind ] || kindIcons.note;

	return (
		<PluginDocumentSettingPanel
			name="reactions-indieweb-kind-selector"
			title={ __( 'Post Kind', 'reactions-for-indieweb' ) }
			className="reactions-indieweb-kind-panel"
			icon={ <KindIcon /> }
		>
			{ /* Auto-detection notice */ }
			{ ! selectedKind && autoDetectedKind && (
				<AutoDetectionNotice
					detectedKind={ autoDetectedKind }
					kindLabel={ currentKindData?.name || autoDetectedKind }
					onAccept={ handleAcceptAutoDetected }
					onDismiss={ () => setAutoDetectedKind( null ) }
				/>
			) }

			{ /* Kind selection grid */ }
			<KindGrid
				kinds={ availableKinds }
				selectedKind={ currentKind }
				onSelect={ handleKindSelect }
			/>

			{ /* Kind-specific fields */ }
			{ currentKind && (
				<KindFields kind={ currentKind } />
			) }
		</PluginDocumentSettingPanel>
	);
}
