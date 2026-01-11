/**
 * Mood Card Block - Edit Component
 *
 * @package Reactions_For_IndieWeb
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl, Button, DateTimePicker, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { moodIcon } from '../shared/icons';
import { BlockPlaceholder } from '../shared/components';

const MOOD_EMOJIS = [ '😊', '😃', '😐', '😢', '😡', '😴', '🤔', '😌', '🥳', '😎', '🤒', '😰' ];

export default function Edit( { attributes, setAttributes } ) {
	const { mood, emoji, note, intensity, moodAt, layout } = attributes;
	const [ showDatePicker, setShowDatePicker ] = useState( false );
	const blockProps = useBlockProps( { className: `mood-card layout-${ layout }` } );

	if ( ! mood && ! emoji ) {
		return (
			<div { ...blockProps }>
				<BlockPlaceholder icon={ moodIcon } label={ __( 'Mood Card', 'reactions-for-indieweb' ) } instructions={ __( 'Share how you\'re feeling.', 'reactions-for-indieweb' ) }>
					<div className="mood-emoji-grid">
						{ MOOD_EMOJIS.map( ( e ) => (
							<Button key={ e } className="mood-emoji-btn" onClick={ () => setAttributes( { emoji: e, mood: '' } ) }>{ e }</Button>
						) ) }
					</div>
				</BlockPlaceholder>
			</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Mood Details', 'reactions-for-indieweb' ) }>
					<TextControl label={ __( 'Mood', 'reactions-for-indieweb' ) } value={ mood || '' } onChange={ ( v ) => setAttributes( { mood: v } ) } placeholder={ __( 'e.g., Happy, Tired, Excited', 'reactions-for-indieweb' ) } />
					<TextControl label={ __( 'Emoji', 'reactions-for-indieweb' ) } value={ emoji || '' } onChange={ ( v ) => setAttributes( { emoji: v } ) } />
					<RangeControl label={ __( 'Intensity', 'reactions-for-indieweb' ) } value={ intensity } onChange={ ( v ) => setAttributes( { intensity: v } ) } min={ 1 } max={ 5 } />
				</PanelBody>
				<PanelBody title={ __( 'Timing', 'reactions-for-indieweb' ) }>
					<Button variant="secondary" onClick={ () => setShowDatePicker( true ) }>
						{ moodAt ? new Date( moodAt ).toLocaleString() : __( 'Set date/time', 'reactions-for-indieweb' ) }
					</Button>
					{ showDatePicker && <Popover onClose={ () => setShowDatePicker( false ) }><DateTimePicker currentDate={ moodAt } onChange={ ( v ) => { setAttributes( { moodAt: v } ); setShowDatePicker( false ); } } /></Popover> }
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="mood-card-inner h-entry">
					<div className="mood-emoji-display">
						<span className="emoji-large">{ emoji || '😊' }</span>
						<div className="intensity-dots">
							{ Array.from( { length: 5 }, ( _, i ) => <span key={ i } className={ `dot ${ i < intensity ? 'filled' : '' }` } /> ) }
						</div>
					</div>
					<div className="mood-info">
						<RichText tagName="h3" className="mood-text p-name" value={ mood } onChange={ ( v ) => setAttributes( { mood: v } ) } placeholder={ __( 'How are you feeling?', 'reactions-for-indieweb' ) } />
						<RichText tagName="p" className="mood-note p-content" value={ note } onChange={ ( v ) => setAttributes( { note: v } ) } placeholder={ __( 'Add a note...', 'reactions-for-indieweb' ) } />
					</div>
				</div>
			</div>
		</>
	);
}
