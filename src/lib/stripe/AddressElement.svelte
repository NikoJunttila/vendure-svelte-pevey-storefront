<script lang="ts">
	import type { StripeAddressElement, StripeAddressElementOptions } from '@stripe/stripe-js';
	import { onMount, createEventDispatcher } from 'svelte';
	import { dev } from '$app/environment';
	import { stripeElements } from './stores';

	interface Props {
		addressElementOptions?: StripeAddressElementOptions | undefined;
		addressContainer?: StripeAddressElement | undefined;
	}

	let {
		addressElementOptions = $bindable(undefined),
		addressContainer = $bindable(undefined)
	}: Props = $props();

	const dispatch = createEventDispatcher();

	// see all options available at
	// https://stripe.com/docs/js/elements_object/create_address_element
	if (!addressElementOptions) addressElementOptions = { mode: 'shipping' };
	addressElementOptions.mode = addressElementOptions.mode || 'shipping';
	addressElementOptions.autocomplete = addressElementOptions.autocomplete || { mode: 'automatic' };
	addressElementOptions.allowedCountries = addressElementOptions.allowedCountries || ['FI'];
	addressElementOptions.blockPoBox = addressElementOptions.blockPoBox || false;
	addressElementOptions.contacts = addressElementOptions.contacts || [];
	addressElementOptions.defaultValues = addressElementOptions.defaultValues || {};
	addressElementOptions.fields = addressElementOptions.fields || { phone: 'always' };
	addressElementOptions.validation = addressElementOptions.validation || {
		phone: { required: 'never' }
	};
	addressElementOptions.display = addressElementOptions.display || { name: 'split' };

	let mounted = $state(false);

	let elements = $derived($stripeElements);

	onMount(() => {
		mounted = true;
		return () => {
			mounted = false;
		};
	});

	const addressElement = (node: HTMLElement) => {
		try {
			// @ts-ignore
			addressContainer = $stripeElements?.create('address', addressElementOptions);
			addressContainer?.mount(node);
			addressContainer?.on('change', (e: any) => {
				dispatch('change', e);
				if (e.complete) dispatch('complete', e.value);
			});
			addressContainer?.on('ready', (e: any) => dispatch('ready', e));
			addressContainer?.on('focus', (e: any) => dispatch('focus', e));
			addressContainer?.on('blur', (e: any) => dispatch('blur', e));
		} catch (e) {
			if (dev) console.error(e);
		}
		return {
			destroy: () => {
				if (addressContainer) addressContainer.destroy();
				stripeElements.set(undefined);
			}
		};
	};
</script>

{#if mounted && elements}
	<div use:addressElement></div>
{/if}
