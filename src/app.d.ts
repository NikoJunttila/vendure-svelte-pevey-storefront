// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// import type { SalunaConfig } from "../saluna.config"

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			// config: SalunaConfig
			// sid: string // session id
			// ssig: string // session signature
			// token: string // vendure auth token
			user: any;
			cart: any;
			ssig: string;
			sid: string;
		}
		// interface PageData {}
		// interface Platform {}
	}
	declare namespace svelteHTML {
		interface HTMLAttributes<T> {
			onoutsideclick?: CompositionEventHandler<T>;
		}
	}
}

export {};
