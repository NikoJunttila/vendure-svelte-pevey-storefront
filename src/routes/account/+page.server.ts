import type { PageServerLoad, Actions } from './$types'
import { redirect } from '@sveltejs/kit'
import { message, superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { createServerClient } from '$lib/vendure/client.server'
import { signInReq, signUpReq, forgotReq, resetReq } from '$lib/validators'
import { SignIn as sign2, SignOut, SignUp, ResetPassword, RequestPasswordReset } from '$src/lib/vendure'
import { parseAuthCookie, signIn } from '$src/lib/vendure/parseAuthCookie.graphql'

export const prerender = false;

export const load: PageServerLoad = async ({ locals, url }) => {
	// vendure token renamed to 'code' because of turnstile token
	const code = url.searchParams.get('token') || '' 
	const rurl = url.searchParams.get('rurl') || ''

	if (locals.user) throw redirect(302, `/${rurl}`)

	const signInForm = await superValidate(zod(signInReq), { id: 'signIn' })
	const signUpForm = await superValidate(zod(signUpReq), { id: 'signUp' })
	const forgotForm = await superValidate(zod(forgotReq), { id: 'forgot' })
	const resetForm = await superValidate(zod(resetReq), { id: 'reset' })

	return {
		code,
		rurl,
		signUpForm,
		signInForm,
		forgotForm,
		resetForm
	}
}

export const actions: Actions = {
	signIn: async ({ request, fetch, locals, cookies }) => {
		const form = await superValidate(request, zod(signInReq), { id: 'signIn' })
		if (!form.valid) return message(form, 'Something went wrong', { status: 500}) // this shouldn't happen because of client-side validation
		
		try {
			const { data, headers } = await signIn(form.data.email.toLocaleLowerCase(), form.data.password, true, locals, cookies)
			console.log(headers)
			if ('id' in data.login) {
				// Successfully logged in
				console.log('Logged in user:', data.login.identifier)
				return message(form, 'success')
				// Cookie headers have already been processed by parseAuthCookie
			} else {
				// Login error
				console.error('Login failed:', data.login.message)
			}
		} catch (error) {
			console.error('Sign in error:', error)
		}
		//const client = createServerClient(fetch);
		//const result = await client.mutation(sign2, {username:form.data.email.toLocaleLowerCase(),password:form.data.password,rememberMe:true}).toPromise();
		/*
		
		if (!result) {
			return message(form, 'The service is unavailable.', { status: 424 })
		} else if (result && result.data) {
			console.log(result)
			return message(form, 'success') // the form will redirect to rurl
		} else if (result && result.error?.name === 'NOT_VERIFIED_ERROR') {
			return message(form, 'Please verify your email address before signing in.', { status: 401 })
		} else {
			return message(form, 'A user with that email address was not found or the password was not valid.', { status: 401 })
		}*/
	},

	signUp: async ({ request, fetch }) => {
		const form = await superValidate(request, zod(signUpReq), { id: 'signUp' })
		if (!form.valid) return message(form, 'Something went wrong', { status: 500}) // this shouldn't happen because of client-side validation
		const client = createServerClient(fetch);
		const result = await client.mutation(SignUp, {input: {
			emailAddress: form.data.email.toLowerCase(),
			password: form.data.password,
			firstName: form.data.fname,
			lastName: form.data.lname
		}}).toPromise();
		if (!result) {
			return message(form, 'The service is unavailable.', { status: 424 })
		} else if (result && result.data) {
			return message(form, `Your account has been created. An email has been sent to ${form.data.email}.  To continue, please click the link in the email to verify your address.`)
		} else {
			return message(form, 'Something went wrong', { status: 500 })
		}
	},
	
	forgot: async ({ request }) => {
		const form = await superValidate(request, zod(forgotReq), { id: 'forgot' })
		if (!form.valid) return message(form, 'Something went wrong', { status: 500}) // this shouldn't happen because of client-side validation
		const client = createServerClient(fetch);
		const result = await client.mutation(RequestPasswordReset, {emailAddress:form.data.email}).toPromise();
		if (!result) {
			return message(form, 'The service is unavailable.', { status: 424 })
		} else if (result && result.data) {
			// return { form }
			return message(form, 'If an account with that email exists, a reset code has been sent to your email address.')
		} else {
			return message(form, 'Something went wrong', { status: 500 })
		}
	},
	
	reset: async ({ request }) => {
		const form = await superValidate(request, zod(resetReq), { id: 'reset' })
		if (!form.valid) return message(form, 'Something went wrong', { status: 500}) // this shouldn't happen because of client-side validation
		const client = createServerClient(fetch);
		const result = await client.mutation(ResetPassword, {token:form.data.code,password:form.data.password}).toPromise();
		if (!result) {
			return message(form, 'The service is unavailable.', { status: 424 })
		} else if (result && result.data) {
			return message(form, 'Your password has been reset. Please sign in.')
		} else {
			return message(form, 'Something went wrong', { status: 500 })
		}
	},

	signOut: async ({ locals, cookies}) => {
		const client = createServerClient(fetch);
		const res = client.mutation(SignOut, {}).toPromise()
		//await signOut(locals, cookies)
		cookies.set('sid', '', { path: '/', maxAge: 0 })
		cookies.set('ssig', '', { path: '/', maxAge: 0 })
		throw redirect(302, '/')
	}
}