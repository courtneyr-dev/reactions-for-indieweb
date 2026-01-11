/**
 * Jam Card Block - Edit Component
 *
 * @package Reactions_For_IndieWeb
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, DateTimePicker, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { jamIcon } from '../shared/icons';
import { CoverImage, BlockPlaceholder, MediaSearch } from '../shared/components';

export default function Edit( { attributes, setAttributes } ) {
	const { title, artist, album, cover, coverAlt, url, note, jammedAt, layout } = attributes;
	const [ showDatePicker, setShowDatePicker ] = useState( false );
	const [ isSearching, setIsSearching ] = useState( false );
	const blockProps = useBlockProps( { className: `jam-card layout-${ layout }` } );

	const handleSearchSelect = ( item ) => {
		setAttributes( {
			title: item.title || item.name || '',
			artist: item.artist || '',
			album: item.album || '',
			cover: item.cover || item.image || '',
			coverAlt: `${ item.title || '' } by ${ item.artist || '' }`,
		} );
		setIsSearching( false );
	};

	if ( ! title && ! artist ) {
		return (
			<div { ...blockProps }>
				<BlockPlaceholder icon={ jamIcon } label={ __( 'Jam Card', 'reactions-for-indieweb' ) } instructions={ __( 'Share a song you\'re jamming to.', 'reactions-for-indieweb' ) }>
					{ isSearching ? (
						<div className="search-mode">
							<MediaSearch type="music" placeholder={ __( 'Search for a song...', 'reactions-for-indieweb' ) } onSelect={ handleSearchSelect } />
							<Button variant="link" onClick={ () => setIsSearching( false ) }>{ __( 'Enter manually', 'reactions-for-indieweb' ) }</Button>
						</div>
					) : (
						<div className="placeholder-actions">
							<Button variant="primary" onClick={ () => setIsSearching( true ) }>{ __( 'Search Music', 'reactions-for-indieweb' ) }</Button>
							<Button variant="secondary" onClick={ () => setAttributes( { title: '' } ) }>{ __( 'Enter Manually', 'reactions-for-indieweb' ) }</Button>
						</div>
					) }
				</BlockPlaceholder>
			</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Track Details', 'reactions-for-indieweb' ) }>
					<TextControl label={ __( 'Song Title', 'reactions-for-indieweb' ) } value={ title || '' } onChange={ ( v ) => setAttributes( { title: v } ) } />
					<TextControl label={ __( 'Artist', 'reactions-for-indieweb' ) } value={ artist || '' } onChange={ ( v ) => setAttributes( { artist: v } ) } />
					<TextControl label={ __( 'Album', 'reactions-for-indieweb' ) } value={ album || '' } onChange={ ( v ) => setAttributes( { album: v } ) } />
					<TextControl label={ __( 'URL', 'reactions-for-indieweb' ) } value={ url || '' } onChange={ ( v ) => setAttributes( { url: v } ) } type="url" />
				</PanelBody>
				<PanelBody title={ __( 'Timing', 'reactions-for-indieweb' ) }>
					<Button variant="secondary" onClick={ () => setShowDatePicker( true ) }>
						{ jammedAt ? new Date( jammedAt ).toLocaleString() : __( 'Set date/time', 'reactions-for-indieweb' ) }
					</Button>
					{ showDatePicker && <Popover onClose={ () => setShowDatePicker( false ) }><DateTimePicker currentDate={ jammedAt } onChange={ ( v ) => { setAttributes( { jammedAt: v } ); setShowDatePicker( false ); } } /></Popover> }
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="jam-card-inner h-cite">
					<div className="jam-cover">
						<MediaUploadCheck><MediaUpload onSelect={ ( m ) => setAttributes( { cover: m.url, coverAlt: m.alt || title } ) } allowedTypes={ [ 'image' ] } render={ ( { open } ) => <div onClick={ open } role="button" tabIndex={ 0 }><CoverImage src={ cover } alt={ coverAlt } size="medium" /></div> } /></MediaUploadCheck>
					</div>
					<div className="jam-info">
						<span className="jam-badge">🎵 { __( 'Now Playing', 'reactions-for-indieweb' ) }</span>
						<RichText tagName="h3" className="jam-title p-name" value={ title } onChange={ ( v ) => setAttributes( { title: v } ) } placeholder={ __( 'Song title', 'reactions-for-indieweb' ) } />
						{ artist && <p className="jam-artist p-author h-card"><span className="p-name">{ artist }</span></p> }
						{ album && <p className="jam-album">{ album }</p> }
						<RichText tagName="p" className="jam-note p-content" value={ note } onChange={ ( v ) => setAttributes( { note: v } ) } placeholder={ __( 'Why you\'re jamming to this...', 'reactions-for-indieweb' ) } />
					</div>
				</div>
			</div>
		</>
	);
}
