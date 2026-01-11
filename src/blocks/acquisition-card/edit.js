/**
 * Acquisition Card Block - Edit Component
 *
 * @package Reactions_For_IndieWeb
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, Button, DateTimePicker, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { acquisitionIcon } from '../shared/icons';
import { CoverImage, BlockPlaceholder } from '../shared/components';

const ACQUISITION_TYPES = [
	{ label: __( 'Purchase', 'reactions-for-indieweb' ), value: 'purchase' },
	{ label: __( 'Gift', 'reactions-for-indieweb' ), value: 'gift' },
	{ label: __( 'Found', 'reactions-for-indieweb' ), value: 'found' },
	{ label: __( 'Won', 'reactions-for-indieweb' ), value: 'won' },
	{ label: __( 'Trade', 'reactions-for-indieweb' ), value: 'trade' },
	{ label: __( 'Free', 'reactions-for-indieweb' ), value: 'free' },
	{ label: __( 'Other', 'reactions-for-indieweb' ), value: 'other' },
];

export default function Edit( { attributes, setAttributes } ) {
	const { title, acquisitionType, cost, where, whereUrl, photo, photoAlt, notes, acquiredAt, layout } = attributes;
	const [ showDatePicker, setShowDatePicker ] = useState( false );
	const blockProps = useBlockProps( { className: `acquisition-card layout-${ layout }` } );

	if ( ! title ) {
		return (
			<div { ...blockProps }>
				<BlockPlaceholder icon={ acquisitionIcon } label={ __( 'Acquisition Card', 'reactions-for-indieweb' ) } instructions={ __( 'Add something you acquired.', 'reactions-for-indieweb' ) }>
					<Button variant="primary" onClick={ () => setAttributes( { title: '' } ) }>{ __( 'Add Acquisition', 'reactions-for-indieweb' ) }</Button>
				</BlockPlaceholder>
			</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Acquisition Details', 'reactions-for-indieweb' ) }>
					<TextControl label={ __( 'Item', 'reactions-for-indieweb' ) } value={ title || '' } onChange={ ( v ) => setAttributes( { title: v } ) } />
					<SelectControl label={ __( 'How Acquired', 'reactions-for-indieweb' ) } value={ acquisitionType } options={ ACQUISITION_TYPES } onChange={ ( v ) => setAttributes( { acquisitionType: v } ) } />
					<TextControl label={ __( 'Cost', 'reactions-for-indieweb' ) } value={ cost || '' } onChange={ ( v ) => setAttributes( { cost: v } ) } placeholder="$0.00" />
					<TextControl label={ __( 'Where', 'reactions-for-indieweb' ) } value={ where || '' } onChange={ ( v ) => setAttributes( { where: v } ) } />
					<TextControl label={ __( 'Where URL', 'reactions-for-indieweb' ) } value={ whereUrl || '' } onChange={ ( v ) => setAttributes( { whereUrl: v } ) } type="url" />
				</PanelBody>
				<PanelBody title={ __( 'Timing', 'reactions-for-indieweb' ) }>
					<Button variant="secondary" onClick={ () => setShowDatePicker( true ) }>
						{ acquiredAt ? new Date( acquiredAt ).toLocaleString() : __( 'Set date/time', 'reactions-for-indieweb' ) }
					</Button>
					{ showDatePicker && <Popover onClose={ () => setShowDatePicker( false ) }><DateTimePicker currentDate={ acquiredAt } onChange={ ( v ) => { setAttributes( { acquiredAt: v } ); setShowDatePicker( false ); } } /></Popover> }
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="acquisition-card-inner h-cite">
					<div className="acquisition-photo">
						<MediaUploadCheck><MediaUpload onSelect={ ( m ) => setAttributes( { photo: m.url, photoAlt: m.alt || title } ) } allowedTypes={ [ 'image' ] } render={ ( { open } ) => <div onClick={ open } role="button" tabIndex={ 0 }><CoverImage src={ photo } alt={ photoAlt } size="medium" /></div> } /></MediaUploadCheck>
					</div>
					<div className="acquisition-info">
						<span className="acquisition-type-badge">{ ACQUISITION_TYPES.find( t => t.value === acquisitionType )?.label }</span>
						<RichText tagName="h3" className="acquisition-title p-name" value={ title } onChange={ ( v ) => setAttributes( { title: v } ) } placeholder={ __( 'What you got', 'reactions-for-indieweb' ) } />
						{ cost && <p className="acquisition-cost">{ cost }</p> }
						{ where && <p className="acquisition-where p-location">{ __( 'from', 'reactions-for-indieweb' ) } { where }</p> }
						<RichText tagName="p" className="acquisition-notes p-content" value={ notes } onChange={ ( v ) => setAttributes( { notes: v } ) } placeholder={ __( 'Notes about this...', 'reactions-for-indieweb' ) } />
					</div>
				</div>
			</div>
		</>
	);
}
