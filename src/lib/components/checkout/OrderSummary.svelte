<script lang="ts">
	import { formatCurrency } from '$lib/utils';
	import { PUBLIC_DEFAULT_CURRENCY, PUBLIC_VENDURE_MULTI, PUBLIC_HOMEDELIVERY_PRICE } from '$env/static/public';
	import * as m from '$lib/paraglide/messages';

	interface Props {
		order: any;
		errorMessage: string;
	}

	let { order, errorMessage }: Props = $props();
	const toNum = parseInt(PUBLIC_HOMEDELIVERY_PRICE)
</script>

<section class="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5">
	<div class="border-b border-gray-200 bg-gray-50 px-6 py-4">
		<h2 class="text-lg font-semibold text-gray-900">{m.order_summary()}</h2>
	</div>
	{#if order}
		<div class="p-6">
			<dl class="space-y-4 text-sm">
				{#if order.discounts.length > 0}
					{#each order.discounts as discount}
						<div class="flex justify-between">
							<dt class="font-medium text-gray-700">
								{m.discount()}
								<span
									class="ml-2 rounded-full bg-lime-50 px-2 py-0.5 text-xs font-medium text-lime-700"
									>{discount.description}</span
								>
							</dt>
							<dd class="text-gray-900">
								{formatCurrency(discount.amountWithTax, PUBLIC_DEFAULT_CURRENCY)}
							</dd>
						</div>
					{/each}
				{/if}
				<div class="flex justify-between">
					<dt class="font-medium text-gray-700">{m.subtotal()}</dt>
					<dd class="text-gray-900">
						{formatCurrency(order.subTotal, PUBLIC_DEFAULT_CURRENCY)}
					</dd>
				</div>
				{#if order.taxSummary.length > 0}
					{#each order.taxSummary as tax}
						{#if tax.taxTotal > 0}
							<div class="flex justify-between">
								<dt class="font-medium text-gray-700">{tax.description}</dt>
								<dd class="text-gray-900">
									{formatCurrency(tax.taxTotal, PUBLIC_DEFAULT_CURRENCY)}
								</dd>
							</div>
						{/if}
					{/each}
				{/if}
				{#if order.shippingLines.length > 0}
					{#if PUBLIC_VENDURE_MULTI === 'multi'}
						<div class="flex justify-between">
							<dt class="font-medium text-gray-700">{m.home_delivery()}</dt>
							<dd class="text-gray-900">
								{formatCurrency(toNum, PUBLIC_DEFAULT_CURRENCY)}
							</dd>
						</div>
					{:else}
						{#each order.shippingLines as shippingLine}
							<div class="flex justify-between">
								<dt class="font-medium text-gray-700">
									{shippingLine.shippingMethod.name}
								</dt>
								<dd class="text-gray-900">
									{formatCurrency(shippingLine.priceWithTax, PUBLIC_DEFAULT_CURRENCY)}
								</dd>
							</div>
						{/each}
					{/if}
				{/if}
				<div class="flex justify-between border-t border-gray-200 pt-4">
					<dt class="text-base font-medium text-gray-900">{m.total()}</dt>
					<dd class="text-base font-medium text-gray-900">
						{formatCurrency(order.totalWithTax, PUBLIC_DEFAULT_CURRENCY)}
					</dd>
				</div>
			</dl>
			{#if errorMessage}
				<p class="mt-4 text-sm text-red-600">{errorMessage}</p>
			{/if}
		</div>
	{/if}
</section>
