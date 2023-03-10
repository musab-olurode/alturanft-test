/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/*.{js,jsx,ts,tsx}',
		'./src/components/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#0f0e34',
				secondary: '#ceced5',
				tertiary: '#7253e4',
			},
		},
	},
	plugins: [],
};
