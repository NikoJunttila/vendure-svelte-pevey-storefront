/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
	'\nquery ActiveChannel {\n  activeChannel {\n    id\n    code\n    defaultLanguageCode\n    availableLanguageCodes\n    availableCurrencyCodes\n    defaultCurrencyCode\n    seller{\n      name\n    }\n  }\n}    \n':
		types.ActiveChannelDocument,
	'\n\tfragment Collection on Collection {\n\t\tid\n\t\tname\n\t\tslug\n\t\tdescription\n\t\tparent {\n\t\t\tid\n\t\t\tname\n\t\t\tslug\n\t\t}\n\t\tbreadcrumbs {\n\t\t\tid\n\t\t\tname\n\t\t\tslug\n\t\t}\n\t\tfeaturedAsset {\n\t\t\tid\n\t\t\tpreview\n\t\t}\n\t}\n':
		types.CollectionFragmentDoc,
	'\n\tquery GetCollection($slug: String!, $skip: Int, $take: Int) {\n\t\tcollection(slug: $slug) {\n\t\t\t...Collection\n\t\t}\n\t\tsearch(\n\t\t\tinput: {\n\t\t\t\tcollectionSlug: $slug,\n\t\t\t\tgroupByProduct: true,\n\t\t\t\tskip: $skip,\n\t\t\t\ttake: $take \n\t\t\t}\n\t\t) {\n\t\t\titems {\n\t\t\t\t...SearchResult\n\t\t\t}\n\t\t\ttotalItems\n\t\t}\n\t}\n':
		types.GetCollectionDocument,
	'\n\tquery GetCollections($options: CollectionListOptions) {\n\t\tcollections(options: $options) {\n\t\t\titems {\n\t\t\t\t...Collection\n\t\t\t}\n\t\t\ttotalItems\n\t\t}\n\t}\n':
		types.GetCollectionsDocument,
	'\n\tquery GetTopLevelCollections {\n\t\tcollections(options: { topLevelOnly: true }) {\n\t\t\titems {\n\t\t\t\t...Collection\n\t\t\t}\n\t\t\ttotalItems\n\t\t}\n\t}\n':
		types.GetTopLevelCollectionsDocument,
	'\n\tfragment Customer on Customer {\n\t\t__typename\n\t\tid\n\t\tfirstName\n\t\tlastName\n\t\temailAddress\n\t\tphoneNumber\n\t\taddresses {\n\t\t...Address\n\t\t}\n \t\torders {\n      \t\ttotalItems\n      \t\titems {\n        \t\tstate\n        \t\ttotalWithTax\n        \t\tid\n        \t\tcode\n        \t\torderPlacedAt\n        \t\tlines {\n          \t\t\tid\n\t\t\t\t\tquantity\n          \t\t\tproductVariant {\n            \t\t\tid\n            \t\t\tsku\n            \t\t\tname\n\t\t\t\t\t\tpriceWithTax\n          \t\t\t}\n        \t\t}\n      \t\t}\n    \t}\n\t}\n':
		types.CustomerFragmentDoc,
	'\n\tfragment Address on Address {\n\t\tid\n\t\tfullName\n\t\tcompany\n\t\tstreetLine1\n\t\tstreetLine2\n\t\tcity\n\t\tprovince\n\t\tpostalCode\n\t\tcountry {\n\t\t\tcode\n\t\t\tname\n\t\t}\n\t\tphoneNumber\n\t\tdefaultShippingAddress\n\t\tdefaultBillingAddress\n\t}\n':
		types.AddressFragmentDoc,
	'\n\tquery GetCustomer {\n\t\tactiveCustomer {\n\t\t\t...Customer\n\t\t}\n\t}\n':
		types.GetCustomerDocument,
	'\n\tmutation updateCustomer($input: UpdateCustomerInput!){\n  \t\tupdateCustomer(input:$input){\n    \t__typename\n\t\tid\n\t\tfirstName\n\t\tlastName\n\t\temailAddress\n\t\tphoneNumber\n \t\torders {\n      \t\ttotalItems\n      \t\titems {\n        \t\tstate\n        \t\ttotalWithTax\n        \t\tid\n        \t\tcode\n        \t\torderPlacedAt\n        \t\tlines {\n          \t\t\tid\n\t\t\t\t\tquantity\n          \t\t\tproductVariant {\n            \t\t\tid\n            \t\t\tsku\n            \t\t\tname\n\t\t\t\t\t\tpriceWithTax\n          \t\t\t}\n        \t\t}\n      \t\t}\n    \t}\n  }}\n':
		types.UpdateCustomerDocument,
	'\n\tmutation updateCustomerAddress($input: UpdateAddressInput!){\n\t\tupdateCustomerAddress(input:$input){\n\t\t...Address\n\t\t}\n\t}\t\n':
		types.UpdateCustomerAddressDocument,
	'\n\tmutation LogIn($username: String!, $password: String!, $rememberMe: Boolean!) {\n\t\tlogin(username: $username, password: $password, rememberMe: $rememberMe) {\n\t\t\t... on CurrentUser {\n\t\t\t\tid\n\t\t\t}\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n':
		types.LogInDocument,
	'\n\tmutation LogOut {\n\t\tlogout {\n\t\t\tsuccess\n\t\t}\n\t}\n': types.LogOutDocument,
	'\n\tmutation Register($input: RegisterCustomerInput!) {\n\t\tregisterCustomerAccount(input: $input) {\n\t\t\t... on Success {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t\t...on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n':
		types.RegisterDocument,
	'\n\tmutation VerifyCustomerAccount($token: String!) {\n\t\tverifyCustomerAccount(token: $token) {\n\t\t\t...on CurrentUser {\n\t\t\t\tid\n\t\t\t\tidentifier\n\t\t\t}\n\t\t\t...on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n':
		types.VerifyCustomerAccountDocument,
	'\n\tmutation RequestPasswordReset($emailAddress: String!) {\n\t\trequestPasswordReset(emailAddress: $emailAddress) {\n\t\t\t... on Success {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n':
		types.RequestPasswordResetDocument,
	'\n\tmutation ResetPassword($token: String! $password: String!) {\n\t\tresetPassword(token: $token password: $password) {\n\t\t\t...on CurrentUser {\n\t\t\t\tid\n\t\t\t\tidentifier\n\t\t\t}\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n':
		types.ResetPasswordDocument,
	'\n\tquery GetCustomerOrders {\n\t\tactiveCustomer {\n\t\t\torders {\n\t\t\t\titems {\n\t\t\t\t\t...Order\n\t\t\t\t}\n\t\t\t\ttotalItems\n\t\t\t}\n\t\t}\n\t}\n':
		types.GetCustomerOrdersDocument,
	'\n\tquery GetCustomerAddresses {\n\t\tactiveCustomer {\n\t\t\taddresses {\n\t\t\t\t...Address\n\t\t\t}\n\t\t}\n\t}\n':
		types.GetCustomerAddressesDocument,
	'\n\tmutation CreateCustomerAddress($input: CreateAddressInput!) {\n\t\tcreateCustomerAddress(input: $input) {\n\t\t\tid\n\t\t\tfullName\n\t\t\tcompany\n\t\t\tstreetLine1\n\t\t\tstreetLine2\n\t\t\tcity\n\t\t\tprovince\n\t\t\tpostalCode\n\t\t\tcountry {\n\t\t\t\tid\n\t\t\t\tcode\n\t\t\t\tname\n\t\t\t}\n\t\t\tphoneNumber\n\t\t\tdefaultShippingAddress\n\t\t\tdefaultBillingAddress\n\t\t}\n\t}\n':
		types.CreateCustomerAddressDocument,
	'\nmutation paytrailPayment {\n  createPaytrailPaymentIntent{\n    href\n  }\n}\n':
		types.PaytrailPaymentDocument,
	'\nmutation paytrailMultiPayment {\n  createMultiPTintent{\n    href\n  }\n}\n':
		types.PaytrailMultiPaymentDocument,
	'\n\tmutation createStripePaymentIntent {\n\t  createStripePaymentIntent\n\t}\n  ':
		types.CreateStripePaymentIntentDocument,
	'\n\tfragment Order on Order {\n\t\tid\n\t\tcode\n\t\tstate\n\t\tlines {\n\t\t\tid\n\t\t\tquantity\n\t\t\tlinePriceWithTax\n\t\t\tproductVariant {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tsku\n\t\t\t\tproduct {\n\t\t\t\t\tname\n\t\t\t\t\tslug\n\t\t\t\t}\n\t\t\t\toptions {\n\t\t\t\t\tcode\n\t\t\t\t\tname\n\t\t\t\t\tgroup {\n\t\t\t\t\t\tcode\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tfeaturedAsset {\n\t\t\t\tid\n\t\t\t\tpreview\n\t\t\t}\n\t\t}\n\t\torderPlacedAt\n\t}\n':
		types.OrderFragmentDoc,
	'\n\tfragment ActiveOrder on Order {\n\t\t__typename\n\t\tid\n\t\tcode\n\t\tstate\n\t\torderPlacedAt\n\t\tcurrencyCode\n\t\ttotalQuantity\n\t\tsubTotal\n\t\tshipping\n\t\ttotal\n\t\ttotalWithTax\n\t\ttaxSummary {\n\t\t\tdescription\n\t\t\ttaxRate\n\t\t\ttaxBase\n\t\t\ttaxTotal\n\t\t}\n\t\tlines {\n\t\t\tid\n\t\t\tunitPrice\n\t\t\tunitPriceWithTax\n\t\t\tquantity\n\t\t\tlinePrice\n\t\t\tlinePriceWithTax\n\t\t\tproductVariant {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tsku\n\t\t\t\tproduct {\n\t\t\t\t\tslug\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t\toptions {\n\t\t\t\t\tcode\n\t\t\t\t\tname\n\t\t\t\t\tgroup {\n\t\t\t\t\t\tcode\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tfeaturedAsset {\n\t\t\t\tid\n\t\t\t\tpreview\n\t\t\t}\n\t\t}\n\t\tshippingLines {\n\t\t\tshippingMethod {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tdescription\n\t\t\t}\n\t\t\tpriceWithTax\n\t\t}\n\t\tdiscounts {\n\t\t\tdescription\n\t\t\tamountWithTax\n\t\t}\n\t\tcouponCodes\n\t\tpromotions {\n\t\t\tid\n\t\t\tstartsAt\n\t\t\tendsAt\n\t\t\tcouponCode\n\t\t\tperCustomerUsageLimit\n\t\t\tusageLimit\n\t\t\tname\n\t\t\tdescription\n\t\t\tenabled\n\t\t}\n\t\tsurcharges {\n\t\t\tdescription\n\t\t\tsku\n\t\t\tprice\n\t\t\tpriceWithTax\n\t\t\ttaxRate\n\t\t}\n\t\tpayments {\n\t\t\tid\n\t\t\tamount\n\t\t\terrorMessage\n\t\t\tmethod\n\t\t\tstate\n\t\t\ttransactionId\n\t\t\tcreatedAt\n\t\t}\n\t\tfulfillments {\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tlines {\n\t\t\t\torderLine {\n\t\t\t\t\tid\n\t\t\t\t\tproductVariant {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tsku\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tquantity\n\t\t\t}\n\t\t\tstate\n\t\t\tmethod\n\t\t\ttrackingCode\n\t\t}\n\t}\n':
		types.ActiveOrderFragmentDoc,
	'\n\tfragment ShippingMethodQuote on ShippingMethodQuote {\n\t\tid\n\t\tprice\n\t\tpriceWithTax\n\t\tcode\n\t\tname\n\t\tdescription\n\t\tmetadata\n\t}\n':
		types.ShippingMethodQuoteFragmentDoc,
	'\n\tquery GetOrderByCode($code: String!) {\n\t\torderByCode(code: $code) {\n\t\t\t...ActiveOrder\n\t\t}\n\t}\n':
		types.GetOrderByCodeDocument,
	'\n\tquery GetActiveOrder {\n\t\tactiveOrder {\n\t\t\t...ActiveOrder\n\t\t}\n\t}\n':
		types.GetActiveOrderDocument,
	'\n\tmutation AddItemToOrder($variantId: ID!, $quantity: Int!) {\n\t\taddItemToOrder(productVariantId: $variantId, quantity: $quantity) {\n\t\t\t__typename\n\t\t\t...ActiveOrder\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t\t... on InsufficientStockError {\n\t\t\t\tquantityAvailable\n\t\t\t\torder {\n\t\t\t\t\t...ActiveOrder\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n':
		types.AddItemToOrderDocument,
	'\n\tmutation RemoveOrderLine($orderLineId: ID!) {\n\t\tremoveOrderLine(orderLineId: $orderLineId) {\n\t\t\t...ActiveOrder\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n':
		types.RemoveOrderLineDocument,
	'\n\tmutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {\n\t\tadjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {\n\t\t\t...ActiveOrder\n\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n':
		types.AdjustOrderLineDocument,
	'\n\tmutation RemoveAllOrderLines {\n\t\tremoveAllOrderLines {\n\t\t\t...ActiveOrder\n\t\t}\n\t}\n':
		types.RemoveAllOrderLinesDocument,
	'\n\tmutation AddOrderCouponCode($couponCode: String!) {\n\t\tapplyCouponCode(couponCode: $couponCode) {\n\t\t\t...ActiveOrder\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n':
		types.AddOrderCouponCodeDocument,
	'\n\tmutation RemoveOrderCouponCode($couponCode: String!) {\n\t\tremoveCouponCode(couponCode: $couponCode) {\n\t\t\t...ActiveOrder\n\t\t}\n\t}\n':
		types.RemoveOrderCouponCodeDocument,
	'\n\tmutation SetCustomerForOrder($input: CreateCustomerInput!) {\n\t\tsetCustomerForOrder(input: $input) {\n\t\t\t...on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n':
		types.SetCustomerForOrderDocument,
	'\n\tmutation SetOrderShippingAddress($input: CreateAddressInput!) {\n\t\tsetOrderShippingAddress(input: $input) {\n\t\t\t...on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n':
		types.SetOrderShippingAddressDocument,
	'\n\tmutation SetOrderBillingAddress($input: CreateAddressInput!) {\n\t\tsetOrderBillingAddress(input: $input) {\n\t\t\t...on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n':
		types.SetOrderBillingAddressDocument,
	'\n\tquery GetOrderShippingMethods {\n\t\teligibleShippingMethods {\n\t\t\t...ShippingMethodQuote\n\t\t}\n\t}\n':
		types.GetOrderShippingMethodsDocument,
	'\n\tmutation SetOrderShippingMethod($id: [ID!]!) {\n\t\tsetOrderShippingMethod(shippingMethodId: $id) {\n\t\t\t...ActiveOrder\n\t\t\t...on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n':
		types.SetOrderShippingMethodDocument,
	'\n\tquery GetOrderPaymentMethods {\n\t\teligiblePaymentMethods {\n\t\t\tid\n\t\t\tname\n\t\t\tcode\n\t\t\tisEligible\n\t\t}\n\t}\n':
		types.GetOrderPaymentMethodsDocument,
	'\n\tmutation AddOrderPayment($input: PaymentInput!) {\n\t\taddPaymentToOrder(input: $input) {\n\t\t\t... on Order {\n\t\t\t\tid\n\t\t\t\tpayments {\n\t\t\t\t\tid\n\t\t\t\t\tamount\n\t\t\t\t\terrorMessage\n\t\t\t\t\tmethod\n\t\t\t\t\tstate\n\t\t\t\t\ttransactionId\n\t\t\t\t\tcreatedAt\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n':
		types.AddOrderPaymentDocument,
	'\n\tmutation TransitionOrderToState($state: String!) {\n\t\ttransitionOrderToState(state: $state) {\n\t\t\t...ActiveOrder\n\t\t\t...on OrderStateTransitionError {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t\ttransitionError\n\t\t\t\tfromState\n\t\t\t\ttoState\n\t\t\t}\n\t\t}\n\t}\n':
		types.TransitionOrderToStateDocument,
	'\n\tfragment Product on Product {\n\t\tid\n\t\tname\n\t\tslug\n\t\tdescription\n\t\tfeaturedAsset {\n\t\t\tid\n\t\t\tpreview\n\t\t}\n\t\tvariants {\n\t\t\tid\n\t\t\tprice\n\t\t\tstockLevel\n\t\t}\n\t}\n':
		types.ProductFragmentDoc,
	'\n\tfragment ProductDetail on Product {\n\t\tid\n\t\tname\n\t\tslug\n\t\tdescription\n\t\tfeaturedAsset {\n\t\t\t...Asset\n\t\t}\n\t\tassets {\n\t\t\t...Asset\n\t\t}\n\t\toptionGroups {\n\t\t\tid\n\t\t\tcode\n\t\t\tname\n\t\t\toptions {\n\t\t\t\tid\n\t\t\t\tcode\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t\tvariants {\n\t\t\tid\n\t\t\tname\n\t\t\tsku\n\t\t\tstockLevel\n\t\t\tcurrencyCode\n\t\t\tprice\n\t\t\tpriceWithTax\n\t\t\tfacetValues {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tfacet {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t\toptions {\n\t\t\t\tid\n\t\t\t\tgroupId\n\t\t\t\tcode\n\t\t\t\tname\n\t\t\t}\n\t\t\tfeaturedAsset {\n\t\t\t\t...Asset\n\t\t\t}\n\t\t\tassets {\n\t\t\t\t...Asset\n\t\t\t}\n\t\t}\n\t\tcollections {\n\t\t\tbreadcrumbs {\n\t\t\tname\n\t\t\tslug\n\t\t\t}\n\t\t}\n\t}\n':
		types.ProductDetailFragmentDoc,
	'\n\tfragment SearchResult on SearchResult {\n\t\tproductName\n\t\tslug\n\t\tdescription\n\t\tproductId\n\t\tproductAsset {\n\t\t\tid\n\t\t\tpreview\n\t\t}\n\t\tprice {\n\t\t\t... on SinglePrice {\n\t\t\t\tvalue\n\t\t\t}\n\t\t\t... on PriceRange {\n\t\t\t\tmin\n\t\t\t\tmax\n\t\t\t}\n\t\t}\n\t\tfacetIds\n\t\tfacetValueIds\n\t\tcurrencyCode\n\t\tproductVariantId\n\t\tinStock\n\t}\n':
		types.SearchResultFragmentDoc,
	'\n\tfragment Asset on Asset {\n\t\tid\n\t\tcreatedAt\n\t\tupdatedAt\n\t\tname\n\t\ttype\n\t\tfileSize\n\t\tmimeType\n\t\twidth\n\t\theight\n\t\tsource\n\t\tpreview\n\t\tfocalPoint {\n\t\t\tx\n\t\t\ty\n\t\t}\n\t\ttags {\n\t\t\tid\n\t\t\tvalue\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n':
		types.AssetFragmentDoc,
	'\n\tquery GetProducts($options: ProductListOptions) {\n\t\tproducts(options: $options) {\n\t\t\titems {\n\t\t\t\t...ProductDetail\n\t\t\t}\n\t\t\ttotalItems\n\t\t}\n\t}\n':
		types.GetProductsDocument,
	'\n\tquery GetProduct($slug: String!) {\n\t\tproduct(slug: $slug) {\n\t\t\t...ProductDetail\n\t\t}\n\t}\n':
		types.GetProductDocument,
	'\n\tfragment FacetValueResult on FacetValueResult{\n\t\tfacetValue {\n\t\t    id\n        \tname\n        \tfacet {\n          \t\tid\n          \t\tname\n        \t}\n\t\t}\n\t\tcount\n\t}\n':
		types.FacetValueResultFragmentDoc,
	'\n\tquery SearchProducts($input: SearchInput!) {\n\t\tsearch(input: $input) {\n\t\t\titems {\n\t\t\t\t...SearchResult\n\t\t\t}\n\t\t\ttotalItems\n\t\t\tfacetValues {\n\t\t\t...FacetValueResult\n    \t\t}\n\t\t}\n\t}\n':
		types.SearchProductsDocument
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\nquery ActiveChannel {\n  activeChannel {\n    id\n    code\n    defaultLanguageCode\n    availableLanguageCodes\n    availableCurrencyCodes\n    defaultCurrencyCode\n    seller{\n      name\n    }\n  }\n}    \n'
): (typeof documents)['\nquery ActiveChannel {\n  activeChannel {\n    id\n    code\n    defaultLanguageCode\n    availableLanguageCodes\n    availableCurrencyCodes\n    defaultCurrencyCode\n    seller{\n      name\n    }\n  }\n}    \n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tfragment Collection on Collection {\n\t\tid\n\t\tname\n\t\tslug\n\t\tdescription\n\t\tparent {\n\t\t\tid\n\t\t\tname\n\t\t\tslug\n\t\t}\n\t\tbreadcrumbs {\n\t\t\tid\n\t\t\tname\n\t\t\tslug\n\t\t}\n\t\tfeaturedAsset {\n\t\t\tid\n\t\t\tpreview\n\t\t}\n\t}\n'
): (typeof documents)['\n\tfragment Collection on Collection {\n\t\tid\n\t\tname\n\t\tslug\n\t\tdescription\n\t\tparent {\n\t\t\tid\n\t\t\tname\n\t\t\tslug\n\t\t}\n\t\tbreadcrumbs {\n\t\t\tid\n\t\t\tname\n\t\t\tslug\n\t\t}\n\t\tfeaturedAsset {\n\t\t\tid\n\t\t\tpreview\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tquery GetCollection($slug: String!, $skip: Int, $take: Int) {\n\t\tcollection(slug: $slug) {\n\t\t\t...Collection\n\t\t}\n\t\tsearch(\n\t\t\tinput: {\n\t\t\t\tcollectionSlug: $slug,\n\t\t\t\tgroupByProduct: true,\n\t\t\t\tskip: $skip,\n\t\t\t\ttake: $take \n\t\t\t}\n\t\t) {\n\t\t\titems {\n\t\t\t\t...SearchResult\n\t\t\t}\n\t\t\ttotalItems\n\t\t}\n\t}\n'
): (typeof documents)['\n\tquery GetCollection($slug: String!, $skip: Int, $take: Int) {\n\t\tcollection(slug: $slug) {\n\t\t\t...Collection\n\t\t}\n\t\tsearch(\n\t\t\tinput: {\n\t\t\t\tcollectionSlug: $slug,\n\t\t\t\tgroupByProduct: true,\n\t\t\t\tskip: $skip,\n\t\t\t\ttake: $take \n\t\t\t}\n\t\t) {\n\t\t\titems {\n\t\t\t\t...SearchResult\n\t\t\t}\n\t\t\ttotalItems\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tquery GetCollections($options: CollectionListOptions) {\n\t\tcollections(options: $options) {\n\t\t\titems {\n\t\t\t\t...Collection\n\t\t\t}\n\t\t\ttotalItems\n\t\t}\n\t}\n'
): (typeof documents)['\n\tquery GetCollections($options: CollectionListOptions) {\n\t\tcollections(options: $options) {\n\t\t\titems {\n\t\t\t\t...Collection\n\t\t\t}\n\t\t\ttotalItems\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tquery GetTopLevelCollections {\n\t\tcollections(options: { topLevelOnly: true }) {\n\t\t\titems {\n\t\t\t\t...Collection\n\t\t\t}\n\t\t\ttotalItems\n\t\t}\n\t}\n'
): (typeof documents)['\n\tquery GetTopLevelCollections {\n\t\tcollections(options: { topLevelOnly: true }) {\n\t\t\titems {\n\t\t\t\t...Collection\n\t\t\t}\n\t\t\ttotalItems\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tfragment Customer on Customer {\n\t\t__typename\n\t\tid\n\t\tfirstName\n\t\tlastName\n\t\temailAddress\n\t\tphoneNumber\n\t\taddresses {\n\t\t...Address\n\t\t}\n \t\torders {\n      \t\ttotalItems\n      \t\titems {\n        \t\tstate\n        \t\ttotalWithTax\n        \t\tid\n        \t\tcode\n        \t\torderPlacedAt\n        \t\tlines {\n          \t\t\tid\n\t\t\t\t\tquantity\n          \t\t\tproductVariant {\n            \t\t\tid\n            \t\t\tsku\n            \t\t\tname\n\t\t\t\t\t\tpriceWithTax\n          \t\t\t}\n        \t\t}\n      \t\t}\n    \t}\n\t}\n'
): (typeof documents)['\n\tfragment Customer on Customer {\n\t\t__typename\n\t\tid\n\t\tfirstName\n\t\tlastName\n\t\temailAddress\n\t\tphoneNumber\n\t\taddresses {\n\t\t...Address\n\t\t}\n \t\torders {\n      \t\ttotalItems\n      \t\titems {\n        \t\tstate\n        \t\ttotalWithTax\n        \t\tid\n        \t\tcode\n        \t\torderPlacedAt\n        \t\tlines {\n          \t\t\tid\n\t\t\t\t\tquantity\n          \t\t\tproductVariant {\n            \t\t\tid\n            \t\t\tsku\n            \t\t\tname\n\t\t\t\t\t\tpriceWithTax\n          \t\t\t}\n        \t\t}\n      \t\t}\n    \t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tfragment Address on Address {\n\t\tid\n\t\tfullName\n\t\tcompany\n\t\tstreetLine1\n\t\tstreetLine2\n\t\tcity\n\t\tprovince\n\t\tpostalCode\n\t\tcountry {\n\t\t\tcode\n\t\t\tname\n\t\t}\n\t\tphoneNumber\n\t\tdefaultShippingAddress\n\t\tdefaultBillingAddress\n\t}\n'
): (typeof documents)['\n\tfragment Address on Address {\n\t\tid\n\t\tfullName\n\t\tcompany\n\t\tstreetLine1\n\t\tstreetLine2\n\t\tcity\n\t\tprovince\n\t\tpostalCode\n\t\tcountry {\n\t\t\tcode\n\t\t\tname\n\t\t}\n\t\tphoneNumber\n\t\tdefaultShippingAddress\n\t\tdefaultBillingAddress\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tquery GetCustomer {\n\t\tactiveCustomer {\n\t\t\t...Customer\n\t\t}\n\t}\n'
): (typeof documents)['\n\tquery GetCustomer {\n\t\tactiveCustomer {\n\t\t\t...Customer\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation updateCustomer($input: UpdateCustomerInput!){\n  \t\tupdateCustomer(input:$input){\n    \t__typename\n\t\tid\n\t\tfirstName\n\t\tlastName\n\t\temailAddress\n\t\tphoneNumber\n \t\torders {\n      \t\ttotalItems\n      \t\titems {\n        \t\tstate\n        \t\ttotalWithTax\n        \t\tid\n        \t\tcode\n        \t\torderPlacedAt\n        \t\tlines {\n          \t\t\tid\n\t\t\t\t\tquantity\n          \t\t\tproductVariant {\n            \t\t\tid\n            \t\t\tsku\n            \t\t\tname\n\t\t\t\t\t\tpriceWithTax\n          \t\t\t}\n        \t\t}\n      \t\t}\n    \t}\n  }}\n'
): (typeof documents)['\n\tmutation updateCustomer($input: UpdateCustomerInput!){\n  \t\tupdateCustomer(input:$input){\n    \t__typename\n\t\tid\n\t\tfirstName\n\t\tlastName\n\t\temailAddress\n\t\tphoneNumber\n \t\torders {\n      \t\ttotalItems\n      \t\titems {\n        \t\tstate\n        \t\ttotalWithTax\n        \t\tid\n        \t\tcode\n        \t\torderPlacedAt\n        \t\tlines {\n          \t\t\tid\n\t\t\t\t\tquantity\n          \t\t\tproductVariant {\n            \t\t\tid\n            \t\t\tsku\n            \t\t\tname\n\t\t\t\t\t\tpriceWithTax\n          \t\t\t}\n        \t\t}\n      \t\t}\n    \t}\n  }}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation updateCustomerAddress($input: UpdateAddressInput!){\n\t\tupdateCustomerAddress(input:$input){\n\t\t...Address\n\t\t}\n\t}\t\n'
): (typeof documents)['\n\tmutation updateCustomerAddress($input: UpdateAddressInput!){\n\t\tupdateCustomerAddress(input:$input){\n\t\t...Address\n\t\t}\n\t}\t\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation LogIn($username: String!, $password: String!, $rememberMe: Boolean!) {\n\t\tlogin(username: $username, password: $password, rememberMe: $rememberMe) {\n\t\t\t... on CurrentUser {\n\t\t\t\tid\n\t\t\t}\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation LogIn($username: String!, $password: String!, $rememberMe: Boolean!) {\n\t\tlogin(username: $username, password: $password, rememberMe: $rememberMe) {\n\t\t\t... on CurrentUser {\n\t\t\t\tid\n\t\t\t}\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation LogOut {\n\t\tlogout {\n\t\t\tsuccess\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation LogOut {\n\t\tlogout {\n\t\t\tsuccess\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation Register($input: RegisterCustomerInput!) {\n\t\tregisterCustomerAccount(input: $input) {\n\t\t\t... on Success {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t\t...on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation Register($input: RegisterCustomerInput!) {\n\t\tregisterCustomerAccount(input: $input) {\n\t\t\t... on Success {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t\t...on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation VerifyCustomerAccount($token: String!) {\n\t\tverifyCustomerAccount(token: $token) {\n\t\t\t...on CurrentUser {\n\t\t\t\tid\n\t\t\t\tidentifier\n\t\t\t}\n\t\t\t...on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation VerifyCustomerAccount($token: String!) {\n\t\tverifyCustomerAccount(token: $token) {\n\t\t\t...on CurrentUser {\n\t\t\t\tid\n\t\t\t\tidentifier\n\t\t\t}\n\t\t\t...on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation RequestPasswordReset($emailAddress: String!) {\n\t\trequestPasswordReset(emailAddress: $emailAddress) {\n\t\t\t... on Success {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation RequestPasswordReset($emailAddress: String!) {\n\t\trequestPasswordReset(emailAddress: $emailAddress) {\n\t\t\t... on Success {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation ResetPassword($token: String! $password: String!) {\n\t\tresetPassword(token: $token password: $password) {\n\t\t\t...on CurrentUser {\n\t\t\t\tid\n\t\t\t\tidentifier\n\t\t\t}\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation ResetPassword($token: String! $password: String!) {\n\t\tresetPassword(token: $token password: $password) {\n\t\t\t...on CurrentUser {\n\t\t\t\tid\n\t\t\t\tidentifier\n\t\t\t}\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tquery GetCustomerOrders {\n\t\tactiveCustomer {\n\t\t\torders {\n\t\t\t\titems {\n\t\t\t\t\t...Order\n\t\t\t\t}\n\t\t\t\ttotalItems\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tquery GetCustomerOrders {\n\t\tactiveCustomer {\n\t\t\torders {\n\t\t\t\titems {\n\t\t\t\t\t...Order\n\t\t\t\t}\n\t\t\t\ttotalItems\n\t\t\t}\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tquery GetCustomerAddresses {\n\t\tactiveCustomer {\n\t\t\taddresses {\n\t\t\t\t...Address\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tquery GetCustomerAddresses {\n\t\tactiveCustomer {\n\t\t\taddresses {\n\t\t\t\t...Address\n\t\t\t}\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation CreateCustomerAddress($input: CreateAddressInput!) {\n\t\tcreateCustomerAddress(input: $input) {\n\t\t\tid\n\t\t\tfullName\n\t\t\tcompany\n\t\t\tstreetLine1\n\t\t\tstreetLine2\n\t\t\tcity\n\t\t\tprovince\n\t\t\tpostalCode\n\t\t\tcountry {\n\t\t\t\tid\n\t\t\t\tcode\n\t\t\t\tname\n\t\t\t}\n\t\t\tphoneNumber\n\t\t\tdefaultShippingAddress\n\t\t\tdefaultBillingAddress\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation CreateCustomerAddress($input: CreateAddressInput!) {\n\t\tcreateCustomerAddress(input: $input) {\n\t\t\tid\n\t\t\tfullName\n\t\t\tcompany\n\t\t\tstreetLine1\n\t\t\tstreetLine2\n\t\t\tcity\n\t\t\tprovince\n\t\t\tpostalCode\n\t\t\tcountry {\n\t\t\t\tid\n\t\t\t\tcode\n\t\t\t\tname\n\t\t\t}\n\t\t\tphoneNumber\n\t\t\tdefaultShippingAddress\n\t\t\tdefaultBillingAddress\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\nmutation paytrailPayment {\n  createPaytrailPaymentIntent{\n    href\n  }\n}\n'
): (typeof documents)['\nmutation paytrailPayment {\n  createPaytrailPaymentIntent{\n    href\n  }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\nmutation paytrailMultiPayment {\n  createMultiPTintent{\n    href\n  }\n}\n'
): (typeof documents)['\nmutation paytrailMultiPayment {\n  createMultiPTintent{\n    href\n  }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation createStripePaymentIntent {\n\t  createStripePaymentIntent\n\t}\n  '
): (typeof documents)['\n\tmutation createStripePaymentIntent {\n\t  createStripePaymentIntent\n\t}\n  '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tfragment Order on Order {\n\t\tid\n\t\tcode\n\t\tstate\n\t\tlines {\n\t\t\tid\n\t\t\tquantity\n\t\t\tlinePriceWithTax\n\t\t\tproductVariant {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tsku\n\t\t\t\tproduct {\n\t\t\t\t\tname\n\t\t\t\t\tslug\n\t\t\t\t}\n\t\t\t\toptions {\n\t\t\t\t\tcode\n\t\t\t\t\tname\n\t\t\t\t\tgroup {\n\t\t\t\t\t\tcode\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tfeaturedAsset {\n\t\t\t\tid\n\t\t\t\tpreview\n\t\t\t}\n\t\t}\n\t\torderPlacedAt\n\t}\n'
): (typeof documents)['\n\tfragment Order on Order {\n\t\tid\n\t\tcode\n\t\tstate\n\t\tlines {\n\t\t\tid\n\t\t\tquantity\n\t\t\tlinePriceWithTax\n\t\t\tproductVariant {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tsku\n\t\t\t\tproduct {\n\t\t\t\t\tname\n\t\t\t\t\tslug\n\t\t\t\t}\n\t\t\t\toptions {\n\t\t\t\t\tcode\n\t\t\t\t\tname\n\t\t\t\t\tgroup {\n\t\t\t\t\t\tcode\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tfeaturedAsset {\n\t\t\t\tid\n\t\t\t\tpreview\n\t\t\t}\n\t\t}\n\t\torderPlacedAt\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tfragment ActiveOrder on Order {\n\t\t__typename\n\t\tid\n\t\tcode\n\t\tstate\n\t\torderPlacedAt\n\t\tcurrencyCode\n\t\ttotalQuantity\n\t\tsubTotal\n\t\tshipping\n\t\ttotal\n\t\ttotalWithTax\n\t\ttaxSummary {\n\t\t\tdescription\n\t\t\ttaxRate\n\t\t\ttaxBase\n\t\t\ttaxTotal\n\t\t}\n\t\tlines {\n\t\t\tid\n\t\t\tunitPrice\n\t\t\tunitPriceWithTax\n\t\t\tquantity\n\t\t\tlinePrice\n\t\t\tlinePriceWithTax\n\t\t\tproductVariant {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tsku\n\t\t\t\tproduct {\n\t\t\t\t\tslug\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t\toptions {\n\t\t\t\t\tcode\n\t\t\t\t\tname\n\t\t\t\t\tgroup {\n\t\t\t\t\t\tcode\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tfeaturedAsset {\n\t\t\t\tid\n\t\t\t\tpreview\n\t\t\t}\n\t\t}\n\t\tshippingLines {\n\t\t\tshippingMethod {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tdescription\n\t\t\t}\n\t\t\tpriceWithTax\n\t\t}\n\t\tdiscounts {\n\t\t\tdescription\n\t\t\tamountWithTax\n\t\t}\n\t\tcouponCodes\n\t\tpromotions {\n\t\t\tid\n\t\t\tstartsAt\n\t\t\tendsAt\n\t\t\tcouponCode\n\t\t\tperCustomerUsageLimit\n\t\t\tusageLimit\n\t\t\tname\n\t\t\tdescription\n\t\t\tenabled\n\t\t}\n\t\tsurcharges {\n\t\t\tdescription\n\t\t\tsku\n\t\t\tprice\n\t\t\tpriceWithTax\n\t\t\ttaxRate\n\t\t}\n\t\tpayments {\n\t\t\tid\n\t\t\tamount\n\t\t\terrorMessage\n\t\t\tmethod\n\t\t\tstate\n\t\t\ttransactionId\n\t\t\tcreatedAt\n\t\t}\n\t\tfulfillments {\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tlines {\n\t\t\t\torderLine {\n\t\t\t\t\tid\n\t\t\t\t\tproductVariant {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tsku\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tquantity\n\t\t\t}\n\t\t\tstate\n\t\t\tmethod\n\t\t\ttrackingCode\n\t\t}\n\t}\n'
): (typeof documents)['\n\tfragment ActiveOrder on Order {\n\t\t__typename\n\t\tid\n\t\tcode\n\t\tstate\n\t\torderPlacedAt\n\t\tcurrencyCode\n\t\ttotalQuantity\n\t\tsubTotal\n\t\tshipping\n\t\ttotal\n\t\ttotalWithTax\n\t\ttaxSummary {\n\t\t\tdescription\n\t\t\ttaxRate\n\t\t\ttaxBase\n\t\t\ttaxTotal\n\t\t}\n\t\tlines {\n\t\t\tid\n\t\t\tunitPrice\n\t\t\tunitPriceWithTax\n\t\t\tquantity\n\t\t\tlinePrice\n\t\t\tlinePriceWithTax\n\t\t\tproductVariant {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tsku\n\t\t\t\tproduct {\n\t\t\t\t\tslug\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t\toptions {\n\t\t\t\t\tcode\n\t\t\t\t\tname\n\t\t\t\t\tgroup {\n\t\t\t\t\t\tcode\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tfeaturedAsset {\n\t\t\t\tid\n\t\t\t\tpreview\n\t\t\t}\n\t\t}\n\t\tshippingLines {\n\t\t\tshippingMethod {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tdescription\n\t\t\t}\n\t\t\tpriceWithTax\n\t\t}\n\t\tdiscounts {\n\t\t\tdescription\n\t\t\tamountWithTax\n\t\t}\n\t\tcouponCodes\n\t\tpromotions {\n\t\t\tid\n\t\t\tstartsAt\n\t\t\tendsAt\n\t\t\tcouponCode\n\t\t\tperCustomerUsageLimit\n\t\t\tusageLimit\n\t\t\tname\n\t\t\tdescription\n\t\t\tenabled\n\t\t}\n\t\tsurcharges {\n\t\t\tdescription\n\t\t\tsku\n\t\t\tprice\n\t\t\tpriceWithTax\n\t\t\ttaxRate\n\t\t}\n\t\tpayments {\n\t\t\tid\n\t\t\tamount\n\t\t\terrorMessage\n\t\t\tmethod\n\t\t\tstate\n\t\t\ttransactionId\n\t\t\tcreatedAt\n\t\t}\n\t\tfulfillments {\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tlines {\n\t\t\t\torderLine {\n\t\t\t\t\tid\n\t\t\t\t\tproductVariant {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tsku\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tquantity\n\t\t\t}\n\t\t\tstate\n\t\t\tmethod\n\t\t\ttrackingCode\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tfragment ShippingMethodQuote on ShippingMethodQuote {\n\t\tid\n\t\tprice\n\t\tpriceWithTax\n\t\tcode\n\t\tname\n\t\tdescription\n\t\tmetadata\n\t}\n'
): (typeof documents)['\n\tfragment ShippingMethodQuote on ShippingMethodQuote {\n\t\tid\n\t\tprice\n\t\tpriceWithTax\n\t\tcode\n\t\tname\n\t\tdescription\n\t\tmetadata\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tquery GetOrderByCode($code: String!) {\n\t\torderByCode(code: $code) {\n\t\t\t...ActiveOrder\n\t\t}\n\t}\n'
): (typeof documents)['\n\tquery GetOrderByCode($code: String!) {\n\t\torderByCode(code: $code) {\n\t\t\t...ActiveOrder\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tquery GetActiveOrder {\n\t\tactiveOrder {\n\t\t\t...ActiveOrder\n\t\t}\n\t}\n'
): (typeof documents)['\n\tquery GetActiveOrder {\n\t\tactiveOrder {\n\t\t\t...ActiveOrder\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation AddItemToOrder($variantId: ID!, $quantity: Int!) {\n\t\taddItemToOrder(productVariantId: $variantId, quantity: $quantity) {\n\t\t\t__typename\n\t\t\t...ActiveOrder\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t\t... on InsufficientStockError {\n\t\t\t\tquantityAvailable\n\t\t\t\torder {\n\t\t\t\t\t...ActiveOrder\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation AddItemToOrder($variantId: ID!, $quantity: Int!) {\n\t\taddItemToOrder(productVariantId: $variantId, quantity: $quantity) {\n\t\t\t__typename\n\t\t\t...ActiveOrder\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t\t... on InsufficientStockError {\n\t\t\t\tquantityAvailable\n\t\t\t\torder {\n\t\t\t\t\t...ActiveOrder\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation RemoveOrderLine($orderLineId: ID!) {\n\t\tremoveOrderLine(orderLineId: $orderLineId) {\n\t\t\t...ActiveOrder\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation RemoveOrderLine($orderLineId: ID!) {\n\t\tremoveOrderLine(orderLineId: $orderLineId) {\n\t\t\t...ActiveOrder\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {\n\t\tadjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {\n\t\t\t...ActiveOrder\n\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {\n\t\tadjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {\n\t\t\t...ActiveOrder\n\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation RemoveAllOrderLines {\n\t\tremoveAllOrderLines {\n\t\t\t...ActiveOrder\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation RemoveAllOrderLines {\n\t\tremoveAllOrderLines {\n\t\t\t...ActiveOrder\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation AddOrderCouponCode($couponCode: String!) {\n\t\tapplyCouponCode(couponCode: $couponCode) {\n\t\t\t...ActiveOrder\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation AddOrderCouponCode($couponCode: String!) {\n\t\tapplyCouponCode(couponCode: $couponCode) {\n\t\t\t...ActiveOrder\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation RemoveOrderCouponCode($couponCode: String!) {\n\t\tremoveCouponCode(couponCode: $couponCode) {\n\t\t\t...ActiveOrder\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation RemoveOrderCouponCode($couponCode: String!) {\n\t\tremoveCouponCode(couponCode: $couponCode) {\n\t\t\t...ActiveOrder\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation SetCustomerForOrder($input: CreateCustomerInput!) {\n\t\tsetCustomerForOrder(input: $input) {\n\t\t\t...on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation SetCustomerForOrder($input: CreateCustomerInput!) {\n\t\tsetCustomerForOrder(input: $input) {\n\t\t\t...on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation SetOrderShippingAddress($input: CreateAddressInput!) {\n\t\tsetOrderShippingAddress(input: $input) {\n\t\t\t...on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation SetOrderShippingAddress($input: CreateAddressInput!) {\n\t\tsetOrderShippingAddress(input: $input) {\n\t\t\t...on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation SetOrderBillingAddress($input: CreateAddressInput!) {\n\t\tsetOrderBillingAddress(input: $input) {\n\t\t\t...on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation SetOrderBillingAddress($input: CreateAddressInput!) {\n\t\tsetOrderBillingAddress(input: $input) {\n\t\t\t...on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tquery GetOrderShippingMethods {\n\t\teligibleShippingMethods {\n\t\t\t...ShippingMethodQuote\n\t\t}\n\t}\n'
): (typeof documents)['\n\tquery GetOrderShippingMethods {\n\t\teligibleShippingMethods {\n\t\t\t...ShippingMethodQuote\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation SetOrderShippingMethod($id: [ID!]!) {\n\t\tsetOrderShippingMethod(shippingMethodId: $id) {\n\t\t\t...ActiveOrder\n\t\t\t...on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation SetOrderShippingMethod($id: [ID!]!) {\n\t\tsetOrderShippingMethod(shippingMethodId: $id) {\n\t\t\t...ActiveOrder\n\t\t\t...on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tquery GetOrderPaymentMethods {\n\t\teligiblePaymentMethods {\n\t\t\tid\n\t\t\tname\n\t\t\tcode\n\t\t\tisEligible\n\t\t}\n\t}\n'
): (typeof documents)['\n\tquery GetOrderPaymentMethods {\n\t\teligiblePaymentMethods {\n\t\t\tid\n\t\t\tname\n\t\t\tcode\n\t\t\tisEligible\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation AddOrderPayment($input: PaymentInput!) {\n\t\taddPaymentToOrder(input: $input) {\n\t\t\t... on Order {\n\t\t\t\tid\n\t\t\t\tpayments {\n\t\t\t\t\tid\n\t\t\t\t\tamount\n\t\t\t\t\terrorMessage\n\t\t\t\t\tmethod\n\t\t\t\t\tstate\n\t\t\t\t\ttransactionId\n\t\t\t\t\tcreatedAt\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation AddOrderPayment($input: PaymentInput!) {\n\t\taddPaymentToOrder(input: $input) {\n\t\t\t... on Order {\n\t\t\t\tid\n\t\t\t\tpayments {\n\t\t\t\t\tid\n\t\t\t\t\tamount\n\t\t\t\t\terrorMessage\n\t\t\t\t\tmethod\n\t\t\t\t\tstate\n\t\t\t\t\ttransactionId\n\t\t\t\t\tcreatedAt\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on ErrorResult {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation TransitionOrderToState($state: String!) {\n\t\ttransitionOrderToState(state: $state) {\n\t\t\t...ActiveOrder\n\t\t\t...on OrderStateTransitionError {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t\ttransitionError\n\t\t\t\tfromState\n\t\t\t\ttoState\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation TransitionOrderToState($state: String!) {\n\t\ttransitionOrderToState(state: $state) {\n\t\t\t...ActiveOrder\n\t\t\t...on OrderStateTransitionError {\n\t\t\t\terrorCode\n\t\t\t\tmessage\n\t\t\t\ttransitionError\n\t\t\t\tfromState\n\t\t\t\ttoState\n\t\t\t}\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tfragment Product on Product {\n\t\tid\n\t\tname\n\t\tslug\n\t\tdescription\n\t\tfeaturedAsset {\n\t\t\tid\n\t\t\tpreview\n\t\t}\n\t\tvariants {\n\t\t\tid\n\t\t\tprice\n\t\t\tstockLevel\n\t\t}\n\t}\n'
): (typeof documents)['\n\tfragment Product on Product {\n\t\tid\n\t\tname\n\t\tslug\n\t\tdescription\n\t\tfeaturedAsset {\n\t\t\tid\n\t\t\tpreview\n\t\t}\n\t\tvariants {\n\t\t\tid\n\t\t\tprice\n\t\t\tstockLevel\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tfragment ProductDetail on Product {\n\t\tid\n\t\tname\n\t\tslug\n\t\tdescription\n\t\tfeaturedAsset {\n\t\t\t...Asset\n\t\t}\n\t\tassets {\n\t\t\t...Asset\n\t\t}\n\t\toptionGroups {\n\t\t\tid\n\t\t\tcode\n\t\t\tname\n\t\t\toptions {\n\t\t\t\tid\n\t\t\t\tcode\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t\tvariants {\n\t\t\tid\n\t\t\tname\n\t\t\tsku\n\t\t\tstockLevel\n\t\t\tcurrencyCode\n\t\t\tprice\n\t\t\tpriceWithTax\n\t\t\tfacetValues {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tfacet {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t\toptions {\n\t\t\t\tid\n\t\t\t\tgroupId\n\t\t\t\tcode\n\t\t\t\tname\n\t\t\t}\n\t\t\tfeaturedAsset {\n\t\t\t\t...Asset\n\t\t\t}\n\t\t\tassets {\n\t\t\t\t...Asset\n\t\t\t}\n\t\t}\n\t\tcollections {\n\t\t\tbreadcrumbs {\n\t\t\tname\n\t\t\tslug\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tfragment ProductDetail on Product {\n\t\tid\n\t\tname\n\t\tslug\n\t\tdescription\n\t\tfeaturedAsset {\n\t\t\t...Asset\n\t\t}\n\t\tassets {\n\t\t\t...Asset\n\t\t}\n\t\toptionGroups {\n\t\t\tid\n\t\t\tcode\n\t\t\tname\n\t\t\toptions {\n\t\t\t\tid\n\t\t\t\tcode\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t\tvariants {\n\t\t\tid\n\t\t\tname\n\t\t\tsku\n\t\t\tstockLevel\n\t\t\tcurrencyCode\n\t\t\tprice\n\t\t\tpriceWithTax\n\t\t\tfacetValues {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tfacet {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t\toptions {\n\t\t\t\tid\n\t\t\t\tgroupId\n\t\t\t\tcode\n\t\t\t\tname\n\t\t\t}\n\t\t\tfeaturedAsset {\n\t\t\t\t...Asset\n\t\t\t}\n\t\t\tassets {\n\t\t\t\t...Asset\n\t\t\t}\n\t\t}\n\t\tcollections {\n\t\t\tbreadcrumbs {\n\t\t\tname\n\t\t\tslug\n\t\t\t}\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tfragment SearchResult on SearchResult {\n\t\tproductName\n\t\tslug\n\t\tdescription\n\t\tproductId\n\t\tproductAsset {\n\t\t\tid\n\t\t\tpreview\n\t\t}\n\t\tprice {\n\t\t\t... on SinglePrice {\n\t\t\t\tvalue\n\t\t\t}\n\t\t\t... on PriceRange {\n\t\t\t\tmin\n\t\t\t\tmax\n\t\t\t}\n\t\t}\n\t\tfacetIds\n\t\tfacetValueIds\n\t\tcurrencyCode\n\t\tproductVariantId\n\t\tinStock\n\t}\n'
): (typeof documents)['\n\tfragment SearchResult on SearchResult {\n\t\tproductName\n\t\tslug\n\t\tdescription\n\t\tproductId\n\t\tproductAsset {\n\t\t\tid\n\t\t\tpreview\n\t\t}\n\t\tprice {\n\t\t\t... on SinglePrice {\n\t\t\t\tvalue\n\t\t\t}\n\t\t\t... on PriceRange {\n\t\t\t\tmin\n\t\t\t\tmax\n\t\t\t}\n\t\t}\n\t\tfacetIds\n\t\tfacetValueIds\n\t\tcurrencyCode\n\t\tproductVariantId\n\t\tinStock\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tfragment Asset on Asset {\n\t\tid\n\t\tcreatedAt\n\t\tupdatedAt\n\t\tname\n\t\ttype\n\t\tfileSize\n\t\tmimeType\n\t\twidth\n\t\theight\n\t\tsource\n\t\tpreview\n\t\tfocalPoint {\n\t\t\tx\n\t\t\ty\n\t\t}\n\t\ttags {\n\t\t\tid\n\t\t\tvalue\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n'
): (typeof documents)['\n\tfragment Asset on Asset {\n\t\tid\n\t\tcreatedAt\n\t\tupdatedAt\n\t\tname\n\t\ttype\n\t\tfileSize\n\t\tmimeType\n\t\twidth\n\t\theight\n\t\tsource\n\t\tpreview\n\t\tfocalPoint {\n\t\t\tx\n\t\t\ty\n\t\t}\n\t\ttags {\n\t\t\tid\n\t\t\tvalue\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tquery GetProducts($options: ProductListOptions) {\n\t\tproducts(options: $options) {\n\t\t\titems {\n\t\t\t\t...ProductDetail\n\t\t\t}\n\t\t\ttotalItems\n\t\t}\n\t}\n'
): (typeof documents)['\n\tquery GetProducts($options: ProductListOptions) {\n\t\tproducts(options: $options) {\n\t\t\titems {\n\t\t\t\t...ProductDetail\n\t\t\t}\n\t\t\ttotalItems\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tquery GetProduct($slug: String!) {\n\t\tproduct(slug: $slug) {\n\t\t\t...ProductDetail\n\t\t}\n\t}\n'
): (typeof documents)['\n\tquery GetProduct($slug: String!) {\n\t\tproduct(slug: $slug) {\n\t\t\t...ProductDetail\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tfragment FacetValueResult on FacetValueResult{\n\t\tfacetValue {\n\t\t    id\n        \tname\n        \tfacet {\n          \t\tid\n          \t\tname\n        \t}\n\t\t}\n\t\tcount\n\t}\n'
): (typeof documents)['\n\tfragment FacetValueResult on FacetValueResult{\n\t\tfacetValue {\n\t\t    id\n        \tname\n        \tfacet {\n          \t\tid\n          \t\tname\n        \t}\n\t\t}\n\t\tcount\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tquery SearchProducts($input: SearchInput!) {\n\t\tsearch(input: $input) {\n\t\t\titems {\n\t\t\t\t...SearchResult\n\t\t\t}\n\t\t\ttotalItems\n\t\t\tfacetValues {\n\t\t\t...FacetValueResult\n    \t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tquery SearchProducts($input: SearchInput!) {\n\t\tsearch(input: $input) {\n\t\t\titems {\n\t\t\t\t...SearchResult\n\t\t\t}\n\t\t\ttotalItems\n\t\t\tfacetValues {\n\t\t\t...FacetValueResult\n    \t\t}\n\t\t}\n\t}\n'];

export function gql(source: string) {
	return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
	TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
