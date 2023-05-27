// import { browser } from '$app/environment';
// import { writable } from 'svelte/store';

export const THEMES = {
    DARK: "dark",
    LIGHT: "light",
};

// // if SSR (not browser rendered) the theme will be LIGHT
// // if user has theme specified in localstorage: use that theme
// // else check if user has DARK color-scheme preference in browser
// // if not use LIGHT

// const initialValue = browser ? window.localStorage.getItem('theme') ?? ((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? THEMES.DARK : THEMES.LIGHT) : THEMES.LIGHT;

// export const theme = writable(initialValue);

// // subscribe to theme writable store changes and do the following on change
// theme.subscribe((value) => {
//     if (browser) {
//         // save settings to localStorage and change the theme for the current document ( website )
//         window.localStorage.setItem('theme', value);
//         document.documentElement.setAttribute("data-theme", value);
//     }
// })

// export { theme as default };