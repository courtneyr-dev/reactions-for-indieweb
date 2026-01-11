/**
 * Drink Card Block - Edit Component
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
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { drinkIcon } from '../shared/icons';
import { StarRating, CoverImage, BlockPlaceholder } from '../shared/components';

const DRINK_TYPES = [
	{ label: __( 'Coffee', 'reactions-for-indieweb' ), value: 'coffee' },
	{ label: __( 'Tea', 'reactions-for-indieweb' ), value: 'tea' },
	{ label: __( 'Beer', 'reactions-for-indieweb' ), value: 'beer' },
	{ label: __( 'Wine', 'reactions-for-indieweb' ), value: 'wine' },
	{ label: __( 'Cocktail', 'reactions-for-indieweb' ), value: 'cocktail' },
	{ label: __( 'Juice', 'reactions-for-indieweb' ), value: 'juice' },
	{ label: __( 'Soda', 'reactions-for-indieweb' ), value: 'soda' },
	{ label: __( 'Smoothie', 'reactions-for-indieweb' ), value: 'smoothie' },
	{ label: __( 'Water', 'reactions-for-indieweb' ), value: 'water' },
	{ label: __( 'Other', 'reactions-for-indieweb' ), value: 'other' },
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		name,
		drinkType,
		brand,
		photo,
		photoAlt,
		rating,
		drankAt,
		notes,
		venue,
		venueUrl,
		layout,
	} = attributes;

	const [ showDatePicker, setShowDatePicker ] = useState( false );
	const blockProps = useBlockProps( { className: `drink-card layout-${ layout }` } );

	const handleImageSelect = ( media ) => {
		setAttributes( { photo: media.url, photoAlt: media.alt || name } );
	};

	if ( ! name ) {
		return (
			<div { ...blockProps }>
				<BlockPlaceholder
					icon={ drinkIcon }
					label={ __( 'Drink Card', 'reactions-for-indieweb' ) }
					instructions={ __( 'Add a drink you had.', 'reactions-for-indieweb' ) }
				>
					<Button variant="primary" onClick={ () => setAttributes( { name: '' } ) }>
						{ __( 'Add Drink', 'reactions-for-indieweb' ) }
					</Button>
				</BlockPlaceholder>
			</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Drink Details', 'reactions-for-indieweb' ) }>
					<TextControl
						label={ __( 'Drink Name', 'reactions-for-indieweb' ) }
						value={ name || '' }
						onChange={ ( value ) => setAttributes( { name: value } ) }
					/>
					<SelectControl
						label={ __( 'Type', 'reactions-for-indieweb' ) }
						value={ drinkType }
						options={ DRINK_TYPES }
						onChange={ ( value ) => setAttributes( { drinkType: value } ) }
					/>
					<TextControl
						label={ __( 'Brand/Maker', 'reactions-for-indieweb' ) }
						value={ brand || '' }
						onChange={ ( value ) => setAttributes( { brand: value } ) }
					/>
					<TextControl
						label={ __( 'Venue', 'reactions-for-indieweb' ) }
						value={ venue || '' }
						onChange={ ( value ) => setAttributes( { venue: value } ) }
					/>
					<TextControl
						label={ __( 'Venue URL', 'reactions-for-indieweb' ) }
						value={ venueUrl || '' }
						onChange={ ( value ) => setAttributes( { venueUrl: value } ) }
						type="url"
					/>
				</PanelBody>
				<PanelBody title={ __( 'Rating & Time', 'reactions-for-indieweb' ) }>
					<div className="components-base-control">
						<label className="components-base-control__label">{ __( 'Rating', 'reactions-for-indieweb' ) }</label>
						<StarRating value={ rating } onChange={ ( value ) => setAttributes( { rating: value } ) } max={ 5 } />
					</div>
					<div className="components-base-control">
						<label className="components-base-control__label">{ __( 'When', 'reactions-for-indieweb' ) }</label>
						<Button variant="secondary" onClick={ () => setShowDatePicker( true ) }>
							{ drankAt ? new Date( drankAt ).toLocaleString() : __( 'Set date/time', 'reactions-for-indieweb' ) }
						</Button>
						{ showDatePicker && (
							<Popover onClose={ () => setShowDatePicker( false ) }>
								<DateTimePicker currentDate={ drankAt } onChange={ ( value ) => { setAttributes( { drankAt: value } ); setShowDatePicker( false ); } } />
							</Popover>
						) }
					</div>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="drink-card-inner h-food">
					<div className="drink-photo">
						<MediaUploadCheck>
							<MediaUpload onSelect={ handleImageSelect } allowedTypes={ [ 'image' ] } render={ ( { open } ) => (
								<div onClick={ open } role="button" tabIndex={ 0 }><CoverImage src={ photo } alt={ photoAlt } size="medium" /></div>
							) } />
						</MediaUploadCheck>
					</div>
					<div className="drink-info">
						<span className="drink-type-badge">{ DRINK_TYPES.find( t => t.value === drinkType )?.label || drinkType }</span>
						<RichText tagName="h3" className="drink-name p-name" value={ name } onChange={ ( value ) => setAttributes( { name: value } ) } placeholder={ __( 'Drink name', 'reactions-for-indieweb' ) } />
						{ brand && <p className="drink-brand">{ brand }</p> }
						{ venue && <p className="drink-venue p-location">{ venue }</p> }
						{ rating > 0 && <StarRating value={ rating } readonly max={ 5 } /> }
						<RichText tagName="p" className="drink-notes p-content" value={ notes } onChange={ ( value ) => setAttributes( { notes: value } ) } placeholder={ __( 'Add notes...', 'reactions-for-indieweb' ) } />
					</div>
				</div>
			</div>
		</>
	);
}
