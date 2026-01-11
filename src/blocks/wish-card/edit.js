/**
 * Wish Card Block - Edit Component
 *
 * @package Reactions_For_IndieWeb
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, Button, DateTimePicker, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { wishIcon } from '../shared/icons';
import { CoverImage, BlockPlaceholder } from '../shared/components';

const WISH_TYPES = [
	{ label: __( 'Item', 'reactions-for-indieweb' ), value: 'item' },
	{ label: __( 'Experience', 'reactions-for-indieweb' ), value: 'experience' },
	{ label: __( 'Book', 'reactions-for-indieweb' ), value: 'book' },
	{ label: __( 'Game', 'reactions-for-indieweb' ), value: 'game' },
	{ label: __( 'Movie/Show', 'reactions-for-indieweb' ), value: 'media' },
	{ label: __( 'Travel', 'reactions-for-indieweb' ), value: 'travel' },
	{ label: __( 'Other', 'reactions-for-indieweb' ), value: 'other' },
];

const PRIORITY_OPTIONS = [
	{ label: __( 'Low', 'reactions-for-indieweb' ), value: 'low' },
	{ label: __( 'Medium', 'reactions-for-indieweb' ), value: 'medium' },
	{ label: __( 'High', 'reactions-for-indieweb' ), value: 'high' },
];

export default function Edit( { attributes, setAttributes } ) {
	const { title, wishType, url, image, imageAlt, price, reason, priority, wishedAt, layout } = attributes;
	const [ showDatePicker, setShowDatePicker ] = useState( false );
	const blockProps = useBlockProps( { className: `wish-card layout-${ layout } priority-${ priority }` } );

	if ( ! title ) {
		return (
			<div { ...blockProps }>
				<BlockPlaceholder icon={ wishIcon } label={ __( 'Wish Card', 'reactions-for-indieweb' ) } instructions={ __( 'Add something you wish for.', 'reactions-for-indieweb' ) }>
					<Button variant="primary" onClick={ () => setAttributes( { title: '' } ) }>{ __( 'Add Wish', 'reactions-for-indieweb' ) }</Button>
				</BlockPlaceholder>
			</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Wish Details', 'reactions-for-indieweb' ) }>
					<TextControl label={ __( 'Title', 'reactions-for-indieweb' ) } value={ title || '' } onChange={ ( v ) => setAttributes( { title: v } ) } />
					<SelectControl label={ __( 'Type', 'reactions-for-indieweb' ) } value={ wishType } options={ WISH_TYPES } onChange={ ( v ) => setAttributes( { wishType: v } ) } />
					<TextControl label={ __( 'URL', 'reactions-for-indieweb' ) } value={ url || '' } onChange={ ( v ) => setAttributes( { url: v } ) } type="url" />
					<TextControl label={ __( 'Price', 'reactions-for-indieweb' ) } value={ price || '' } onChange={ ( v ) => setAttributes( { price: v } ) } />
					<SelectControl label={ __( 'Priority', 'reactions-for-indieweb' ) } value={ priority } options={ PRIORITY_OPTIONS } onChange={ ( v ) => setAttributes( { priority: v } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Timing', 'reactions-for-indieweb' ) }>
					<Button variant="secondary" onClick={ () => setShowDatePicker( true ) }>
						{ wishedAt ? new Date( wishedAt ).toLocaleString() : __( 'Set date/time', 'reactions-for-indieweb' ) }
					</Button>
					{ showDatePicker && <Popover onClose={ () => setShowDatePicker( false ) }><DateTimePicker currentDate={ wishedAt } onChange={ ( v ) => { setAttributes( { wishedAt: v } ); setShowDatePicker( false ); } } /></Popover> }
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="wish-card-inner h-cite">
					<div className="wish-image">
						<MediaUploadCheck><MediaUpload onSelect={ ( m ) => setAttributes( { image: m.url, imageAlt: m.alt || title } ) } allowedTypes={ [ 'image' ] } render={ ( { open } ) => <div onClick={ open } role="button" tabIndex={ 0 }><CoverImage src={ image } alt={ imageAlt } size="medium" /></div> } /></MediaUploadCheck>
					</div>
					<div className="wish-info">
						<div className="wish-header">
							<span className="wish-type-badge">{ WISH_TYPES.find( t => t.value === wishType )?.label }</span>
							<span className={ `priority-badge priority-${ priority }` }>{ PRIORITY_OPTIONS.find( p => p.value === priority )?.label }</span>
						</div>
						<RichText tagName="h3" className="wish-title p-name" value={ title } onChange={ ( v ) => setAttributes( { title: v } ) } placeholder={ __( 'What you wish for', 'reactions-for-indieweb' ) } />
						{ price && <p className="wish-price">{ price }</p> }
						<RichText tagName="p" className="wish-reason p-content" value={ reason } onChange={ ( v ) => setAttributes( { reason: v } ) } placeholder={ __( 'Why you want this...', 'reactions-for-indieweb' ) } />
					</div>
				</div>
			</div>
		</>
	);
}
