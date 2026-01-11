/**
 * Favorite Card Block - Edit Component
 *
 * @package Reactions_For_IndieWeb
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, DateTimePicker, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { favoriteIcon } from '../shared/icons';
import { CoverImage, BlockPlaceholder } from '../shared/components';

export default function Edit( { attributes, setAttributes } ) {
	const { title, url, description, image, imageAlt, author, favoritedAt, layout } = attributes;
	const [ showDatePicker, setShowDatePicker ] = useState( false );
	const blockProps = useBlockProps( { className: `favorite-card layout-${ layout }` } );

	if ( ! title && ! url ) {
		return (
			<div { ...blockProps }>
				<BlockPlaceholder icon={ favoriteIcon } label={ __( 'Favorite Card', 'reactions-for-indieweb' ) } instructions={ __( 'Add something you favorited.', 'reactions-for-indieweb' ) }>
					<Button variant="primary" onClick={ () => setAttributes( { title: '' } ) }>{ __( 'Add Favorite', 'reactions-for-indieweb' ) }</Button>
				</BlockPlaceholder>
			</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Favorite Details', 'reactions-for-indieweb' ) }>
					<TextControl label={ __( 'Title', 'reactions-for-indieweb' ) } value={ title || '' } onChange={ ( v ) => setAttributes( { title: v } ) } />
					<TextControl label={ __( 'URL', 'reactions-for-indieweb' ) } value={ url || '' } onChange={ ( v ) => setAttributes( { url: v } ) } type="url" />
					<TextControl label={ __( 'Author', 'reactions-for-indieweb' ) } value={ author || '' } onChange={ ( v ) => setAttributes( { author: v } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Timing', 'reactions-for-indieweb' ) }>
					<Button variant="secondary" onClick={ () => setShowDatePicker( true ) }>
						{ favoritedAt ? new Date( favoritedAt ).toLocaleString() : __( 'Set date/time', 'reactions-for-indieweb' ) }
					</Button>
					{ showDatePicker && <Popover onClose={ () => setShowDatePicker( false ) }><DateTimePicker currentDate={ favoritedAt } onChange={ ( v ) => { setAttributes( { favoritedAt: v } ); setShowDatePicker( false ); } } /></Popover> }
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="favorite-card-inner h-cite">
					{ image && <div className="favorite-image"><MediaUploadCheck><MediaUpload onSelect={ ( m ) => setAttributes( { image: m.url, imageAlt: m.alt || title } ) } allowedTypes={ [ 'image' ] } render={ ( { open } ) => <div onClick={ open } role="button" tabIndex={ 0 }><CoverImage src={ image } alt={ imageAlt } size="small" /></div> } /></MediaUploadCheck></div> }
					<div className="favorite-info">
						<span className="favorite-badge">★ { __( 'Favorited', 'reactions-for-indieweb' ) }</span>
						<RichText tagName="h3" className="favorite-title p-name" value={ title } onChange={ ( v ) => setAttributes( { title: v } ) } placeholder={ __( 'Title', 'reactions-for-indieweb' ) } />
						{ author && <p className="favorite-author p-author h-card"><span className="p-name">{ author }</span></p> }
						<RichText tagName="p" className="favorite-description p-content" value={ description } onChange={ ( v ) => setAttributes( { description: v } ) } placeholder={ __( 'Why you favorited this...', 'reactions-for-indieweb' ) } />
					</div>
				</div>
			</div>
		</>
	);
}
