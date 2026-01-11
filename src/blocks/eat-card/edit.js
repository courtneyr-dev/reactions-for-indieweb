/**
 * Eat Card Block - Edit Component
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
import { eatIcon } from '../shared/icons';
import { StarRating, CoverImage, BlockPlaceholder } from '../shared/components';

const CUISINE_OPTIONS = [
	{ label: __( 'Select cuisine...', 'reactions-for-indieweb' ), value: '' },
	{ label: __( 'American', 'reactions-for-indieweb' ), value: 'american' },
	{ label: __( 'Chinese', 'reactions-for-indieweb' ), value: 'chinese' },
	{ label: __( 'French', 'reactions-for-indieweb' ), value: 'french' },
	{ label: __( 'Indian', 'reactions-for-indieweb' ), value: 'indian' },
	{ label: __( 'Italian', 'reactions-for-indieweb' ), value: 'italian' },
	{ label: __( 'Japanese', 'reactions-for-indieweb' ), value: 'japanese' },
	{ label: __( 'Korean', 'reactions-for-indieweb' ), value: 'korean' },
	{ label: __( 'Mexican', 'reactions-for-indieweb' ), value: 'mexican' },
	{ label: __( 'Thai', 'reactions-for-indieweb' ), value: 'thai' },
	{ label: __( 'Vietnamese', 'reactions-for-indieweb' ), value: 'vietnamese' },
	{ label: __( 'Other', 'reactions-for-indieweb' ), value: 'other' },
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		name,
		restaurant,
		cuisine,
		photo,
		photoAlt,
		rating,
		ateAt,
		notes,
		restaurantUrl,
		locality,
		layout,
	} = attributes;

	const [ showDatePicker, setShowDatePicker ] = useState( false );
	const blockProps = useBlockProps( { className: `eat-card layout-${ layout }` } );

	const handleImageSelect = ( media ) => {
		setAttributes( { photo: media.url, photoAlt: media.alt || name } );
	};

	if ( ! name && ! restaurant ) {
		return (
			<div { ...blockProps }>
				<BlockPlaceholder
					icon={ eatIcon }
					label={ __( 'Eat Card', 'reactions-for-indieweb' ) }
					instructions={ __( 'Add a meal or food you ate.', 'reactions-for-indieweb' ) }
				>
					<Button variant="primary" onClick={ () => setAttributes( { name: '' } ) }>
						{ __( 'Add Meal', 'reactions-for-indieweb' ) }
					</Button>
				</BlockPlaceholder>
			</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Meal Details', 'reactions-for-indieweb' ) }>
					<TextControl
						label={ __( 'Dish Name', 'reactions-for-indieweb' ) }
						value={ name || '' }
						onChange={ ( value ) => setAttributes( { name: value } ) }
					/>
					<TextControl
						label={ __( 'Restaurant', 'reactions-for-indieweb' ) }
						value={ restaurant || '' }
						onChange={ ( value ) => setAttributes( { restaurant: value } ) }
					/>
					<TextControl
						label={ __( 'Restaurant URL', 'reactions-for-indieweb' ) }
						value={ restaurantUrl || '' }
						onChange={ ( value ) => setAttributes( { restaurantUrl: value } ) }
						type="url"
					/>
					<SelectControl
						label={ __( 'Cuisine', 'reactions-for-indieweb' ) }
						value={ cuisine }
						options={ CUISINE_OPTIONS }
						onChange={ ( value ) => setAttributes( { cuisine: value } ) }
					/>
					<TextControl
						label={ __( 'Location', 'reactions-for-indieweb' ) }
						value={ locality || '' }
						onChange={ ( value ) => setAttributes( { locality: value } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Rating & Time', 'reactions-for-indieweb' ) }>
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
							{ __( 'When', 'reactions-for-indieweb' ) }
						</label>
						<Button variant="secondary" onClick={ () => setShowDatePicker( true ) }>
							{ ateAt ? new Date( ateAt ).toLocaleString() : __( 'Set date/time', 'reactions-for-indieweb' ) }
						</Button>
						{ showDatePicker && (
							<Popover onClose={ () => setShowDatePicker( false ) }>
								<DateTimePicker
									currentDate={ ateAt }
									onChange={ ( value ) => {
										setAttributes( { ateAt: value } );
										setShowDatePicker( false );
									} }
								/>
							</Popover>
						) }
					</div>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="eat-card-inner h-food">
					<div className="food-photo">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ handleImageSelect }
								allowedTypes={ [ 'image' ] }
								render={ ( { open } ) => (
									<div onClick={ open } role="button" tabIndex={ 0 }>
										<CoverImage src={ photo } alt={ photoAlt } size="medium" />
									</div>
								) }
							/>
						</MediaUploadCheck>
					</div>
					<div className="food-info">
						{ cuisine && <span className="cuisine-badge">{ cuisine }</span> }
						<RichText
							tagName="h3"
							className="food-name p-name"
							value={ name }
							onChange={ ( value ) => setAttributes( { name: value } ) }
							placeholder={ __( 'Dish name', 'reactions-for-indieweb' ) }
						/>
						{ restaurant && <p className="restaurant-name p-location">{ restaurant }</p> }
						{ rating > 0 && <StarRating value={ rating } readonly max={ 5 } /> }
						<RichText
							tagName="p"
							className="food-notes p-content"
							value={ notes }
							onChange={ ( value ) => setAttributes( { notes: value } ) }
							placeholder={ __( 'Add notes...', 'reactions-for-indieweb' ) }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
