/**
 * Reactions for IndieWeb - Syndication Controls Component
 *
 * Displays per-post syndication opt-out toggles for connected services.
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
	ToggleControl,
	PanelRow,
	__experimentalVStack as VStack,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { STORE_NAME } from '../../stores/post-kinds';

/**
 * Get available syndication services from global config.
 *
 * @return {Object} Services configuration.
 */
function getSyndicationServices() {
	return window.reactionsIndieWeb?.syndicationServices || {};
}

/**
 * Syndication Controls Component
 *
 * Renders opt-out toggles for each connected syndication service
 * that matches the current post kind.
 *
 * @param {Object} props      Component props.
 * @param {string} props.kind Current post kind slug.
 * @return {JSX.Element|null} The syndication controls or null if none available.
 */
export default function SyndicationControls( { kind } ) {
	const services = getSyndicationServices();

	// Filter services for this kind.
	const availableServices = Object.entries( services ).filter(
		( [ , config ] ) => config.kind === kind && config.connected
	);

	// Get current syndication settings from meta.
	const syndicationMeta = useSelect(
		( select ) => {
			const getKindMeta = select( STORE_NAME ).getKindMeta;
			const meta = {};
			availableServices.forEach( ( [ serviceId ] ) => {
				meta[ serviceId ] = getKindMeta( `syndicate_${ serviceId }` );
			} );
			return meta;
		},
		[ availableServices ]
	);

	const { updateKindMeta } = useDispatch( STORE_NAME );

	// Don't render if no services available.
	if ( availableServices.length === 0 ) {
		return null;
	}

	return (
		<VStack spacing={ 2 } className="reactions-indieweb-syndication-controls">
			<PanelRow>
				<span className="components-base-control__label">
					{ __( 'Syndication', 'reactions-for-indieweb' ) }
				</span>
			</PanelRow>
			{ availableServices.map( ( [ serviceId, config ] ) => {
				// Default to true (syndicate by default) if not set.
				const isEnabled = syndicationMeta[ serviceId ] !== false;

				return (
					<ToggleControl
						key={ serviceId }
						label={ config.name }
						help={
							isEnabled
								? __( 'Will sync on publish', 'reactions-for-indieweb' )
								: __( 'Will not sync', 'reactions-for-indieweb' )
						}
						checked={ isEnabled }
						onChange={ ( value ) =>
							updateKindMeta( `syndicate_${ serviceId }`, value )
						}
					/>
				);
			} ) }
		</VStack>
	);
}
