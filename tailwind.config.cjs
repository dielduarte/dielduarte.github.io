/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'media',
	theme: {
		extend: {
			fontFamily: {
				display: '"Plus Jakarta Sans", sans-serif',
				body: '"Plus Jakarta Sans", sans-serif',
				mono: '"JetBrains Mono", monospace',
			},
			colors: {
				// Ink & Ivory Premium Palette
				'ivory': {
					50: '#FEFEFD',
					100: '#FAFAF8',
					200: '#F5F5F2',
					300: '#EBEBE7',
					400: '#DCDCD7',
				},
				'ink': {
					50: '#F5F5F5',
					100: '#E0E0E0',
					200: '#B8B8B5',
					300: '#8A8A87',
					400: '#5C5C5A',
					500: '#3D3D3B',
					600: '#2A2A28',
					700: '#1F1F1D',
					800: '#171715',
					900: '#0F0F0E',
					950: '#0A0A09',
				},
				// Subtle warm accent (muted taupe/bronze)
				'accent': {
					300: '#B8A99A',
					400: '#9A8B7A',
					500: '#7D6E5E',
					600: '#635850',
					700: '#4A4238',
				},
			},
			animation: {
				'fade-up': 'fadeUp 0.6s ease-out forwards',
				'fade-up-delay-1': 'fadeUp 0.6s ease-out 0.1s forwards',
				'fade-up-delay-2': 'fadeUp 0.6s ease-out 0.2s forwards',
				'fade-up-delay-3': 'fadeUp 0.6s ease-out 0.3s forwards',
				'draw-line': 'drawLine 0.4s ease-out forwards',
				'subtle-float': 'subtleFloat 6s ease-in-out infinite',
			},
			keyframes: {
				fadeUp: {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
				},
				drawLine: {
					'0%': { width: '0%' },
					'100%': { width: '100%' },
				},
				subtleFloat: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-8px)' },
				},
			},
		},
	},
	plugins: [],
}
