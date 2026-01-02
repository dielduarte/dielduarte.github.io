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
			},
			colors: {
				'game-dark': '#181818',
				'game-text': '#C0C5CB',
				'game-orange': 'rgb(215, 136, 56)',
				'game-teal': '#5eb6ae',
				'game-border': '#3a3a3a',
			},
			animation: {
				'blink': 'blink 1s step-end infinite',
				'blink-slow': 'blink 2s step-end infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'scanline': 'scanline 8s linear infinite',
				'float': 'float 3s ease-in-out infinite',
			},
			keyframes: {
				blink: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' },
				},
				'glow-pulse': {
					'0%, 100%': { 
						textShadow: '0 0 4px rgb(215, 136, 56), 0 0 8px rgb(215, 136, 56)',
					},
					'50%': { 
						textShadow: '0 0 8px rgb(215, 136, 56), 0 0 16px rgb(215, 136, 56), 0 0 24px rgb(215, 136, 56)',
					},
				},
				scanline: {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100%)' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-6px)' },
				},
			},
			boxShadow: {
				'pixel': '4px 4px 0px 0px #3a3a3a',
				'pixel-sm': '2px 2px 0px 0px #3a3a3a',
				'pixel-orange': '4px 4px 0px 0px rgb(215, 136, 56)',
				'glow-orange': '0 0 10px rgb(215, 136, 56)',
				'glow-teal': '0 0 10px #5eb6ae',
				'inset-game': 'inset 0 0 30px rgba(0, 0, 0, 0.5)',
			},
		},
	},
	plugins: [],
}
