/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '1.25rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				pitch: {
					50: '#f0fdf4',
					100: '#dcfce7',
					200: '#bbf7d0',
					300: '#86efac',
					400: '#4ade80',
					500: '#22c55e',
					600: '#16a34a',
					700: '#15803d',
					800: '#166534',
					900: '#14532d',
					950: '#052e16',
				},
				gold: {
					300: '#fde68a',
					400: '#fbbf24',
					500: '#f59e0b',
					600: '#d97706',
				},
				night: {
					50: '#f5f7fa',
					100: '#e5e9f2',
					200: '#c8d0e0',
					300: '#94a0b8',
					400: '#5e6a85',
					500: '#3d4660',
					600: '#2a3149',
					700: '#1a2138',
					800: '#111729',
					900: '#0a0e1c',
					950: '#05070f',
				},
				cream: {
					50: '#fefdf8',
					100: '#fef7e6',
				},
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
				display: ['Inter', 'system-ui', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			transitionTimingFunction: {
				'soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
				'soft-in': 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
