<script lang="ts">
	//
	// Most of this is from svelte-themes (https://github.com/beynar/svelte-themes) by @beynar
	//
	import { browser } from '$app/environment';
	//import { themeStore, setTheme } from '$lib/stores';
	import { themeStore, setTheme } from '$src/lib/themeStore.svelte';

	import ThemeScript from '$lib/components/ThemeScript.svelte';

	interface Props {
		/** Forced theme name for the current page */
		forcedTheme?: string | undefined;
		/** Disable all CSS transitions when switching themes */
		disableTransitionOnChange?: boolean;
		/** Whether to switch between dark and light themes based on prefers-color-scheme */
		enableSystem?: boolean;
		/** Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons */
		enableColorScheme?: boolean;
		/** Key used to store theme setting in localStorage */
		storageKey?: string;
		/** List of all available theme names */
		themes?: string[];
		/** Default theme name (for v0.0.12 and lower the default was light). If `enableSystem` is false, the default theme is light */
		defaultTheme?: string;
		/** HTML attribute modified based on the active theme. Accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.) */
		attribute?: string | 'class';
		/** Mapping of theme name to HTML attribute value. Object where key is the theme name and value is the attribute value */
		value?: { [themeName: string]: string } | undefined;
	}

	let {
		forcedTheme = undefined,
		disableTransitionOnChange = false,
		enableSystem = true,
		enableColorScheme = true,
		storageKey = 'theme',
		themes = enableSystem ? ['light', 'dark', 'system'] : ['light', 'dark'],
		defaultTheme = enableSystem ? 'system' : 'light',
		attribute = 'class',
		value = undefined
	}: Props = $props();

	const colorSchemes = ['light', 'dark'];
	const MEDIA = '(prefers-color-scheme: dark)';

	const getTheme = (key: string, fallback?: string): string | undefined => {
		if (typeof window === 'undefined') return undefined;
		let theme;
		try {
			theme = localStorage.getItem(key) || undefined;
		} catch (e) {}
		return theme || fallback;
	};

	const disableAnimation = () => {
		const css = document.createElement('style');
		css.appendChild(
			document.createTextNode(
				`*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
			)
		);
		document.head.appendChild(css);
		return () => {
			// Force restyle
			(() => window.getComputedStyle(document.body))();
			// Wait for next tick before removing
			setTimeout(() => {
				document.head.removeChild(css);
			}, 1);
		};
	};

	const getSystemTheme = (e?: MediaQueryList): string => {
		if (!e) e = window.matchMedia(MEDIA);
		const isDark = e.matches;
		const systemTheme = isDark ? 'dark' : 'light';
		return systemTheme;
	};

	const initialTheme = getTheme(storageKey, defaultTheme);

	themeStore.setWhole({
		//@ts-ignore
		theme: initialTheme,
		forcedTheme,
		resolvedTheme: initialTheme === 'system' ? getTheme(storageKey) : initialTheme,
		themes: enableSystem ? [...themes, 'system'] : themes,
		systemTheme: (enableSystem ? getTheme(storageKey) : undefined) as 'light' | 'dark' | undefined
	});

	let theme = $derived(themeStore.theme.theme);
	let resolvedTheme = $derived(themeStore.theme.resolvedTheme);

	const attrs = !value ? themes : Object.values(value);

	const handleMediaQuery = (e?: any) => {
		const systemTheme = getSystemTheme(e);
		//@ts-ignore
		themeStore.theme.resolvedTheme = systemTheme;
		if (theme === 'system' && !forcedTheme) changeTheme(systemTheme, false);
	};

	const changeTheme = (theme: string, updateStorage = true, updateDOM = true) => {
		let name = value?.[theme] || theme;
		const enable = disableTransitionOnChange && updateDOM ? disableAnimation() : null;
		if (updateStorage) {
			try {
				localStorage.setItem(storageKey, theme);
			} catch (e) {}
		}
		if (theme === 'system' && enableSystem) {
			const resolved = getSystemTheme();
			name = value?.[resolved] || resolved;
		}
		if (updateDOM && browser) {
			const d = document.documentElement;
			if (attribute === 'class') {
				d.classList.remove(...(attrs as string[]));
				d.classList.add(name);
			} else {
				d.setAttribute(attribute, name);
			}
			enable?.();
		}
	};

	const mediaHandler = (...args: any) => handleMediaQuery(...args);

	const storageHandler = (e: StorageEvent) => {
		if (e.key !== storageKey) return;
		// If default theme set, use it if localstorage === null (happens on local storage manual deletion)
		//@ts-ignore
		setTheme(e.newValue || defaultTheme);
	};

	const onWindow = (window: Window) => {
		// Always listen to System preference
		const media = window.matchMedia(MEDIA);
		// Intentionally use deprecated listener methods to support iOS & old browsers
		media.addListener(mediaHandler);
		mediaHandler(media);
		// localStorage event handling
		window.addEventListener('storage', storageHandler);
		return {
			destroy() {
				window.removeEventListener('storage', storageHandler);
				media.removeListener(mediaHandler);
			}
		};
	};

	// color-scheme handling
	$effect.pre(() => {
		if (enableColorScheme && browser) {
			// color-scheme tells browser how to render built-in elements like forms, scrollbars, etc.
			let colorScheme;
			if (forcedTheme && colorSchemes.includes(forcedTheme)) colorScheme = forcedTheme;
			else if (theme && colorSchemes.includes(theme)) colorScheme = theme;
			else if (theme === 'system') colorScheme = resolvedTheme || null;
			else colorScheme = null;
			// if color-scheme is null, this will remove the property
			document.documentElement.style.setProperty('color-scheme', colorScheme);
		}
	});

	$effect.pre(() => {
		if (forcedTheme) changeTheme(forcedTheme, true, false);
		else if (theme) changeTheme(theme);
	});
</script>

<ThemeScript {forcedTheme} {storageKey} {attribute} {enableSystem} {defaultTheme} {value} {attrs} />

<svelte:window use:onWindow />
