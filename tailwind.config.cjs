/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				pressStart: '\'Press Start 2P\', cursive',
				roboto: '\'Roboto\', sans-serif',
			},
			backgroundColor: {
				black: '#181818'
			},
			textColor: {
				white: '#C0C5CB'
			},
			borderColor: {
				white: '#C0C5CB'
			}
		},
	},
	plugins: [],
}
